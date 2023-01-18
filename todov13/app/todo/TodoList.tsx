'use client';
import React, { useState ,useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { userAction } from '../../store/store';
import { options, baseUri } from '../../utils'
import SingleTodo from './SingleTodo';



const TodoList = ({toDosList}:any) => {

    return (
        <div className='h-full overflow-y-auto'>
            <div className="w-full h-90 overflow-auto" >
                {toDosList && toDosList.map((contact: any, i: number) => {
                    return (
                        <div key={i} className="py-1.5 px-4 my-1 rounded-lg border-gray-200 dark:border-gray-600 bg-slate-400 shadow bg-opacity-60 hover:bg-gradient-to-l hover:from-gray-200 hover:to-gray-300 bg-gradient-to-l from-gray-50 to-gray-150" >
                            <SingleTodo contact={contact} />
                        </div>
                    )
                }
                )}
            </div>
        </div>
    )
}

export default TodoList