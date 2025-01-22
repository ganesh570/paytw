import { useEffect, useState } from "react"
import { Button } from "./Button"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {useUser} from '../hooks/useUser'

export const Users = () => {
    const use=useUser();
    const [users, setUsers] = useState([]);
    const [filte, setFilter] = useState("");

    useEffect(() => {
        
        axios.get(import.meta.env.VITE_BACKEND_URL+"/api/v1/user/bulk?filter=" + filte)
            .then((response) => {
                const filteredUsers = response.data.user.filter(user => {
                    return user._id !== use.user.id
                });
                setUsers(filteredUsers);
               
            })
            
    }, [filte])

    return <>
        <div className="font-bold mt-6 text-lg">
            Users
        </div>
        <div className="my-2">
            <input onChange={(e) => {
                setFilter(e.target.value)
            }} type="text" placeholder="Search" className="w-full px-2 py-1 border rounded border-slate-200"></input>
        </div>
        <div>
            
            {users.map((user) =>( 
                <li key={user} className="flex flex-col">
                    <User user={user} />
                </li>
            ))}
        </div>
    </>
}

function User({user}) {
    const navigate = useNavigate();

    return <div className="flex justify-between">
        <div className="flex">
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    {user.firstName[0]}
                </div>
            </div>
            <div className="flex flex-col justify-center h-ful">
                <div>
                    {user.firstName} {user.lastName}
                </div>
            </div>
        </div>

        <div className="flex flex-col justify-center h-ful">
            <Button onPress={(e) => {
                navigate("/send?id=" + user._id + "&name=" + user.firstName);
            }} label={"Send Money"} />
        </div>
    </div>
}