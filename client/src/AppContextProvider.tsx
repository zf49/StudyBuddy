import axios from "axios";
import React, { useCallback, useState } from "react";

interface IUser {
    id: string
}

interface IAppContext {
    userData: IUser | null,
    isBusy: boolean,
    setUserData: (user: IUser | null) => void
    logout: () => Promise<void>
}

const defaultContext: IAppContext = {
    userData: null,
    isBusy: true, // need to load data first,
    setUserData: () => {},
    logout: async () => {}
}

const AppContext = React.createContext<IAppContext>(defaultContext);


const AppContextProvider: React.FC<{children: React.ReactNode}> = ({children}) => {

    const [isBusy, setIsBusy] = useState(true);
    const [userData, setUserData] = useState<IUser | null>(null);

    // consider API or other things here
    const logout = useCallback(async () => {
        // make api call to logout
        // then rest data
        setUserData(null)
    }, [])


    return (
        <AppContext.Provider value={{
            isBusy,
            setUserData,
            userData,
            logout
        }}>{children}</AppContext.Provider>
    )
}

export { AppContext, AppContextProvider };