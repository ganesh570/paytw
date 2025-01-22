import {useState} from 'react'
import {Heading} from '../components/Heading'
import {Button} from '../components/Button'
import {InputBox} from '../components/InputBox'
import {SubHeading} from '../components/SubHeading'
import {BottomWarning} from '../components/BottomWarning'
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

export const Signin=()=>{
    const navigate=useNavigate();
    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");
    return <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading label={"Sign in"} />
        <SubHeading label={"Enter your credentials to access your account"} />
        <InputBox placeholder={"messithegoat10@gmail.com"} label={"Email"} 
        onChange={(e)=>{
          setUsername(e.target.value);
        }} ty={"text"}/>
        <InputBox placeholder="12345" label={"Password"} onChange={(e)=>{
          setPassword(e.target.value);
        }} ty={"password"}/>
        <div className="pt-4">
          <Button label={"Sign in"} onPress={async ()=>{
            const response=await axios.post("http://localhost:3000/api/v1/user/signin",{
              username,
              password
            });
            console.log(response);
            localStorage.setItem("token",response.data.token);
            navigate("/dashboard")
          }}/>
        </div>
        <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
      </div>
    </div>
  </div>
    

}