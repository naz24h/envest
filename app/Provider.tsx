import { GlobalLoaderProvider } from "@/context/GlobalLoader"
import { StockContextProvider } from "@/context/StockProvider"
import { UserProvider } from "@/context/UserProvider"
import React from "react"


const Provider = ({ children }: {children: React.ReactNode}) => {
    return(
        <GlobalLoaderProvider>
            <UserProvider>
                <StockContextProvider>
                    {children}
                </StockContextProvider> 
            </UserProvider>
        </GlobalLoaderProvider>
    )
}


export default Provider;