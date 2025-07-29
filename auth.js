// Authentication functionality using Firebase
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { 
    getAuth, 
    signInWithPopup, 
    GoogleAuthProvider, 
    signOut, 
    onAuthStateChanged,
    getRedirectResult
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCl3pQvJKmrLqCDNINXVCJGDmcL7IAxjXI",
    authDomain: "tv-in-bed-website.firebaseapp.com",
    projectId: "tv-in-bed-website",
    storageBucket: "tv-in-bed-website.firebasestorage.app",
    messagingSenderId: "723590249132",
    appId: "1:723590249132:web:c793f255efea5b3025fd09",
    measurementId: "G-MW8JC1TWR4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Sign in with Google
export const signInWithGoogle = async () => {
    try {
        // Try popup first
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        console.log('User signed in:', user.displayName);
        return user;
    } catch (error) {
        // If popup fails, try redirect (fallback for mobile/popup blockers)
        if (error.code === 'auth/popup-blocked' || error.code === 'auth/popup-closed-by-user') {
            console.log('Popup blocked, trying redirect method...');
            const { signInWithRedirect } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js');
            await signInWithRedirect(auth, provider);
        } else {
            console.error('Error signing in:', error);
            throw error;
        }
    }
};

// Sign out
export const signOutUser = async () => {
    try {
        await signOut(auth);
        console.log('User signed out');
    } catch (error) {
        console.error('Error signing out:', error);
        throw error;
    }
};

// Listen for authentication state changes
export const onAuthStateChange = (callback) => {
    return onAuthStateChanged(auth, callback);
};

// Get current user
export const getCurrentUser = () => {
    return auth.currentUser;
};

// Handle redirect result (for when popup is blocked)
export const handleRedirectResult = async () => {
    try {
        const result = await getRedirectResult(auth);
        if (result) {
            const user = result.user;
            console.log('User signed in via redirect:', user.displayName);
            return user;
        }
    } catch (error) {
        console.error('Error handling redirect result:', error);
        throw error;
    }
};