"use client"
import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { hideLoader, showLoader } from '@/utils/utils';

const GlobalStateWrapper = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();

    useEffect(() => {
        if (typeof window !== 'undefined') {
            if (pathname === location.pathname) {
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
