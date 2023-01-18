
import styles from '../styles/Home.module.css'
import { useEffect, useState } from "react";
// import { useDispatch } from 'react-redux';
// import axios from 'axios';
import { useRouter } from 'next/navigation'
import { useAuth } from '../context/AuthUserContext';


export default function Home() {
  const [usedata, setUserData] = useState({ email: '', password: '' })
  const { signInWithEmailAndPassword } = useAuth();
  const router = useRouter()
  // const dispatch = useDispatch()

  // handle login
  const handleLoginSubmit = async () => {
    let {email,password} = usedata;
    signInWithEmailAndPassword(email, password)
      .then(authUser => {
        console.log("Success. The user is created in firebase")
        router.push('/todo');
      })
      .catch(error => {
        console.error("ERROR :",error.message)
      });
    // dispatch(userAction.setLogin())
    // dispatch(userAction.setUserData(res.data))
    // router.push('/todo')
    // return toast.success('logged in!');
  }


  // input change handling
  const handleInputChange = ({ target }) => {
    let { value, name } = target;
    setUserData({ ...usedata, [name]: value })
  }

  return (
    <main className={'xss:w-full xss:p-2 xss:mt-4'}>
      <div
        className="w-full bg-white laptop:w-2/4 rounded-lg dark:border md:mt-0 xl:p-0 dark:bg-gray-800 dark:border-gray-700 shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px] laptop:m-auto"
      >
        <div className="p-5 bg-white rounded-lg ">
          <h3 className="my-4 text-2xl font-semibold text-gray-700">Account Login</h3>
          <form className="flex flex-col space-y-5">
            <div className="flex flex-col space-y-1">
              <label htmlFor="email" className="text-sm font-semibold text-gray-500">Email address</label>
              <input
                type="email"
                name="email"
                onChange={handleInputChange}
                className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
              />
            </div>
            <div className="flex flex-col space-y-1">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-sm font-semibold text-gray-500">Password</label>
              </div>
              <input
                type="password"
                name="password"
                onChange={handleInputChange}
                className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
              />
            </div>

            <div>
              <button
                type="button" onClick={() => { handleLoginSubmit() }}
                className="w-full px-4 py-2 text-lg font-semibold text-white transition-colors duration-300 bg-blue-500 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-blue-200 focus:ring-4"
              >
                Log in
              </button>
              <p className="text-sm font-light text-gray-500 mt-3 dark:text-gray-400">
                Don’t have an account yet? <a onClick={() => { router.push('/signup') }} className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>
              </p>
            </div>

          </form>
        </div>
      </div>

    </main>
  )
}
