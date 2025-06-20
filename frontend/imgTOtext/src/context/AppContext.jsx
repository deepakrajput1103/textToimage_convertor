import { createContext, useNavigate, useEffect, useState } from "react";
export const AppContext = createContext()
import axios from 'axios'
import { toast } from "react-toastify";

const AppContextProvider = (props)=>{
    const [user, setUser] = useState(null);
    const [showLogin, setshowLogin] = useState(false);
    const [token, setToken] = useState(localStorage.getItem('token'))

    const [credit,setCredit] = useState(false);

    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const navigate = useNavigate;

    const loadCreditsData = async ()=>{
        try{
                if (!token) {
        toast.error("No authentication token found");
        return;
    }
                const { data } = await axios.get(`${backendUrl}/api/user/credits`, {
                headers: {
                    Authorization: `Bearer ${token}` // Standard JWT format
                }
            });

            if(data.success){
                setCredit(data.credits)
                setUser(data.user)
            }
         }
        catch(error){
            console.log(error)
             toast.error(error.message)
        }
    }

    const generateImage = async (prompt)=>{
        try{
            const { data } = await axios.post(`${backendUrl}/api/image/generate-image`,{prompt}, {
                headers: {
                    Authorization: `Bearer ${token}` // Standard JWT format
                }
            });

            if(data.success){
                loadCreditsData()
                return data.resultImage;
            }
            else{
                toast.error(data.message);
                loadCreditsData()
                if(data.creditBalance===0){
                    navigate('/buy');
                }
            }
        } catch (error){
            toast.error(error.message)
        }
    }

    const logout = ()=>{
        localStorage.removeItem('token');
        setToken('')
        setUser(null)
    }

    useEffect(()=>{
        if(token){
            loadCreditsData()
        }
    },[token])

    const value = {
        user, setUser , showLogin, setshowLogin,backendUrl,token,setToken,credit,setCredit,loadCreditsData, logout,generateImage
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;