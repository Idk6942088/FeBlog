import React from 'react'
import { auth } from '../utility/firebaseApp'
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile} from 'firebase/auth'
import { createContext } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'

export const UserContext = createContext()

export const UserProvider=({children})=>{
    const [user,setUser]=useState(null)
    const [msg,setMsg]=useState({})
    
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth,(currentUser)=>{
            setUser(currentUser)
        })
        return ()=>unsubscribe()
    },[])

    const signInUser=async (email,password)=>{
        try {
            await signInWithEmailAndPassword(auth,email,password)
            delete msg?.err
            setMsg({...msg, signin:"Login successfull"})
        } catch (error) {
            console.log(error);
            setMsg({...msg,err:error.message})
        }
    }

    const logoutUser=async ()=>{
        await signOut(auth)
        delete msg?.signin
    }

    const signUpUser = async (email,password,displayName) => {
        try {
            await createUserWithEmailAndPassword(auth,email,password)
            await updateProfile(auth.currentUser,{displayName})
            delete msg?.err
        } catch (error) {
            console.log(error);
            setMsg({...msg,err:error.message})
        }
    }

    return(
        <UserContext.Provider value={{user,signInUser,logoutUser,signUpUser,msg}}>
            {children}
        </UserContext.Provider>
    )
}