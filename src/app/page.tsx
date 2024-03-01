"use client"
import Button from '@/components/Button'
import React, { useState, useEffect } from "react";
import AddEditTodo from "./AddEditTodo";
import { ReactSortable } from "react-sortablejs";

export default function Home() {
  const [todoList, setTodoList] = useState([])
  const [todoCompletedList, setTodoCompletedList] = useState([])
  const [flag, setFlag] = useState(false)
  const [editData, setEditData] = useState({})

  const handleFetch = async () => {
    const localTodo = localStorage.getItem("todo")
    if (localTodo) {
      const { todoList, todoCompletedList }: any = JSON.parse(localTodo)
      setTodoList(todoList.sort((a: any, b: any) => a.sr_no - b.sr_no))
      setTodoCompletedList(todoCompletedList.sort((a: any, b: any) => a.sr_no - b.sr_no))
      return
    }


    const api_res = await fetch(`https://jsonplaceholder.typicode.com/todos`, { method: "GET" })
    const res_data = await api_res.json()
    console.log("res_data", res_data)
    res_data.map((item: any, ind: number) => {
      item['sr_no'] = ind + 1
    })

    let tList = res_data.filter((io: any) => io.completed === false)
    let tCompList = res_data.filter((io: any) => io.completed === true)


    tList.map((item: any, ind: number) => {
      item['sr_no'] = ind + 1
    })

    tCompList.map((item: any, ind: number) => {
      item['sr_no'] = ind + 1
    })

    tList = tList.sort((a: any, b: any) => a.sr_no - b.sr_no)
    tCompList = tCompList.sort((a: any, b: any) => a.sr_no - b.sr_no)
    setTodoList(tList)
    setTodoCompletedList(tCompList)
    localStorage.setItem("todo", JSON.stringify({ todoList: tList, todoCompletedList: tCompList }))
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

              const localTodo = localStorage.getItem("todo")
              if (localTodo) {
                const { todoList, todoCompletedList }: any = JSON.parse(localTodo)
                localStorage.setItem("todo", JSON.stringify({ todoList: tdata, todoCompletedList: todoCompletedList }))
              }
              setTodoList(tdata)
            }
          }}
        >
          {todoList.map((item: any) => (<>
            <div className="bg-white m-4 p-4 rounded-xl cursor-pointer w-72 h-60" key={item.id}>
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

                      const localTodo = localStorage.getItem("todo")
                      if (localTodo) {
                        const { todoList, todoCompletedList }: any = JSON.parse(localTodo)
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
                      }
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
                      const localTodo = localStorage.getItem("todo")
                      if (localTodo) {
                        const { todoList, todoCompletedList }: any = JSON.parse(localTodo)
                        const data = todoList.filter((io: any) => io.id !== item.id)
                        localStorage.setItem("todo", JSON.stringify({ todoList: data, todoCompletedList: todoCompletedList }))
                        setFlag(!flag)
                      }
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

              const localTodo = localStorage.getItem("todo")
              if (localTodo) {
                const { todoList, todoCompletedList }: any = JSON.parse(localTodo)
                localStorage.setItem("todo", JSON.stringify({ todoList: todoList, todoCompletedList: tdata }))
              }
              setTodoCompletedList(tdata)
            }
          }}
        >
          {todoCompletedList.map((item: any, index) => (<>
            <div className="bg-white m-4 p-4 rounded-xl cursor-pointer w-72 h-60" key={item.id}>

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

                      const localTodo = localStorage.getItem("todo")
                      if (localTodo) {
                        const { todoList, todoCompletedList }: any = JSON.parse(localTodo)
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
                      }
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
                      const localTodo = localStorage.getItem("todo")
                      if (localTodo) {
                        const { todoList, todoCompletedList }: any = JSON.parse(localTodo)
                        const data = todoCompletedList.filter((io: any) => io.id !== item.id)
                        localStorage.setItem("todo", JSON.stringify({ todoList: todoList, todoCompletedList: data }))
                        setFlag(!flag)
                      }
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
        <AddEditTodo
          isOpen={isModalOpen}
          onClose={toggleModal}
          flag={flag}
          setFlag={setFlag}
          editData={editData}
          setEditData={setEditData}
        />
      </>)}
    </>
  );
}
