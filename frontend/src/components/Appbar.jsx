import {useEffect,useState} from 'react';
import {Button} from "../components/Button"
import {useUser} from '../hooks/useUser'
import {useNavigate} from "react-router-dom"

export const Appbar=()=>{
    const navigate=useNavigate();
    const use=useUser();
    let uname=null
    // const [uname,setUser]=useState("")
    if(use.loading){
        return "Loading..."
    }
    if(use.user){
       uname=use.user.firstName
    }

    
    return <div className="shadow h-14 flex justify-between">
             <div className="flex flex-col justify-center h-full ml-4 text-xl color">
                <b>PAYTW</b>
             </div>
            <div className='flex flex-row '>
            <div className="mt-2 mr-3">
                <Button onPress={()=>{
                        localStorage.removeItem("token");
                        navigate("/signin")
                    }} label={"Logout"}></Button>
             </div>
             <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
             
                <div className="flex flex-col justify-center h-full text-xl">
                
                    {uname[0].toUpperCase()}
                </div>
            </div>
            </div>
        </div>
    
}