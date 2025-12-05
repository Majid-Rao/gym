import React, { createContext,useContext, useEffect ,useState} from 'react'
import { useNavigate } from "react-router-dom";
const AuthContext = createContext();
export const AuthProvider = ({ children}) => {
 const [token, setToken] = useState(null);
 const [UserData, setUserData] = useState(null);
 const [isAuthenticated, setIsAuthenticated] = useState(false);
 const [isAuthenticatedT, setIsAuthenticatedT] = useState(false);
 const storedData = JSON.parse(localStorage.getItem('user_data'));
 let navigate = useNavigate();
 useEffect(()=>{
if(storedData){
    const {userToken, user} = storedData;
    setToken(userToken);
    setUserData(user);
    if(user.role == 'admin')
      {
        setIsAuthenticated(true);
      }
      else if(user.role == 'user'){
        setIsAuthenticatedT(true);
      }

}
 },[]);
 const login = (newToken, newData)=>{
    localStorage.setItem("user_data", JSON.stringify({userToken: newToken, user: newData, uid: newData._id}),
);
    setToken(newToken);
    setUserData(newData);
    
    if(newData.role == 'admin')
    {
      setIsAuthenticated(true);
      navigate("/admindashboard");
    }
    else if(newData.role == 'user'){
      setIsAuthenticatedT(true);
       navigate("/userdashboard");
    }
    
 };



 const logout =()=>{
    localStorage.removeItem('user_data')
    setToken(null);
    setUserData(null);
    if(UserData.role == 'admin')
      {
        setIsAuthenticated(false);
        navigate("/signIn");
  
      }
      else if(UserData.role == 'user'){
        setIsAuthenticatedT(false);
        navigate("/signIn");

      }
 }
    return (
    <AuthContext.Provider  value={{
      token,
      isAuthenticated,
      isAuthenticatedT,
      login,
      logout,
      UserData,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth =()=> useContext(AuthContext);
