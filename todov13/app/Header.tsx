'use client';
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { userAction } from '../store/store';
import Sidebar from './todo/Sidebar';

const Header = () => {
    const user_data = useSelector((state: any) => state.userReducer.userData)
    const isLoginGlobal = useSelector((state: any) => state.userReducer.isLogin)
    const navbar = useSelector((state: any) => state.userReducer.isNavOpen)
    const [userSate, SetuserState]: any = useState({})
    const [isLogin, setIsLogin]: any = useState({})

    useEffect(()=>{
        setIsLogin(isLoginGlobal)
    },[isLoginGlobal])

    const dispatch = useDispatch()
    const router = useRouter()

    useEffect(() => {
        SetuserState(user_data)
    }, [user_data])

    const handleLogout = () => {
        localStorage.removeItem('user_data')
        dispatch(userAction.setLogout())
        dispatch(userAction.setUserData({}))
        SetuserState({})
        router.push('/')
    }

    return (
        <header className="w-full p-3 border-gray-200 rounded bg-gray-50 dark:bg-gray-800 dark:border-gray-700 h-15 shadow-[0_3px_10px_rgb(0,0,0,0.2)] ">
            <div className="flex flex-wrap items-center justify-between mx-auto px-4">
                {isLogin && <div className="laptop:hidden xxs:block ">
                    <button
                        className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                        onClick={() => dispatch(userAction.setNavbar())}
                    >
                        {navbar ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-6 h-6 text-black"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-6 h-6 text-black"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        )}
                    </button>
                </div>}
                <a className="flex items-center">
                    <img src="https://www.egenienext.com/wp-content/themes/egenienext/images/logo.png" className="h-6 mr-3 sm:h-10" alt="Flowbite Logo" />
                </a>

                <div
                    className={
                        "md:flex mobile:hidden"
                    }
                >
                    <ul className="flex mt-1 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
                        {userSate && userSate.name ?
                            <li>
                                <div>
                                    <p>
                                        Hi! {userSate.name.toUpperCase()}
                                    </p>
                                    <button onClick={handleLogout} className="py-1 pl-3 h- pr-4 text-white flex items-end bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-white dark:bg-blue-600 md:dark:bg-transparent" >Logout
                                    </button>
                                </div>

                            </li>
                            :
                            <li>
                                <Link href="/" className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-white dark:bg-blue-600 md:dark:bg-transparent" >Login</Link>
                            </li>
                        }
                    </ul>
                </div>

            </div>
            {navbar && <div className='absolute top-20 left-0 z-10'>
                <Sidebar isHeader />
            </div>}
        </header>



    )
}

export default Header