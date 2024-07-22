"use client"
import React, { useEffect, useState } from 'react';
import Button from '@/components/Button';
import Input from '@/components/input';
import { createId } from '@paralleldrive/cuid2';

const AddEditTodo = (props: any) => {
    const { onClose, flag, setFlag, editData, setEditData } = props
    const { id } = editData
    const [title, setTitle] = useState(editData.title ? editData.title : "")
    let userData: any = localStorage.getItem("userData")

    return (<>

        <h2 className="text-lg font-semibold">
            {id ? "Edit" : "Add"} Todo
        </h2>
        <div className='mt-2 w-80'>
            <Input
                type="text"
                label="Title"
                required={true}
                onChange={(e: any) => {
                    setTitle(e.target.value)
                }}
                value={title}
                placeholder="Enter Title"
            />
        </div>



        <div className="flex justify-end mt-3">
            <Button
                buttontype="primary"
                title={id ? "Edit" : "Add"}
                onClick={() => {
                    const localTodo = localStorage.getItem("todo")
                    if (localTodo) {
                        const { todoList, todoCompletedList }: any = JSON.parse(localTodo)
                        if (userData) {
                            userData = JSON.parse(userData)
                        }
                        if (id) {
                            const obj = {
                                ...editData,
                                title: title,
                                userId: userData.email
                            }
                            if (obj.completed === false) {
                                const getTodo = todoList.filter((io: any) => io.id !== obj.id)
                                localStorage.setItem("todo", JSON.stringify({ todoList: [...getTodo, obj], todoCompletedList: todoCompletedList }))
                            } else {
                                const getTodo = todoCompletedList.filter((io: any) => io.id !== obj.id)
                                localStorage.setItem("todo", JSON.stringify({ todoList: todoList, todoCompletedList: [...getTodo, obj] }))
                            }
                        } else {
                            const obj = {
                                completed: false,
                                id: createId(),
                                sr_no: todoList.length + 1,
                                title: title,
                                userId: userData.email
                            }
                            localStorage.setItem("todo", JSON.stringify({ todoList: [...todoList, obj], todoCompletedList: todoCompletedList }))
                        }
                        setFlag(!flag)
                        setEditData({})
                        onClose()
                    } else {
                        const obj = {
                            completed: false,
                            id: createId(),
                            sr_no: 1,
                            title: title,
                            userId: userData.email
                        }
                        localStorage.setItem("todo", JSON.stringify({ todoList: [obj], todoCompletedList: [] }))
                    }
                }}
                className="text-sm mr-2"
            />
            <Button
                buttontype="secondary"
                title="Close"
                onClick={() => {
                    setEditData({})
                    onClose()
                }}
                className="text-sm "
            />
        </div>

    </>);
};

export default AddEditTodo;
