# Welcome to Cloud Functions for Firebase for Python!
# To get started, simply uncomment the below code or create your own.
# Deploy with `firebase deploy`

from firebase_functions import https_fn
from firebase_functions.options import set_global_options
from firebase_admin import initialize_app

# For cost control, you can set the maximum number of containers that can be
# running at the same time. This helps mitigate the impact of unexpected
# traffic spikes by instead downgrading performance. This limit is a per-function
# limit. You can override the limit for each function using the max_instances
# parameter in the decorator, e.g. @https_fn.on_request(max_instances=5).
set_global_options(max_instances=10)

initialize_app()

@https_fn.on_request()
def manage_user_profile(req: https_fn.Request) -> https_fn.Response:
    """
    Manage user profile data in Firestore
    
    GET: Retrieve user profile by userId query parameter
    POST: Update user profile with JSON body containing userId and profileData
    
    Example POST body:
    {
        "userId": "user123",
        "profileData": {
            "displayName": "John Doe",
            "bio": "Software developer",
            "avatarUrl": "https://...",
            "location": "Paris, France"
        }
    }
    """
    from firebase_admin import firestore
    import json
    from datetime import datetime
    
    # CORS headers
    headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
    }
    
    # Handle preflight OPTIONS request
    if req.method == 'OPTIONS':
        return https_fn.Response('', status=204, headers=headers)
    
    try:
        db = firestore.client()
        
        # GET: Retrieve user profile
        if req.method == 'GET':
            user_id = req.args.get('userId')
            
            if not user_id:
                return https_fn.Response(
                    json.dumps({"error": "userId parameter is required"}),
                    status=400,
                    mimetype='application/json',
                    headers=headers
                )
            
            # Fetch user profile from Firestore
            user_ref = db.collection('users').document(user_id)
            user_doc = user_ref.get()
            
            if not user_doc.exists:
                return https_fn.Response(
                    json.dumps({"error": "User not found"}),
                    status=404,
                    mimetype='application/json',
                    headers=headers
                )
            
            profile_data = user_doc.to_dict()
            
            # Convert datetime objects to ISO format strings for JSON serialization
            if 'updatedAt' in profile_data and profile_data['updatedAt']:
                profile_data['updatedAt'] = profile_data['updatedAt'].isoformat()
            
            return https_fn.Response(
                json.dumps({
                    "success": True,
                    "userId": user_id,
                    "profile": profile_data
                }),
                status=200,
                mimetype='application/json',
                headers=headers
            )
        
        # POST: Update user profile
        elif req.method == 'POST':
            data = req.get_json()
            
            if not data:
                return https_fn.Response(
                    json.dumps({"error": "Request body is required"}),
                    status=400,
                    mimetype='application/json',
                    headers=headers
                )
            
            user_id = data.get('userId')
            profile_data = data.get('profileData', {})
            
            if not user_id:
                return https_fn.Response(
                    json.dumps({"error": "userId is required in request body"}),
                    status=400,
                    mimetype='application/json',
                    headers=headers
                )
            
            # Add timestamp
            profile_data['updatedAt'] = datetime.now()
            
            # Update user profile in Firestore (merge=True keeps existing fields)
            user_ref = db.collection('users').document(user_id)
            user_ref.set(profile_data, merge=True)
            
            return https_fn.Response(
                json.dumps({
                    "success": True,
                    "message": "Profile updated successfully",
                    "userId": user_id
                }),
                status=200,
                mimetype='application/json',
                headers=headers
            )
        
        else:
            return https_fn.Response(
                json.dumps({"error": f"Method {req.method} not allowed"}),
                status=405,
                mimetype='application/json',
                headers=headers
            )
    
    except Exception as e:
        return https_fn.Response(
            json.dumps({
                "error": "Internal server error",
                "details": str(e)
            }),
            status=500,
            mimetype='application/json',
            headers=headers
        )


@https_fn.on_call()
def get_user_stats(req: https_fn.CallableRequest) -> dict:
    """
    Get user statistics (callable function - more secure for authenticated calls)
    
    Call from frontend with:
    const getUserStats = httpsCallable(functions, 'get_user_stats');
    const result = await getUserStats({ userId: 'user123' });
    """
    from firebase_admin import firestore
    
    try:
        user_id = req.data.get('userId')
        
        if not user_id:
            raise https_fn.HttpsError(
                code=https_fn.FunctionsErrorCode.INVALID_ARGUMENT,
                message="userId is required"
            )
        
        db = firestore.client()
        user_ref = db.collection('users').document(user_id)
        user_doc = user_ref.get()
        
        if not user_doc.exists:
            raise https_fn.HttpsError(
                code=https_fn.FunctionsErrorCode.NOT_FOUND,
                message="User not found"
            )
        
        user_data = user_doc.to_dict()
        
        # Calculate some stats
        stats = {
            "userId": user_id,
            "displayName": user_data.get('displayName', 'Unknown'),
            "accountCreated": user_data.get('createdAt'),
            "lastUpdated": user_data.get('updatedAt'),
            "profileComplete": bool(
                user_data.get('displayName') and 
                user_data.get('bio') and 
                user_data.get('avatarUrl')
            )
        }
        
        return {
            "success": True,
            "stats": stats
        }
    
    except https_fn.HttpsError:
        raise
    except Exception as e:
        raise https_fn.HttpsError(
            code=https_fn.FunctionsErrorCode.INTERNAL,
            message=f"Error fetching user stats: {str(e)}"
        )

