"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import Input from '@/components/input'
import Advertisement from '@/components/Advertisement'

import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { handleNavigation, hideLoader, showLoader } from '@/utils/utils'
import Button from '@/components/Button'
const isLoggedIn = Boolean(localStorage.getItem("isLoggedIn"))
if (isLoggedIn === true) {
  location.replace("/")
}
const SignUp = () => {
  const router = useRouter()
  const [signupFormData, setSignupFormData] = useState({ name: "", email: "", password: "", phone: "" })

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    try {
      let signupLocalData: any = localStorage.getItem("userAuth")
      if (signupLocalData) {
        signupLocalData = JSON.parse(signupLocalData)
        const userExist = signupLocalData.filter((io: any) => io.email === signupFormData.email)
        if (userExist.length > 0) {
          toast.error("User already exist")
          return
        }
        const data = JSON.stringify([...signupLocalData, signupFormData])
        localStorage.setItem("userAuth", data)
        toast.success("You have successfully signup!")
        handleNavigation({ path: "/signin", router })
        return
      }
      const data = JSON.stringify([signupFormData])
      localStorage.setItem("userAuth", data)
      toast.success("You have successfully signup!")
      handleNavigation({ path: "/signin", router })
    } catch (err: any) {
      toast.error(err.message)
    }
  }

  return (
    <div className='flex w-full'>
      <div className='lg:w-full lg:h-screen lg:justify-center lg:items-center lg:bg-primary4 hidden lg:flex '>
        <Advertisement />
      </div>
      <div className='lg:p-14 lg:w-6/12 w-full p-14 h-screen'>
        <div className='flex flex-col justify-center h-5/6'>
          <div className='font-black text-3xl'>
            Start using CraftIndika today!
          </div>
          <div className='text-2xl mt-20 '>
            Sign Up
          </div>
          <div>
            Already have an account? <Link
              href="/signin"
              onClick={e => {
                e.preventDefault()
                handleNavigation({ path: "/signin", router })
              }}
              className='font-bold'
            >
              Log in here
            </Link>
          </div>
          <form onSubmit={handleSubmit}>
            <div className='mt-16'>
              <div className='flex mt-4'>
                <div className='w-full'>
                  <Input
                    labeltext="Enter Name"
                    type="text"
                    required={true}
                    onChange={(e: any) => {
                      setSignupFormData({ ...signupFormData, name: e.target.value })
                    }}
                    value={signupFormData.name}
                    placeholder="Enter your name"
                  />
                </div>
              </div>

              <div className='mt-4'>
                <Input
                  labeltext="Email Address"
                  type="email"
                  required={true}
                  onChange={(e: any) => {
                    setSignupFormData({ ...signupFormData, email: e.target.value })
                  }}
                  value={signupFormData.email}
                  placeholder="Enter your email"
                />
              </div>
              <div className='mt-4'>
                <Input
                  labeltext="Password"
                  type="password"
                  required={true}
                  onChange={(e: any) => {
                    setSignupFormData({ ...signupFormData, password: e.target.value })
                  }}
                  value={signupFormData.password}
                  placeholder="Enter your password"
                />
              </div>
              <div className='mt-4'>
                <Input
                  labeltext="Phone"
                  type="number"
                  onChange={(e: any) => {
                    setSignupFormData({ ...signupFormData, phone: e.target.value })
                  }}
                  value={signupFormData.phone}
                  placeholder="Enter your phone"
                />
              </div>

              <div className='mt-4'>

                <Button
                  buttontype="primary"
                  title={"Sign Up"}
                  type='submit'
                  className="w-full"
                />
              </div>
            </div>
          </form>
        </div>
        <div className='text-center text-primary3'>
          {/* © {new Date().getFullYear()} All rights reserved. */}
        </div>
      </div>
    </div>
  )
}

export default SignUp
