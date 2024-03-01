"use client"

import React from 'react'
import toast from 'react-hot-toast';
import { LuLogOut } from "react-icons/lu";
import { useRouter } from 'next/navigation'
import { handleNavigation } from '@/utils/utils';
const Navbar = () => {
    const isLoggedIn = Boolean(localStorage.getItem("isLoggedIn"))
    const router = useRouter()

    const handleLogout = async () => {
        try {
            let signupLocalData: any = localStorage.getItem("userAuth")
            if (signupLocalData) {
                signupLocalData = JSON.parse(signupLocalData)
                let localUserData: any = localStorage.getItem("userData")
                if (localUserData) {
                    localUserData = JSON.parse(localUserData)
                    localStorage.setItem("isLoggedIn", "")
                    localStorage.setItem("userData", "")
                    location.replace("/signin")
                    return
                }
            }
            localStorage.clear()
            location.replace("/signin")
        } catch (err: any) {
            toast.error(err.message)
        }
    }

    return (<>
        {isLoggedIn === true && (<>
            <div className='p-5 bg-white' style={{ borderBottom: "1px solid #ebebeb", boxShadow: "0px -4px 10px 10px #ebebeb" }}>
                <div className='flex justify-between'>
                    <div className='flex'>
                        <div className='font-extrabold text-2xl mr-16 cursor-pointer' onClick={() => handleNavigation({ path: "/", router })}>
                            CraftIndika Retail Pvt Ltd
                        </div>
                    </div>

                    <div className='flex'>
                        <div className='flex items-center' onClick={handleLogout}>
                            <LuLogOut size={25} className='cursor-pointer' />
                        </div>
                    </div>
                </div>
            </div>
        </>)}
    </>)
}

export default Navbar
