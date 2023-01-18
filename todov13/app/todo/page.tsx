'use client';

import React, { useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux';
import CreateTodo from './CraeteToto'
import TodoList from './TodoList'
import {fetchTodos} from '../../store/store'
import Sidebar from './Sidebar';



const Todo = (props: any) => {
    const dispatch = useDispatch()
    const {UserTodos :toDosList , filteredTodos,sortByDay} = useSelector((state : any) => state.userReducer)
    const user_data = useSelector((state : any) => state.userReducer.userData)


    useEffect(()=>{
        // @ts-ignore.
        dispatch(fetchTodos(user_data))
    },[])

    
    return (
        <div className='flex pt-2 h-5/6'>
            <Sidebar />
            <div className='laptop:container mobile:w-full tablet:w-full mx-auto rounded flex flex-col items-center py-6 bg-gradient-to-t h-full bg-orange-100  bg-opacity-60 shadow-[0_3px_10px_rgb(0,0,0,0.2)]'>
                <CreateTodo />
                <div className=' w-11/12 h-full overflow-y-auto'>
                    <div className="w-full h-90 overflow-auto" >
                        <TodoList toDosList={sortByDay ? filteredTodos : toDosList}/>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Todo
