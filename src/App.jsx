import { useState, useEffect } from 'react';
import { MdEditSquare } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { IoSaveSharp } from "react-icons/io5";
import { v4 as uuidv4 } from 'uuid';
import Navbar from './components/Navbar';

function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)

  const handleAdd = () => {
    const newTodos = [...todos, { id: uuidv4(), todo, isCompleted: false }];
    setTodos(newTodos)
    setTodo("")
    saveToLS(newTodos)
  }

  const toggleFinished = (params) => {
    setshowFinished(!showFinished)
  }


  const handleEdit = (e, id) => {
    let t = todos.find(item => item.id === id)
    setTodo(t.todo)
    let newTodos = todos.filter(item => item.id !== id)
    setTodos(newTodos)
    saveToLS(newTodos)
  }

  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => item.id !== id)
    setTodos(newTodos)
    saveToLS(newTodos)
  }

  const saveToLS = (updatedTodos) => {
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleCheckBox = (e) => {
    let id = e.target.name
    let index = todos.findIndex(item => item.id === id)
    let newTodos = [...todos]
    newTodos[index].isCompleted = !newTodos[index].isCompleted
    setTodos(newTodos)
    saveToLS(newTodos)
  }

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {
      let todos = JSON.parse(todoString)
      setTodos(todos)
    }
  }, [])

  return (
    <>
      <Navbar />
      <div className="container mx-auto w-[320px] bg-violet-200 mt-4 rounded-md p-3 min-h-[80vh] md:w-4/5 sm:w-max">
        <div className="AddTodo">
          <h2 className='text-2xl select-none font-medium'>Add a Todo</h2>
          <div className='flex items-center'>
            <input onChange={handleChange} value={todo} type="text" className='w-80 px-2 py-1 my-3 text-lg focus:outline-none' />
            <button onClick={handleAdd} disabled={todo.length <= 3} className='bg-violet-500 text-white p-2 disabled:bg-violet-400 text-lg select-none disabled:cursor-not-allowed rounded ml-2'><IoSaveSharp /></button>
          </div>
        </div>
        <h2 className='text-xl select-none mb-3 font-medium'>Your Todos:</h2>
        <input onChange={toggleFinished} type="checkbox" className='font-fold ml-1' checked={showFinished} /><span className='text-base ml-3 select-none'>Show Finished Tasks</span>
        <div className="todos mt-2">
          {todos.length === 0 && <div className='font-medium text-xl select-none mt-4'>No todos to display</div>}
          {todos.map(item => {
            return (showFinished || !item.isCompleted) && <div key={item.id} className="todo text-black flex w-full md:w-3/6 mb-2 justify-between p-1 items-center bg-violet-200">
              <div className='flex items-center gap-3'>
                <input onChange={handleCheckBox} type="checkbox" checked={item.isCompleted} name={item.id} />
                <div className={`${item.isCompleted ? "line-through" : ""} text-base`} >{item.todo}</div>
              </div>
              <div className="buttons flex">
                <button onClick={(e) => { handleEdit(e, item.id) }} className='bg-violet-500 text-lg text-white px-2 py-1 rounded ml-2'><MdEditSquare /></button>
                <button onClick={(e) => { handleDelete(e, item.id) }} className='bg-violet-500 text-white px-2 py-1 text-lg rounded ml-2'><MdDelete /></button>
              </div>
            </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App
  