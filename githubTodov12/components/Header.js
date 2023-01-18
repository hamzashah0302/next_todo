
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation';


const Header = ({authUser, signOut }) => {
    const router = useRouter()

    const handleLogout = () => {
        signOut()
        router.push('/')
    }

    return (
        <div className="w-full p-3 border-gray-200 rounded bg-gray-50 dark:bg-gray-800 dark:border-gray-700 h-15 shadow-[0_3px_10px_rgb(0,0,0,0.2)] ">
            <div className="flex flex-wrap items-center justify-between mx-auto px-4">
                <a className="flex items-center">
                    <img src="https://www.egenienext.com/wp-content/themes/egenienext/images/logo.png" className="h-6 mr-3 sm:h-10" alt="Flowbite Logo" />
                </a>

                <div
                    className={
                        "md:flex mobile:hidden"
                    }
                >
                    <ul className="flex mt-1 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
                        {authUser && authUser.email ?
                            <li>
                                <div>
                                    <p>
                                        Email! {authUser.email}
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
        </div>
    )
}

export default Header