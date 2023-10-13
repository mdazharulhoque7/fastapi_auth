import React from 'react'

function Login() {
    return (
        <>
            <div>
                <h1 className='mb-4 text-3xl font-bold text-center cursor-pointer'>Welcome to FunnelERP</h1>
                <p className='mx-auto mb-8 text-sm font-semibold tracking-wide text-center text-gray-700 cursor-pointer w-80'>Please login to your account!</p>
            </div>
            <form>
                <div className='space-y-4'>
                    <input type='text' placeholder='Username' className='block w-full px-4 py-3 text-sm border rounded-lg outline-none focus:ring-1 focus: ring-cyan-400 focus:shadow-cyan-500/40' />
                </div>

                <div className='mt-2 space-y-4'>
                    <input type='password' placeholder='Password' className='block w-full px-4 py-3 text-sm border rounded-lg outline-none focus:ring-1 focus: ring-cyan-400 focus:shadow-cyan-500/40' />
                </div>
                <div className="mt-6 text-center">
                    <button type="submit" className="w-64 py-3 text-xl text-white outline-none bg-cyan-500 hover:bg-cyan-600 rounded-2xl active:bg-cyan-500">Sign In</button>
                </div>
            </form>
        </>
    )
}

export default Login