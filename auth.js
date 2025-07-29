// Authentication functionality using Firebase
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { 
    getAuth, 
    signInWithPopup, 
    GoogleAuthProvider, 
    signOut, 
    onAuthStateChanged 
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
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        console.log('User signed in:', user.displayName);
        return user;
    } catch (error) {
        console.error('Error signing in:', error);
        throw error;
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