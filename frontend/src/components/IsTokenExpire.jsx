import { jwtDecode } from 'jwt-decode'

export default function IsTokenExpire(token) {
  
    try{

        const decode=jwtDecode(token);
        return decode.exp > Date.now()/1000
    }
    catch (err){
        
        return false
    }
}
