import { GlobalLoaderProvider } from "@/context/GlobalLoader"
import { UserProvider } from "@/context/UserProvider"
import React from "react"


const Provider = ({ children }: {children: React.ReactNode}) => {
    return(
        <GlobalLoaderProvider>
            <UserProvider>
                {children}
            </UserProvider>
        </GlobalLoaderProvider>
    )
}


export default Provider;