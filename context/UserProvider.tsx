'use client'
import { logout } from '@/api/logout';
import * as React from 'react';
import { useRouter } from 'next/navigation';



// user type
export type User = {
    id: number;
    email: string;
    balance: number;
    created_at: Date | string;
    ev: number;
    firstname: string;
    lastname: string;
    mobile: string;
    status: number | boolean;
    updated_at: Date | string;
    username: string;
    phone_veriry_code: number;
    [key: string]: any;
}


export type UserContextType = {
    user: User | null;
    setUser: (user: User | null) => void;
    logout: () => void;
}


export const UserContext = React.createContext <UserContextType> ({
    user: null,
    setUser: (user: any) => {},
    logout: () => {}
});

export const UserProvider = ({children}: {children: React.ReactNode}) => {
    const [user, setUser] = React.useState<User | null>(null);
    const route = useRouter();

    const logoutUser = () => {
       logout().then(() => {
        setUser(null); 
        route.push('/login');
        localStorage.removeItem('xtx');

       })
    }

    return(
        <UserContext.Provider value={{user, setUser, logout: logoutUser}}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => React.useContext(UserContext);