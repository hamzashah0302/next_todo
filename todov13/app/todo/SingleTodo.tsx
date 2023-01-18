'use client';
import React, { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation';
import { useSelector , useDispatch } from 'react-redux';
import { userAction } from '../../store/store';
import {options ,baseUri} from '../../utils'
import { fetchTodos } from '../../store/store';
const intialState = { id: '', name: '', day: '' }

const SingleTodo = ({ contact }: any) => {
    let { name, day } = contact
    const [editContent, setEditContact] = useState(intialState)
    const router = useRouter()
    const user_data = useSelector((state:any) => state.userReducer.userData)
    const dispatch = useDispatch()

    // delete row
    const deleteTodo = async (event: any, id: number) => {
        event.preventDefault();
        // const newContacts = [...toDosList];
        let res = await axios.delete(baseUri+'usertodo/' + id)
        // @ts-ignore.
            dispatch(fetchTodos(user_data))
    }

    // set edit row
    const setSelectedEditRow = (event: React.FormEvent, row: any,) => {
        event.preventDefault();
        setEditContact(row);
        // setEditRowIndex(index)
    }

    // handle edit row change 
    const handleEditFormChange =async (event : any) => {
        event.preventDefault();
        setEditContact({ ...editContent, [event.target.name]: event.target.value })
    }

    // submit edit Form 
    const handleSubmit =async(event: React.FormEvent)=>{
        const {id , name , day} = editContent;
        event.preventDefault()
        let res = await axios.put(baseUri+'usertodo/' + id,{ name , day})
        // router.refresh()
        setEditContact(intialState)
        // @ts-ignore.
        dispatch(fetchTodos(user_data))
    }

    if (editContent.id)
        return (
            <div className='flex justify-between '>
                <input
                    className='border text-grey-darkest rounded-lg p-1 w-[30%]'
                    type="text"
                    required
                    name="name"
                    value={editContent.name}
                    onChange={handleEditFormChange}
                ></input>
                <select name="day" value={editContent.day ? editContent.day : ''} onChange={handleEditFormChange} required className='border text-grey-darkest rounded-lg p-1 w-[30%]'>
                    <option value="" disabled>
                        Select a Day...
                    </option>
                    {options.map(item => (
                        <option value={item.value} key={item.label}>
                            {item.label}
                        </option>
                    ))}
                </select>
                <button type='button' onClick={handleSubmit} className='font-mono text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-2 py-1.5 text-center dark:bg-blue-200 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>Save</button>
            </div>
        )


    return (
        <div className='flex justify-between'>
            <label className='flex-1 capitalize'>{contact.name}</label>
            <label className='font-mono flex-1 capitalize'>{contact.day}</label>
            <div className='flex gap-0.5'>
                <button type="button" onClick={(event) => { setSelectedEditRow(event, contact) }} className='font-mono text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-2 py-1.5 text-center dark:bg-blue-200 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>Edit</button>
                <button aria-label="Edit" type="button" onClick={(event) => { deleteTodo(event, contact.id) }} className='font-mono text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-2 py-1.5 text-center dark:bg-blue-200 dark:hover:bg-blue-700 dark:focus:ring-blue-800 '>Delete</button>
            </div>
        </div>

    )
}

export default SingleTodo