'use client';

import * as React from 'react';


export const UserContext = React.createContext({});


export const UserProvider = ({children}: {children: React.ReactNode}) => {
    const [user, setUser] = React.useState<[] | null>(null);

    return(
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => React.useContext(UserContext);
