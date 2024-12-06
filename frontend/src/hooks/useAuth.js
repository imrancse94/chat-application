
import { useContext} from "react";
import AuthContext from "@/contexts/auth/AuthContext";
import { setToken,setUser } from "@/helpers";
import { setRefreshToken } from "@/helpers/token";


const useAuth = () => {
   
   const ctx = useContext(AuthContext);

   const {auth} = ctx;
   
   if(auth?.access_token){
      setToken(auth?.access_token);
   }
   
   if(auth?.refresh_token){
      setRefreshToken(auth?.refresh_token);
   }

   if(auth?.user){
      setUser(auth?.user);
   }

   return ctx;
}

export default useAuth;