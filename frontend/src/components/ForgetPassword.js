import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { toast } from 'react-toastify'

export default function ForgetPassword(props) {
    // Form State
    const [formData, setFormData] = useState({
        email: "",
        new_password: ""
    })

    const onChangeFormState = (label, event) => {
        switch (label) {
            case 'email':
                setFormData({ ...formData, email: event.target.value });
                break;
            case 'new_password':
                setFormData({ ...formData, new_password: event.target.value });
                break;
            default:
                break;
        }
    }

    const navigate = useNavigate();

    const onFormSubmitHandler = async (event) => {
        event.preventDefault();
        console.log(formData);
        await axios.post(process.env.REACT_APP_BACKEND_URL + "/auth/forget_password", formData)
            .then((res) => {
                // redirect to login component
                navigate('/login');
                toast.success(res.data.detail);
                // reload browser
                setTimeout(() => {
                    window.location.reload();
                }, 1000)
            })
            .catch((error) => {
                toast.error(error.response.data.detail)
            })
    }


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
            <form onSubmit={onFormSubmitHandler}>
                <div className='space-y-4'>
                    <input type='email'
                        placeholder='Email'
                        onChange={(event) => {
                            onChangeFormState('email', event)
                        }}
                        className='block w-full px-4 py-3 text-sm border rounded-lg outline-none focus:ring-1 focus: ring-cyan-400 focus:shadow-cyan-500/40' />
                </div>

                <div className='mt-2 space-y-4'>
                    <input type='password'
                        onChange={(event) => {
                            onChangeFormState('new_password', event)
                        }}
                        placeholder='New Password' className='block w-full px-4 py-3 text-sm border rounded-lg outline-none focus:ring-1 focus: ring-cyan-400 focus:shadow-cyan-500/40' />
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