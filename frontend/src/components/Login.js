import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

function Login(props) {

    const [formData, setFormData] = useState({
        username: "",
        password: ""
    })

    const onChangeFieldValue = (label, event) => {
        switch (label) {
            case 'username':
                setFormData({ ...formData, username: event.target.value });
                break;

            case 'password':
                setFormData({ ...formData, password: event.target.value });
                break;

            default:
                break;
        }

    }

    const formSubmitHandler = async (event) => {
        event.preventDefault();
        console.log(formData);

        // post data to login api for authentication
        await axios.post("")
    }


    return (
        <>
            <div>
                <h1 className='mb-4 text-3xl font-bold text-center cursor-pointer'>Welcome to FunnelERP</h1>
                <p className='mx-auto mb-8 text-sm font-semibold tracking-wide text-center text-gray-700 cursor-pointer w-80'>Please login to your account!</p>
            </div>
            <form onSubmit={formSubmitHandler}>
                <div className='space-y-4'>
                    <input type='text'
                        placeholder='Username'
                        onChange={
                            (event) => {
                                onChangeFieldValue("username", event)
                            }}
                        className='block w-full px-4 py-3 text-sm border rounded-lg outline-none focus:ring-1 focus: ring-cyan-400 focus:shadow-cyan-500/40' />
                </div>

                <div className='mt-2 space-y-4'>
                    <input
                        type='password'
                        placeholder='Password'
                        onChange={
                            (event) => {
                                onChangeFieldValue("password", event)
                            }}
                        className='block w-full px-4 py-3 text-sm border rounded-lg outline-none focus:ring-1 focus: ring-cyan-400 focus:shadow-cyan-500/40' />
                </div>

                <div className="mt-6 text-center">
                    <button type="submit" className="w-64 py-3 text-xl text-white outline-none bg-cyan-500 hover:bg-cyan-600 rounded-2xl active:bg-cyan-500">Sign In</button>
                    <p className='mt-4 text-sm'>
                        You don't have an account?{" "}
                        <Link to="/register" onClick={() => {
                            props.setPage("register")
                        }}>
                            <span className='underline cursor-pointer'>Register</span>
                        </Link>

                        <span> or{" "} </span>
                        <Link
                            to="/forget_password"
                            onClick={() => {
                                props.setPage("forget_password")
                            }}
                        >
                            <span className='underline cursor-pointer'>Forget password</span>
                        </Link>

                    </p>
                </div>
            </form>
        </>
    )
}

export default Login