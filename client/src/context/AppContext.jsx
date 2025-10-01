import { useState } from "react";
import { AppContent  } from "./AppContent";

export const AppContextProvider = (props) => {
    const backendUrl = import.meta.env.BACKEND_URL;
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [userData, setUserData] = useState(false)
    const value = {
        backendUrl,
        isLoggedIn,
        setIsLoggedIn,
        userData,
        setUserData
    }
    return (
        <AppContent.Provider value={value}>
            {props.children}
        </AppContent.Provider>
    )
}