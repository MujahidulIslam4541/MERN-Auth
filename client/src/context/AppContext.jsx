import { useState } from "react";
import { AppContent } from "./AppContent";
import toast from "react-hot-toast";
import axios from "axios";

export const AppContextProvider = (props) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [userData, setUserData] = useState(false)


    const getUserData = async () => {
        try {
            const { data } = await axios.get(backendUrl + `/api/user/profileData`)
            data.success ? setUserData(data.userData) : toast.error(data?.message)
        } catch (error) {
            toast.error(error.message)
        }
    }

    const value = {
        backendUrl,
        isLoggedIn,
        setIsLoggedIn,
        userData,
        setUserData,
        getUserData
    }
    return (
        <AppContent.Provider value={value}>
            {props.children}
        </AppContent.Provider>
    )
}