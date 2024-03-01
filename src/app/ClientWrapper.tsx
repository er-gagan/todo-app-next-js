"use client"
import React from 'react'
import { Toaster } from 'react-hot-toast';
import GlobalStateWrapper from './GlobalStateWrapper';


const ClientWrapper = ({ children }: { children: React.ReactNode }) => {

    return (<>

        <GlobalStateWrapper>

            {children}

        </GlobalStateWrapper>

        <Toaster
            position="top-center"
            reverseOrder={false}
        />
    </>)
}

export default ClientWrapper
