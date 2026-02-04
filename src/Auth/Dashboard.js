import React, { useEffect, useState, useRef } from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
import { auth, storage, ref, uploadBytes, getDownloadURL } from '../firebase';
import { signOut } from 'firebase/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faSave, faTimes, faUser, faMapMarkerAlt, faInfoCircle, faCamera, faUpload } from '@fortawesome/free-solid-svg-icons';
import './Dashboard.css';

const Dashboard = () => {
    const { currentUser } = useAuth();
    const navigate = useNavigate();   
    const fileInputRef = useRef(null);
    const [userProfile, setUserProfile] = useState({
        profileImage: '',
        userEmail: '',
        displayName: '',
        bio: '',
        location: ''
    });
    const [isEditing, setIsEditing] = useState(false);
    const [editedProfile, setEditedProfile] = useState({});
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [imagePreview, setImagePreview] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);

    // Determine the API URL based on environment
    const API_BASE_URL = process.env.NODE_ENV === 'development'
        ? 'http://127.0.0.1:5001/backend-app-jl/us-central1'
        : 'https://us-central1-backend-app-jl.cloudfunctions.net';

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            navigate('/signup', { replace: true });
        } catch (error) {
            alert('Sign out failed. Please try again.');
        }
    };

    // Fetch user profile using Python Cloud Function
    useEffect(() => {
        const fetchUserProfile = async () => {
            const user = auth.currentUser;
            if (!user) {
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(
                    `${API_BASE_URL}/manage_user_profile?userId=${user.uid}`
                );
                const data = await response.json();

                if (response.ok && data.success) {
                    const profile = data.profile.userProfile || {};
                    setUserProfile({
                        profileImage: profile.profileImage || '',
                        userEmail: user.email,
                        displayName: profile.displayName || '',
                        bio: profile.bio || '',
                        location: profile.location || ''
                    });
                } else {
                    // Profile doesn't exist yet, use defaults
                    setUserProfile(prev => ({ ...prev, userEmail: user.email }));
                }
            } catch (error) {
                console.error('Error fetching user profile:', error);
                setError('Failed to load profile');
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, [API_BASE_URL]);

    const handleEditClick = () => {
        setEditedProfile({ ...userProfile });
        setIsEditing(true);
        setError('');
        setSuccess('');
        setImagePreview(null);
        setSelectedFile(null);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setEditedProfile({});
        setError('');
        setSuccess('');
        setImagePreview(null);
        setSelectedFile(null);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedProfile(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Handle file selection
    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith('image/')) {
            setError('Please select an image file');
            return;
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            setError('Image size must be less than 5MB');
            return;
        }

        setSelectedFile(file);
        setError('');

        // Create preview
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
    };

    // Upload image to Firebase Storage
    const uploadImage = async (file) => {
        if (!file) return null;

        try {
            setUploading(true);
            const user = auth.currentUser;
            
            // Create a unique filename
            const timestamp = Date.now();
            const fileExtension = file.name.split('.').pop();
            const fileName = `profile_${user.uid}_${timestamp}.${fileExtension}`;
            
            // Create storage reference
            const storageRef = ref(storage, `profile-images/${fileName}`);
            
            // Upload file
            await uploadBytes(storageRef, file);
            
            // Get download URL
            const downloadURL = await getDownloadURL(storageRef);
            
            return downloadURL;
        } catch (error) {
            console.error('Error uploading image:', error);
            throw new Error('Failed to upload image');
        } finally {
            setUploading(false);
        }
    };

    const handleSaveProfile = async () => {
        setSaving(true);
        setError('');
        setSuccess('');

        try {
            const user = auth.currentUser;
            if (!user) {
                setError('User not authenticated');
                setSaving(false);
                return;
            }

            let profileImageUrl = editedProfile.profileImage;

            // Upload new image if selected
            if (selectedFile) {
                try {
                    profileImageUrl = await uploadImage(selectedFile);
                } catch (uploadError) {
                    setError('Failed to upload image. Please try again.');
                    setSaving(false);
                    return;
                }
            }

            const response = await fetch(`${API_BASE_URL}/manage_user_profile`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: user.uid,
                    profileData: {
                        userProfile: {
                            profileImage: profileImageUrl,
                            userEmail: user.email,
                            displayName: editedProfile.displayName,
                            bio: editedProfile.bio,
                            location: editedProfile.location
                        }
                    }
                })
            });

            const data = await response.json();

            if (response.ok && data.success) {
                setUserProfile({
                    ...editedProfile,
                    profileImage: profileImageUrl
                });
                setIsEditing(false);
                setImagePreview(null);
                setSelectedFile(null);
                setSuccess('Profile updated successfully!');
                setTimeout(() => setSuccess(''), 3000);
            } else {
                setError(data.error || 'Failed to update profile');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            setError('Failed to update profile. Please try again.');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <>
                <Header />
                <div className="dashboard-container">
                    <div className="dashboard-content">
                        <p>Loading...</p>
                    </div>
                </div>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Header />
            <div className="dashboard-container">
                <div className="dashboard-content">
                    <h1>Welcome{userProfile.displayName ? `, ${userProfile.displayName}` : ''}!</h1>
                    
                    {error && <div className="dashboard-error">{error}</div>}
                    {success && <div className="dashboard-success">{success}</div>}

                    <div className="dashboard-profile-section">
                        {/* Profile Image */}
                        <div className="dashboard-profile-image-container">
                            {imagePreview || userProfile.profileImage ? (
                                <div className="dashboard-image-wrapper">
                                    <img
                                        src={imagePreview || userProfile.profileImage}
                                        alt="Profile"
                                        className="dashboard-profile-image"
                                        onError={(e) => {
                                            e.target.src = 'https://via.placeholder.com/150?text=No+Image';
                                        }}
                                    />
                                    {isEditing && (
                                        <button
                                            className="dashboard-change-photo-btn"
                                            onClick={() => fileInputRef.current?.click()}
                                            disabled={uploading}
                                        >
                                            <FontAwesomeIcon icon={faCamera} />
                                            {uploading ? ' Uploading...' : ' Change Photo'}
                                        </button>
                                    )}
                                </div>
                            ) : (
                                <div className="dashboard-profile-placeholder">
                                    <FontAwesomeIcon icon={faUser} size="3x" />
                                    {isEditing && (
                                        <button
                                            className="dashboard-upload-photo-btn"
                                            onClick={() => fileInputRef.current?.click()}
                                            disabled={uploading}
                                        >
                                            <FontAwesomeIcon icon={faUpload} />
                                            {uploading ? ' Uploading...' : ' Upload Photo'}
                                        </button>
                                    )}
                                </div>
                            )}
                            
                            {/* Hidden file input */}
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                onChange={handleFileSelect}
                                style={{ display: 'none' }}
                            />
                        </div>

                        {/* Profile Information */}
                        <div className="dashboard-profile-info">
                            {!isEditing ? (
                                <>
                                    <div className="dashboard-info-item">
                                        <FontAwesomeIcon icon={faUser} className="dashboard-icon" />
                                        <span className="dashboard-label">Email:</span>
                                        <span className="dashboard-value">{userProfile.userEmail}</span>
                                    </div>

                                    {userProfile.displayName && (
                                        <div className="dashboard-info-item">
                                            <FontAwesomeIcon icon={faUser} className="dashboard-icon" />
                                            <span className="dashboard-label">Name:</span>
                                            <span className="dashboard-value">{userProfile.displayName}</span>
                                        </div>
                                    )}

                                    {userProfile.location && (
                                        <div className="dashboard-info-item">
                                            <FontAwesomeIcon icon={faMapMarkerAlt} className="dashboard-icon" />
                                            <span className="dashboard-label">Location:</span>
                                            <span className="dashboard-value">{userProfile.location}</span>
                                        </div>
                                    )}

                                    {userProfile.bio && (
                                        <div className="dashboard-info-item dashboard-bio">
                                            <FontAwesomeIcon icon={faInfoCircle} className="dashboard-icon" />
                                            <span className="dashboard-label">Bio:</span>
                                            <p className="dashboard-value">{userProfile.bio}</p>
                                        </div>
                                    )}

                                    <button className="dashboard-edit-btn" onClick={handleEditClick}>
                                        <FontAwesomeIcon icon={faEdit} /> Edit Profile
                                    </button>
                                </>
                            ) : (
                                <div className="dashboard-edit-form">
                                    <div className="dashboard-form-group">
                                        <label htmlFor="displayName">
                                            <FontAwesomeIcon icon={faUser} /> Display Name
                                        </label>
                                        <input
                                            type="text"
                                            id="displayName"
                                            name="displayName"
                                            value={editedProfile.displayName || ''}
                                            onChange={handleInputChange}
                                            placeholder="Your name"
                                            className="dashboard-input"
                                        />
                                    </div>

                                    <div className="dashboard-form-group">
                                        <label htmlFor="location">
                                            <FontAwesomeIcon icon={faMapMarkerAlt} /> Location
                                        </label>
                                        <input
                                            type="text"
                                            id="location"
                                            name="location"
                                            value={editedProfile.location || ''}
                                            onChange={handleInputChange}
                                            placeholder="City, Country"
                                            className="dashboard-input"
                                        />
                                    </div>

                                    <div className="dashboard-form-group">
                                        <label htmlFor="bio">
                                            <FontAwesomeIcon icon={faInfoCircle} /> Bio
                                        </label>
                                        <textarea
                                            id="bio"
                                            name="bio"
                                            value={editedProfile.bio || ''}
                                            onChange={handleInputChange}
                                            placeholder="Tell us about yourself..."
                                            className="dashboard-textarea"
                                            rows="4"
                                        />
                                    </div>

                                    <div className="dashboard-button-group">
                                        <button
                                            className="dashboard-save-btn"
                                            onClick={handleSaveProfile}
                                            disabled={saving || uploading}
                                        >
                                            <FontAwesomeIcon icon={faSave} />
                                            {saving ? ' Saving...' : uploading ? ' Uploading...' : ' Save Changes'}
                                        </button>
                                        <button
                                            className="dashboard-cancel-btn"
                                            onClick={handleCancelEdit}
                                            disabled={saving || uploading}
                                        >
                                            <FontAwesomeIcon icon={faTimes} /> Cancel
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <button
                        className="dashboard-signout-btn"
                        onClick={handleSignOut}
                    >
                        Sign Out
                    </button>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Dashboard;