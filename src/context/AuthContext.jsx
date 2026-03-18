import { useState, createContext, useContext, useEffect } from "react";
import app from "../firebase";

import{
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from "firebase/auth"

const AuthContext = createContext()

const auth = getAuth(app)

export function AuthProvider({children}){
    const [user, setUser] = useState(null);

    //signup
    const signup = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    //login
    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }

    //logout
    const logout = () =>{
        return signOut(auth);
    }

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (currentUser)=>{
            setUser(currentUser);

        });

        return unsubscribe;
    }, []);

    return (
        <AuthContext.Provider value={{ user, signup, login, logout }}>
            {children}
        </AuthContext.Provider>
    );

}

//custom hook
export function useAuth(){
    return useContext(AuthContext)
}