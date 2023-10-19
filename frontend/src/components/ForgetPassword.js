import React from 'react'
import { Link } from 'react-router-dom'

export default function ForgetPassword(props) {
    return (
        <>
            <div>
                <h1 className='mb-4 text-3xl font-bold text-center cursor-pointer'>
                    Welcome to FastApi/React
                </h1>
                <h3 className='mb-4 text-2xl font-bold text-center cursor-pointer'>
                    Forget your password?</h3>
                <p className='mx-auto mb-8 text-sm font-semibold tracking-wide text-center text-gray-700 cursor-pointer w-80'>
                    Now update your account password here.
                </p>
            </div>
            <form>
                <div className='space-y-4'>
                    <input type='email'
                        placeholder='Email'
                        className='block w-full px-4 py-3 text-sm border rounded-lg outline-none focus:ring-1 focus: ring-cyan-400 focus:shadow-cyan-500/40' />
                </div>

                <div className='mt-2 space-y-4'>
                    <input type='password' placeholder='New Password' className='block w-full px-4 py-3 text-sm border rounded-lg outline-none focus:ring-1 focus: ring-cyan-400 focus:shadow-cyan-500/40' />
                </div>

                <div className="mt-6 text-center">
                    <button type="submit" className="w-64 py-3 text-xl text-white outline-none bg-cyan-500 hover:bg-cyan-600 rounded-2xl active:bg-cyan-500">
                        Update Password
                    </button>
                    <p className='mt-4 text-sm'>
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            onClick={() => {
                                props.setPage("login")
                            }}
                        >
                            <span className='underline cursor-pointer'>Sign In</span>
                        </Link>
                    </p>
                </div>
            </form>
        </>
    )
}