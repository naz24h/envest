import { logout } from '@/api/logout';
import * as React from 'react';
import { useRouter } from 'next/navigation';


export const UserContext = React.createContext({
    user: null,
    setUser: (user: any) => {},
    logout: () => {}
});


export const UserProvider = ({children}: {children: React.ReactNode}) => {
    const [user, setUser] = React.useState(null);
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