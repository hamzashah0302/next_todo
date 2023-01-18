
import React, { useEffect, useState } from 'react'
import CreateTodo from './create'
import TodoList from './TodoList'
import { useAuth } from '../../context/AuthUserContext'
import { collection, getDocs, query, where } from 'firebase/firestore';
import {  database } from '../../firebaselib/firebaseConfig';
const dbInstance = collection(database, 'todo');



const Todo = () => {
    const { authUser = {} } = useAuth();
    const [todos, setTodos] = useState([])
    console.log("server check props ", authUser)

    useEffect(() => {
        getTodos()
    }, [authUser])

    // get todos from firestore
    const getTodos = async () => {
        if (!authUser?.email)
            return
        let arr = []
        const q = query(dbInstance, where("email", "==", authUser.email));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            arr.push({ ...doc.data(), id: doc.id })
        })
        setTodos(arr)
    }
    return (
        <div className='flex pt-2 h-5/6'>
            <div className='laptop:container mobile:w-full tablet:w-full mx-auto rounded flex flex-col items-center py-6 bg-gradient-to-t h-full bg-orange-100  bg-opacity-60 shadow-[0_3px_10px_rgb(0,0,0,0.2)]'>
                <CreateTodo getTodos={getTodos} authUser={authUser} />
                <div className=' w-11/12 h-full overflow-y-auto'>
                    <div className="w-full h-90 overflow-auto" >
                        <TodoList toDosList={todos} getTodos={getTodos} />
                    </div>
                </div>
            </div>
        </div>

    )
}

export async function getServerSideProps(context) {
    return {
        props: {}
    }
}

export default Todo
