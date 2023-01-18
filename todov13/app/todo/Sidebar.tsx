
import React, { useEffect, useRef, useState, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { userAction } from '../../store/store'




const Sidebar = ({isHeader} : any) => {
  const days = [
    { value: "sunday", label: "Sunday" },
    { value: "monday", label: "Monday" },
    { value: "tuesday", label: "Tuesday" },
    { value: "wednesday", label: "Wednesday" },
    { value: "thursday", label: "Thursday" },
    { value: "friday", label: "Friday" },
    { value: "saturday", label: "Saturday" },
  ]
  const {sortByDay} = useSelector((state : any) => state.userReducer)
  const dispatch = useDispatch()
  

  const resetFilter = () => {
    dispatch(userAction.setFilter(''))
    if(isHeader)
      dispatch(userAction.setNavbar())
  }

  const setFilter = (day : any) => { 
    dispatch(userAction.setFilter(day.value))
    if(isHeader)
      dispatch(userAction.setNavbar())
  }


  return (
    <aside
      className={isHeader ? "xss:flex bg-slate-500 rounded w-screen" : 'xss:hidden' + " w-64  laptop:block rounded overflow-y-hidden bg-gray-500 bg-opacity-60 border-gray-200"}>
      <div className="px-3 py-8 mobile:h-full overflow-y-auto">
        <ul className="space-y-2">
          <li className='flex items-center'>
            <a className="font-mono flex items-center p-2 text-base text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 font-bold">
              <svg aria-hidden="true" className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path></svg>
              <span className="ml-3">Filter By Day</span>
            </a>
          </li>
          <li className='flex justify-end'>
            {sortByDay && <a onClick={() => { resetFilter() }} className='flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700 hover:cursor-pointer h-6'>
              Reset
            </a>}
          </li>
          {days.map((day, i) => {
            let { label, value } = day
            return (
              <li key={i} className={sortByDay == value ? "bg-gray-200 rounded-lg" : ''}>
                <a onClick={() => { setFilter(day) }} className="font-mono flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 hover:cursor-pointer">
                  <span className="flex-1 ml-3 whitespace-nowrap">{label}</span>
                </a>
              </li>
            )
          })}

          {/* {isLoggedin ?
                        <li>
                            <div>
                                <button onClick={() => { logout() }} className="py-2 pl-3 pr-4 text-white flex items-end bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-white dark:bg-blue-600 md:dark:bg-transparent laptop:hidden" >Logout {logoutSvg()}
                                </button>
                            </div>

                        </li>
                        :
                        <li>
                            <Link to="/" className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-white dark:bg-blue-600 md:dark:bg-transparent" >Login</Link>
                        </li>
                    } */}
        </ul>
      </div>

    </aside>

  )
}


export default Sidebar
