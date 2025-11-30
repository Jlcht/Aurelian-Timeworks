// Google OAuth Configuration
const googleAuthConfig = {
    clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
    clientSecret: process.env.REACT_APP_GOOGLE_CLIENT_SECRET,
    redirectUri: process.env.REACT_APP_GOOGLE_REDIRECT_URI || window.location.origin,
};

export default googleAuthConfig;