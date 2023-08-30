'use client';
import React from "react";
import Spinner from "./Spinner"


const PageLoading = () => {

    React.useEffect(() => {
        document.body.style.overflow = 'hidden';
        document.body.style.cursor = 'wait';

        return () => {
            document.body.style.overflow = 'auto';
            document.body.style.cursor = 'auto';
        }
    }, [])


    return(
        <div className="absolute top-0 left-0 w-screen h-screen overflow-auto bg-white z-[9999]">
            <div className="w-full h-full flex items-center justify-center">
                <div className="flex items-center space-x-2">
                    <Spinner />
                    <span>Loading...</span>
                </div>
            </div>
        </div>
    )
}

export default PageLoading;