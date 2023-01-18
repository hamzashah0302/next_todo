import React, { useState, useRef, useEffect, } from 'react'
import { options } from '../../utils/options';
import { collection, addDoc } from 'firebase/firestore';
import { database } from '../../firebaselib/firebaseConfig';
const dbInstance = collection(database, 'todo');

const CreateTodo = ({getTodos,authUser}) => {
    const [ToDo, setToDoData] = useState({ name: "", day: "" })
    const handleAddFormChange = (event, isSelect) => {
        if (isSelect) {
            const fieldValue = event.target.value;
            const fieldName = isSelect
            const newFormData = { ...ToDo };
            newFormData['day'] = fieldValue;
            return setToDoData(newFormData);

        }
        event.preventDefault();
        const fieldValue = event.target.value;
        const fieldName = event.target.getAttribute("name");
        const newFormData = { ...ToDo };
        // console.log("state ", newFormData)
        newFormData[fieldName] = fieldValue;
        setToDoData(newFormData);
    };


    // handle add todo
    const handleAddFormSubmit = async (event) => {
        event.preventDefault();
        let data = { ...ToDo,email : authUser?.email }
        if (!data.day || !data.name || !authUser?.email) return
        addDoc(dbInstance, data)
            .then(() => {
                getTodos()
                setToDoData({
                    name: '', day: ''
                })
            })
    };

    return (
        <div className='w-11/12'>
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
            </div>
        </div>
    )
}


export default CreateTodo
