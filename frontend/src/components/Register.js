import React from 'react'

export default function Register() {
    return (
        <React.Fragment>
            <div>
                <h1 className='mb-4 text-3xl font-bold text-center cursor-pointer'>Create An Account</h1>
                <p className='mx-auto mb-8 text-sm font-semibold tracking-wide text-center text-gray-700 cursor-pointer w-80'>
                    Welcome to FunnelERP
                </p>
            </div>
            <form>
                <div className='space-y-4'>
                    <input
                        type='text'
                        placeholder='Name'
                        className='block w-full px-4 py-3 text-sm border rounded-lg outline-none focus:ring-1 focus: ring-cyan-400 focus:shadow-cyan-500/40'></input>
                </div>
            </form>
        </React.Fragment>
    )
}
