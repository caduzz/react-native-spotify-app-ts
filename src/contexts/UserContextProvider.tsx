import { useState, useEffect, createContext, ReactNode } from 'react'
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { UserParams } from '../@types/music';

type UserContextProps = {
  children: ReactNode
}

type UserContextType = {
    user: UserParams
    userLogin: (user: UserParams) => void,
    userLogout: () => void
}

const initialValue: UserContextType = {
    user: { logged: false },
    userLogin: () => {},
    userLogout: () => {}
}

export const UserContext = createContext<UserContextType>(initialValue);

export const UserContextProvider = ({ children }: UserContextProps) => {
    const [user, setUser] = useState<UserParams>(initialValue.user)

    const { setItem } = useAsyncStorage("spotify@user")


    const setUserStatus = (user : UserParams) => {
        setUser(user)
        setItem(JSON.stringify(user))
    }

    const userLogin = (userLogin : UserParams) => {
        setUserStatus(userLogin)
    }

    const userLogout = () => {
        setUserStatus({logged: false})
    }

    return (
        <UserContext.Provider
            value={{
                user,
                userLogin,
                userLogout
            }}
        >
            {children}
        </UserContext.Provider>
    ); 
}