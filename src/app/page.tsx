"use client"
import Button from '@/components/Button'
import React, { useState, useEffect } from "react";
import AddEditTodo from "./AddEditTodo";
import { ReactSortable } from "react-sortablejs";
import Modal from '@/components/Modal';

export default function Home() {
  const [todoList, setTodoList] = useState([])
  const [todoCompletedList, setTodoCompletedList] = useState([])
  const [flag, setFlag] = useState(false)
  const [editData, setEditData] = useState({})
  const [userData, setUserData] = useState({ email: "" })

  useEffect(() => {

    let userData: any = localStorage.getItem("userData")
    if (userData) {
      setUserData(JSON.parse(userData))
    }
  }, [])


  const handleFetch = async () => {
    const localTodo = localStorage.getItem("todo")
    if (localTodo) {
      const { todoList, todoCompletedList }: any = JSON.parse(localTodo)

      setTodoList(todoList.sort((a: any, b: any) => a.sr_no - b.sr_no))
      setTodoCompletedList(todoCompletedList.sort((a: any, b: any) => a.sr_no - b.sr_no))
      return
    }
  }

  useEffect(() => {
    handleFetch()
  }, [flag])

  function truncateString(str: string, num: number) {
    if (str.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
  }
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => setIsModalOpen(!isModalOpen);
  console.log("todoList", todoList)
  return (
    <>
      <div className='flex justify-end'>
        <Button
          buttontype="primary"
          title="Add Todo"
          onClick={toggleModal}
          className="text-sm mr-2"
        />
      </div>
      <div style={{ height: "50vh" }} className='bg-[var(--primary4)] rounded-xl border-2 overflow-auto my-3 mb-8' >
        <ReactSortable
          className="flex justify-start flex-wrap"
          animation={200}
          delay={2}

          list={todoList}
          setList={e => {
            if (e && Array.isArray(e) && e.length > 0) {

              let tdata = e

              tdata.map((item: any, ind: number) => {
                item['sr_no'] = ind + 1
              })

              tdata = tdata.sort((a: any, b: any) => a.sr_no - b.sr_no)
              localStorage.setItem("todo", JSON.stringify({ todoList: tdata, todoCompletedList: todoCompletedList }))
              setFlag(!flag)
            }
          }}
        >
          {todoList.map((item: any) => (<>
            <div
              className={`bg-white m-4 p-4 rounded-xl cursor-pointer w-72 h-60 ${item.userId === userData?.email ? "" : "hidden"}`}
              key={item.id}
            >
              <div className="py-5 h-36">
                {truncateString(item.title, 100)}
              </div>
              <div className='flex justify-between'>
                <div className='flex'>
                  <input
                    type="checkbox"
                    id={item.id}
                    className='w-4'
                    onChange={e => {
                      const obj = {
                        ...item,
                        completed: true
                      }

                      let getTodo = todoList.filter((io: any) => io.id !== obj.id)
                      getTodo.map((item: any, ind: number) => {
                        item['sr_no'] = ind + 1
                      })
                      getTodo = getTodo.sort((a: any, b: any) => a.sr_no - b.sr_no)

                      let tData = [...todoCompletedList, obj]
                      tData.map((item: any, ind: number) => {
                        item['sr_no'] = ind + 1
                      })
                      tData = tData.sort((a: any, b: any) => a.sr_no - b.sr_no)

                      localStorage.setItem("todo", JSON.stringify({ todoList: getTodo, todoCompletedList: tData }))
                      setFlag(!flag)
                    }}
                    checked={item.completed}
                  />
                </div>
                <div className="flex justify-end">
                  <Button
                    buttontype="primary"
                    title="Edit"
                    onClick={() => {
                      toggleModal()
                      setEditData(item)
                    }}
                    className="text-sm mr-2"
                  />
                  <Button
                    buttontype="secondary"
                    title="Delete"
                    onClick={() => {
                      const data = todoList.filter((io: any) => io.id !== item.id)
                      localStorage.setItem("todo", JSON.stringify({ todoList: data, todoCompletedList: todoCompletedList }))
                      setFlag(!flag)
                    }}
                    className="text-sm"
                  />
                </div>
              </div>
            </div>
          </>
          ))}
        </ReactSortable>
      </div>

      <div className='text-xl mt-1'>
        Completed
      </div>

      <div style={{ height: "50vh" }} className='bg-[var(--primary4)] rounded-xl border-2 overflow-auto my-3' >
        <ReactSortable
          className="flex justify-start flex-wrap"
          animation={200}
          delay={2}
          list={todoCompletedList}
          setList={e => {
            if (e && Array.isArray(e) && e.length > 0) {

              let tdata = e

              tdata.map((item: any, ind: number) => {
                item['sr_no'] = ind + 1
              })

              tdata = tdata.sort((a: any, b: any) => a.sr_no - b.sr_no)
              localStorage.setItem("todo", JSON.stringify({ todoList: todoList, todoCompletedList: tdata }))
              setFlag(!flag)
            }
          }}
        >
          {todoCompletedList.map((item: any, index) => (<>
            <div
              className={`bg-white m-4 p-4 rounded-xl cursor-pointer w-72 h-60 ${item.userId === userData?.email ? "" : "hidden"}`}
              key={item.id}>

              <div className="py-5 h-36">
                {truncateString(item.title, 100)}
              </div>
              <div className='flex justify-between'>
                <div className='flex'>
                  <input
                    type="checkbox"
                    id={item.id}
                    className='w-4'
                    onChange={e => {
                      const obj = {
                        ...item,
                        completed: false
                      }

                      let getTodo = todoCompletedList.filter((io: any) => io.id !== obj.id)
                      getTodo.map((item: any, ind: number) => {
                        item['sr_no'] = ind + 1
                      })
                      getTodo = getTodo.sort((a: any, b: any) => a.sr_no - b.sr_no)

                      let tData = [...todoList, obj]
                      tData.map((item: any, ind: number) => {
                        item['sr_no'] = ind + 1
                      })
                      tData = tData.sort((a: any, b: any) => a.sr_no - b.sr_no)

                      localStorage.setItem("todo", JSON.stringify({ todoList: tData, todoCompletedList: getTodo }))

                      setFlag(!flag)
                    }}
                    checked={item.completed}
                  />
                </div>
                <div className="flex justify-end">
                  <Button
                    buttontype="primary"
                    title="Edit"
                    onClick={() => {
                      toggleModal()
                      setEditData(item)
                    }}
                    className="text-sm mr-2"
                  />
                  <Button
                    buttontype="secondary"
                    title="Delete"
                    onClick={() => {
                      const data = todoCompletedList.filter((io: any) => io.id !== item.id)
                      localStorage.setItem("todo", JSON.stringify({ todoList: todoList, todoCompletedList: data }))
                      setFlag(!flag)
                    }}
                    className="text-sm"
                  />
                </div>
              </div>
            </div>
          </>
          ))}
        </ReactSortable>
      </div>
      {isModalOpen && (<>
        <Modal
          isOpen={isModalOpen}
          onClose={toggleModal}
          Component={<AddEditTodo
            onClose={toggleModal}
            flag={flag}
            setFlag={setFlag}
            editData={editData}
            setEditData={setEditData}

          />}
        />

      </>)}
    </>
  );
}
