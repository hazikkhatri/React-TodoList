import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])

  const handleAdd = () => {
    const newTodos = [...todos, { id: uuidv4(), todo, isCompleted: false }];
    setTodos(newTodos)
    setTodo("")
    saveToLS(newTodos)
  }

  const handleEdit = (e, id) => {
    let t = todos.filter(item => item.id === id)
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
      <div className="container mx-auto bg-violet-200 mt-4 rounded-md p-3 min-h-[80vh]">
        <div className="AddTodo">
          <h2 className='text-xl font-medium'>Add a Todo</h2>
          <input onChange={handleChange} value={todo} type="text" className='w-80 px-2 py-1 my-3 text-lg focus:outline-none' />
          <button onClick={handleAdd} className='bg-violet-500 text-white px-2 py-1 rounded ml-2'>Save</button>
        </div>
        <h2 className='text-xl mb-3 font-medium'>Your Todos</h2>
        <div className="todos">
          {todos.length === 0 && <div className='font-medium text-xl mt-4'>No todos to display</div>}
          {todos.map(item => {
            return (
              <div key={item.id} className="todo text-black flex w-1/4 mb-2 justify-between p-1 items-center bg-violet-200">
                <div className='flex items-center gap-3'>
                  <input onChange={handleCheckBox} type="checkbox" checked={item.isCompleted} name={item.id} />
                  <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
                </div>
                <div className="buttons flex">
                  <button onClick={(e) => { handleEdit(e, item.id) }} className='bg-violet-500 text-white px-2 py-1 rounded ml-2'>Edit</button>
                  <button onClick={(e) => { handleDelete(e, item.id) }} className='bg-violet-500 text-white px-2 py-1 rounded ml-2'>Delete</button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default App
