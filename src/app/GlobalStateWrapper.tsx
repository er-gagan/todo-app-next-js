"use client"
import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { hideLoader, showLoader } from '@/utils/utils';

const GlobalStateWrapper = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();

    useEffect(() => {
        if (typeof window !== 'undefined') {
            if (pathname === location.pathname) {
                const isLoggedIn = Boolean(localStorage.getItem("isLoggedIn"))
                if (pathname === "/signin" || pathname === "signup") {
                    if (isLoggedIn === true) {
                        location.replace("/")
                    }
                }

                if (pathname === "/") {
                    if (isLoggedIn === false) {
                        location.replace("/signin")
                    }
                }
                hideLoader()
            } else {
                showLoader()
            }
        }
    }, [pathname])

    return (<>
        {children}
    </>)
}

export default GlobalStateWrapper
