import {useUser} from '../hooks/useUser';
import {useNavigate} from 'react-router-dom';

export const Index=()=>{
    const navigate=useNavigate()
    const use=useUser();
    if(use.loading){
        return 'Loading...'

    }

    if(!use.user){
        navigate("/signup")
        return;
    }
    navigate("/dashboard")
}

