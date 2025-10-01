import { useState } from "react";
import { AppContext } from "./App.Context";

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
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}