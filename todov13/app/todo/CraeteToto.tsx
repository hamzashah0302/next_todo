'use client';
import React, { useState, useRef, useEffect, } from 'react'
// import { ToDosList } from './ToDosList'
// import { Sidebar } from '../Sidebar';
import axios from 'axios'
import { fetchTodos } from '../../store/store';
import { baseUri, options } from '../../utils';
import { useDispatch, useSelector } from 'react-redux';

const CreateTodo = () => {
    const [ToDo, setToDoData] = useState({ name: "", day: "" })
    const [toDosList, setAddToDosList] = useState([])
    const [filteredList, setFilteredList] = useState([])
    const [sortByDay, setSortByDay] = useState('')
    const dispatch = useDispatch()
    const user_data = useSelector((state:any) => state.userReducer.userData)

    const handleAddFormChange = (event: any, isSelect: any) => {
        // console.log("check selct ", event.target.value , isSelect)
        if (isSelect) {
            // console.log("check select ", event)
            const fieldValue = event.target.value;
            const fieldName = isSelect
            const newFormData: any = { ...ToDo };
            newFormData['day'] = fieldValue;
            return setToDoData(newFormData);

        }
        event.preventDefault();
        const fieldValue = event.target.value;
        const fieldName = event.target.getAttribute("name");
        const newFormData: any = { ...ToDo };
        // console.log("state ", newFormData)
        newFormData[fieldName] = fieldValue;
        setToDoData(newFormData);
    };


    // handle add todo
    const handleAddFormSubmit = async (event: any) => {
        event.preventDefault();
        
        let data : any = { ...ToDo }
        if (!data.day || !data.name) return
        data.email = user_data?.email
        try {
            let res = await axios.post(baseUri+'todo', data)
            if (res.data.id) {
                setToDoData({
                    ...ToDo, name: '', day: ''
                })
                // @ts-ignore.
                dispatch(fetchTodos(user_data))
            }
        } catch (error) {
            console.error(error)
        }
        // router.refresh()
    };


    // handle edit submit
    // const handleEditFormSubmit = async (event, currentIndex, changedValue) => {
    //     let { name, day, id } = changedValue
    //     event.preventDefault();
    //     let res = await axios.post('/edit/todo', { name, day, id })
    //     if (res.data.error)
    //         return toast.error(res.data.error)
    //     toast.success('Updated!')
    //     getUserTodos()
    // };


    // delete row
    // const deleteTodo = async (event, id) => {
    //     event.preventDefault();
    //     const newContacts = [...toDosList];
    //     let res = await axios.post('/delete/tode', { id }, httpHeader())
    //     if (res.data.status) {
    //         getUserTodos()
    //         toast.success('Deleted!')
    //     }
    //     else {
    //         toast.error("Someting went wrong!")
    //     }

    // }


    const daySelected = (day: any) => {
        let { value } = day
        setSortByDay(value)
        // console.log("day ", value)
    }


    const resetFilter = () => {
        setSortByDay('')
    }


    useEffect(() => {
        let list = [...toDosList]
        let filterlist = list.filter((ele: any) => ele.day == sortByDay)
        setFilteredList(filterlist)
    }, [sortByDay])

    return (
        <div className='w-11/12'>
            {/* <Header /> */}
                {/* <Sidebar daySelected={daySelected} sortByDay={sortByDay} resetFilter={resetFilter} /> */}
                    <div className='mobile:min-w-[100%] laptop:min-w-[60%] shadow-md rounded px-6 pt-6 pb-8 mb-4 bg-opacity-40 border-gray-200 bg-green-50' >
                        <h2 className='font-mono font-bold mb-2'>Add a Todo</h2>
                        <form onSubmit={handleAddFormSubmit} className='flex items-center flex-col w-full gap-1.5'>
                            <div className='flex w-full justify-between gap-1'>
                                <input
                                    className='border text-grey-darkest flex-1 rounded 
                                    border-slate-300 focus:outline-none focus:border-blue-500 focus:ring-blue-500 w-1/2 focus:ring-1 px-5 py-2'
                                    type="text"
                                    name="name"
                                    value={ToDo.name}
                                    required
                                    placeholder="Enter a Todo name"
                                    onChange={(e) => handleAddFormChange(e, null)}
                                />
                                <div className='w-1/2'>
                                    <select name="day" value={ToDo.day ? ToDo.day : ''} onChange={(e) => { handleAddFormChange(e, 'day') }} required className='border text-grey-darkest rounded h-full
                                    border-slate-300 focus:outline-none focus:border-blue-500 focus:ring-blue-500 w-full focus:ring-1 px-5 py-2'>
                                        <option value="" disabled>
                                            Select a Day...
                                        </option>
                                        {options.map(item => (
                                            <option value={item.value} key={item.label}>
                                                {item.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                            </div>

                            <button type="submit" className='text-white bg-blue-500 my-1 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-23 px-5 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-full transition ease-in-out delay-150 hover:scale-y-105'>Add</button>
                        </form>
                    {/* <ToDosList toDosList={sortByDay ? filteredList : toDosList} handleEditFormSubmit={handleEditFormSubmit} deleteTodo={deleteTodo} sortByDay={sortByDay} /> */}
                </div>
        </div>
    )
}


export default CreateTodo
