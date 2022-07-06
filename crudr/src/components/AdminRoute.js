import {Navigate} from 'react-router-dom';

export default function AdminRoute (){
    return auth ? children : <Navigate to='/login' replace={true} />;

}