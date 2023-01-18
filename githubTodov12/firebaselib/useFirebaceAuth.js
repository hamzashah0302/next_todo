import { useState, useEffect } from 'react'
import { auth } from './firebaseConfig';
import {
    Auth,
    UserCredential,
    User,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut
} from 'firebase/auth'

const formatAuthUser = (user) => ({
    uid: user.uid,
    email: user.email
});

export default function useFirebaseAuth() {
    const [authUser, setAuthUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const authStateChanged = async (authState) => {
        if (!authState) {
            setLoading(false)
            return;
        }

        setLoading(true)

        var formattedUser = formatAuthUser(authState);

        setAuthUser(formattedUser);

        setLoading(false);

    };

    const clear = () => {
        setAuthUser(null);
        setLoading(true);
    };

    const signInWithEmailAndPasswords = (email, password) =>
        signInWithEmailAndPassword(auth,email, password);

    const createUserWithEmailAndPasswords = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password)

    const signOuts = () =>
        signOut(auth).then(clear);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(authStateChanged);
        return () => unsubscribe();
    }, []);

    return {
        authUser,
        loading,
        signInWithEmailAndPassword : signInWithEmailAndPasswords,
        createUserWithEmailAndPassword : createUserWithEmailAndPasswords,
        signOut : signOuts
    };
}
