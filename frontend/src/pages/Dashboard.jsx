import {Appbar} from '../components/Appbar'
import {useState,useEffect} from 'react';
import {Balance} from '../components/Balance'
import {Users} from '../components/Users'
import {useUser} from "../hooks/useUser"
import {useNavigate} from "react-router-dom"


export const Dashboard=()=>{
    const navigate=useNavigate();
    const use=useUser();
    console.log(use.user)
    
    
    
    if(use.loading){
        return "Loading..."
    }
    if(!use.user){
        navigate("/signup")
    }

    return <div>
        
        <Appbar />
        <div className="m-8">
            <Balance value={use.user.balance} />
            <Users />
        </div>
    </div>
} 