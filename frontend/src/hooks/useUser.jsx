import axios from 'axios';
import {useState,useEffect} from 'react';

export const useUser=()=>{
    const [loading,setLoad]=useState(true);
    const [user,setUser]=useState(null);

    async function setting(){
        try{
            const res=await axios.get(import.meta.env.VITE_BACKEND_URL+"/api/v1/user/me",{
                headers: {
                    authorization: 'Bearer '+localStorage.getItem("token")
                }
            });
            setUser(res.data);
            
        }catch(e){
            console.error(e);
        }
        setLoad(false);
    }

    useEffect(()=>{
        setting();
        
    },[])

    return {
        loading,user
    }

}