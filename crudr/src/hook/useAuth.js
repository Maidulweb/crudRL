export default function useAuth (){
    const auth = localStorage.getItem('auth_token')
    if(auth){
        return true;
    } else {
        return false;
    }
    
    
}