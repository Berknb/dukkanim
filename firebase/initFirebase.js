import { getFirestore } from 'firebase/firestore'
import { initializeApp } from "firebase/app";
import { useState, useEffect } from "react";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signOut, signInWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDJNMYBR2d5Q5V2AJF3cL3r53z8DClH1iQ",
    authDomain: "dukkanim-ee2a3.firebaseapp.com",
    projectId: "dukkanim-ee2a3",
    storageBucket: "dukkanim-ee2a3.appspot.com",
    messagingSenderId: "857205886309",
    appId: "1:857205886309:web:3a6b8b089deed19822e58c"
}

 // Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();

    export function SignupEmail(email, password){
        return createUserWithEmailAndPassword(auth, email, password)  
     }
     export function login(email, password){
       return signInWithEmailAndPassword(auth, email, password);
     }
     export function logout(){
      return signOut(auth);
     }
     export function useAuth(){
      const [ currentUser, setCurrentUser ] = useState();
     
     
       useEffect(() => {
     const unsub = onAuthStateChanged(auth, user => setCurrentUser(user));
     return unsub;
       },[]
       )
     
       return currentUser
     }