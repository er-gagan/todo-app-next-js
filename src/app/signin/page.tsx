"use client"
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Input from '@/components/input'
import Advertisement from '@/components/Advertisement'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { handleNavigation } from '@/utils/utils'
import Button from '@/components/Button'


const Signin = () => {
  const [signinFormData, setSigninFormData] = useState({ email: "", password: "" })
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  useEffect(() => {
    setIsLoggedIn(Boolean(localStorage.getItem("isLoggedIn")))
  }, [])
  const handleSubmit = async (e: any) => {
    e.preventDefault()

    try {
      let signupLocalData: any = localStorage.getItem("userAuth")
      if (signupLocalData) {
        signupLocalData = JSON.parse(signupLocalData)
        const userExist = signupLocalData.filter((io: any) => io.email === signinFormData.email)
        if (userExist.length > 0) {
          if (userExist[0].password === signinFormData.password) {
            toast.success("You have successfully signin!")
            localStorage.setItem("isLoggedIn", "true")
            localStorage.setItem("userData", JSON.stringify(userExist[0]))
            // handleNavigation({ path: "/", router })
            location.replace("/")
            return
          }
        }
      }
      toast.error("Invallid credentials!")
    } catch (err: any) {
      toast.error(err.message)
    }

  }

  return (<>
    {isLoggedIn === false && (<>
      <div className='flex w-full'>
        <div className='lg:w-full lg:h-screen lg:justify-center lg:items-center lg:bg-primary4 hidden lg:flex '>
          <Advertisement />
        </div>
        <div className='lg:p-14 lg:w-6/12 w-full p-14 h-screen'>
          <div className='flex flex-col justify-center h-5/6'>
            <div className='font-black text-3xl'>
              Todo App
            </div>
            <div className='text-2xl mt-20 '>
              Sign In
            </div>
            <div>
              Don't have an account yet? <Link
                href="/signup"
                onClick={e => {
                  e.preventDefault()
                  handleNavigation({ path: "/signup", router })
                }}
                className='font-bold'
              >
                Sign Up
              </Link>
            </div>
            <form onSubmit={handleSubmit}>
              <div className='mt-10'>

                <div className='mt-6'>
                  <Input
                    labeltext="Email"
                    type="email"
                    required={true}
                    onChange={(e: any) => {
                      setSigninFormData({ ...signinFormData, email: e.target.value })
                    }}
                    value={signinFormData.email}
                    placeholder="Enter your email"
                  />
                </div>
                <div className='mt-4'>
                  <Input
                    labeltext="Password"
                    type="password"
                    required={true}
                    onChange={(e: any) => {
                      setSigninFormData({ ...signinFormData, password: e.target.value })
                    }}
                    value={signinFormData.password}
                    placeholder="Enter your password"
                  />
                </div>
                <div className='mt-4'>
                  <div className='flex justify-between'>

                    <div className='flex'>
                      <input type="checkbox" id='remember_me' className='mr-1 w-5' />
                      <label htmlFor="remember_me"> Remember Me</label>
                    </div>
                  </div>
                </div>
                <div className='mt-4'>
                  <Button
                    buttontype="primary"
                    title={"Sign In"}
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
    </>)}
  </>)
}

export default Signin
