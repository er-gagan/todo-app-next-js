"use client"
import React, { useState, useEffect } from 'react'

const WithoutProviderWrapper = ({ children }: { children: React.ReactNode }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    useEffect(() => {
        setIsLoggedIn(Boolean(localStorage.getItem("isLoggedIn")))
    }, [])

    return (<>
        <div
            className={`${isLoggedIn === true ? "m-4" : ""}`}
        >
            {children}
        </div>
    </>)
}

export default WithoutProviderWrapper
