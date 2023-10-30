import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

export default function Home() {
    const [user, setUser] = useState({})

    useEffect(() => {
        // retrieve token and token type from local storage
        const auth_token = localStorage.getItem('auth_token');
        const token_type = localStorage.getItem('auth_token_type');
        const auth_header = token_type + " " + auth_token;

        // Fetch user profile from backend app
        axios.get(process.env.REACT_APP_BACKEND_URL + '/user/profile', {
            headers: { Authorization: auth_header }
        })
            .then((res) => {
                setUser(res.data.result);
            })
            .catch((err) => {
                console.log(err)
            })
    }, []);


    // Logout Button Click Handler
    const onLogoutHandler = (event) => {
        event.preventDefault();

        // remove login details from localstorage
        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_token_type');

        // notify
        toast.info("See You !");
        setTimeout(() => {
            window.location.reload()
        }, 1000);
    }


    return (
        <div className='flex flex-row items-center justify-center w-full h-screen font-sans bg-gray-200'>
            <div className='mx-auto bg-white shadow-xl card w-96 hover:shadow'>
                <img className='w-32 mx-auto -mt-20 border-8 border-white rounded-full'
                    alt="profile"
                    src={user.profile}
                />
                <div className='mt-2 text-3xl font-medium text-center'>
                    {user.name}
                </div>
                <div className='mt-2 text-sm font-light text-center'>
                    @{user.username}
                </div>
                <div className='text-lg font-normal text-center'>{user.email}</div>
                <div className='px-6 mt-2 text-sm font-light text-center'>
                    <p>{user.birth}</p>
                </div>
                <hr className='mt-8'></hr>
                <div className='flex p-4'>
                    <div className='w-1/2 text-center'>
                        <span className='font-bold'>{user.gender}</span>
                    </div>
                    <div className='w-0 border border-gray-300'></div>
                    <div className='w-1/2 text-center'>
                        <span className='font-bold'>{user.phone_number}</span>
                    </div>
                </div>
                <hr className='mt-3'></hr>
                <div className='flex p-2'>
                    <div className='w-full text-center'>
                        <button
                            className='w-64 py-3 text-xl text-black outline-none bg-gray-50 hover:bg-gray-100 active:bg-gray-200'
                            onClick={(event) => {
                                onLogoutHandler(event);
                            }}
                        >Logout</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
