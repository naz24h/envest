'use client'
import * as React from 'react';

export const GlobalLoaderContext = React.createContext({
    globalLoading: true,
    setGlobalLoading: (value: boolean) => {}
});


export const GlobalLoaderProvider = ({children}: {children: React.ReactNode}) => {
    const [globalLoading, setGlobalLoading] = React.useState(true);
  
    return(
        <GlobalLoaderContext.Provider 
        value={{ globalLoading, setGlobalLoading }}
        >
            {children}
        </GlobalLoaderContext.Provider>
    )
}

export const useGlobalLoading = () => React.useContext(GlobalLoaderContext);