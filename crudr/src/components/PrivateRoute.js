import useAuth from "../hook/useAuth";
import {Navigate} from 'react-router-dom';

export default function PrivateRoute ({children}){
    const auth = useAuth();
    return auth ? children : <Navigate to='/login' replace={true} />;

}