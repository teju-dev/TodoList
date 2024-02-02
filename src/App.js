import React ,{useState,useRef,useEffect}from 'react'
import TOdoList from './TodoList'
import  {v4 as uuidv4}  from 'uuid'

const LOCAL_STORAGE_KEY = 'todoApp.todos'
function App() {
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()
  
  useEffect(()=>{
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if(storedTodos)setTodos(storedTodos)
  },[])
  useEffect(()=>{
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  },[todos])

  const toggleTodo =(id) =>{
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }
  const handelAddTodo =(e) =>{

    const name = todoNameRef.current.value
    if (name === '') return
    setTodos(prevTodos => {
      return [...prevTodos, { id: uuidv4(), name: name, complete: false}]
    })
    todoNameRef.current.value = null
  }
  const handelClearTodo =() =>{
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }

  return (
    <>
    <TOdoList todos={todos} toggleTodo ={toggleTodo}/>
    <input ref= {todoNameRef} type = 'text'/>
    <button onClick={handelAddTodo}>Add To List</button>
    <button onClick = {handelClearTodo}>Clear List</button>
    <div>{todos.filter(todo => !todo.complete).length} left To do</div>
    </>
  ) ;
}

export default App;
