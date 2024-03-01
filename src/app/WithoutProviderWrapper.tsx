"use client"
import React from 'react';

const WithoutProviderWrapper = ({ children }: { children: React.ReactNode }) => {
    const isLoggedIn = Boolean(localStorage.getItem("isLoggedIn"))

    return (<>
        <div
            className={`${isLoggedIn === true ? "m-4" : ""}`}
        >
            {children}
        </div>
    </>)
}

export default WithoutProviderWrapper
