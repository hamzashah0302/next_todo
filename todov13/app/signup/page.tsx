'use client';
import React, { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { baseUri } from '../../utils';
import { userAction } from '../../store/store';
import { useDispatch } from 'react-redux';

const SignUp = () => {
    const [usedata, setUserData] = useState({ email: '', password: '', user_name: '' })
    const dispatch = useDispatch()
    const router = useRouter()

    const handleSigup = async () => {
        let data = usedata;
        let res = await axios.post(baseUri+'userRoute/signUpUser', data)
        if (res.data.error) {
            // return toast.error(res.data.error);
        }
        localStorage.setItem('user_data', await JSON.stringify(res.data));
        dispatch(userAction.setLogin())
        dispatch(userAction.setUserData(res.data))
        router.push('/todo')
        // return toast.success('Registered!');

    }

    // input change handling
    const handleInputChange = ({ target }: any) => {
        let { value, name } = target;
        setUserData({ ...usedata, [name]: value })
    }

    return (
        <>
            {/* <Header /> */}
            <section className="dark:bg-gray-900 bg-gray-100 ">
                <div className="flex flex-col items-center justify-start px-2 pt-2 mx-auto h-screen">
                    <div className="w-full bg-white rounded-lg dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px]">
                        <div className="p-6 space-y-1 md:space-y-1 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Create and account
                            </h1>
                            <form className="space-y-4 md:space-y-6">
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">User Name</label>
                                    <input type="user_name" name="user_name" id="user_name" onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name" required />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                    <input type="email" name="email" id="email" onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="email" required />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                    <input onChange={handleInputChange} type="text" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                                </div>

                                <button type='button' onClick={(e) => handleSigup()} className="w-full px-4 py-2 text-lg font-semibold text-white transition-colors duration-300 bg-blue-500 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-blue-200 focus:ring-4">Create an account</button>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Already have an account? <a href="/" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</a>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>

    )
}

export default SignUp