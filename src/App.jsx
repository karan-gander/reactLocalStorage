import { useEffect, useState } from 'react'
import { TodoProvider } from './contexts'
import './App.css'
import TodoForm from './components/Todofrom'
import TodoItem from './components/Todoitem'

function App() {
  const [count, setCount] = useState(0)
  const [todos,setTodos] = useState([])

  const addTodo = (todo)=>{

    setTodos((preTodo)=>{
      return [...preTodo,{id:Date.now(),...todo}]
    })
  }

  const updateTodo = (id,todo)=>{

    setTodos((pre)=>pre.map((preTodo)=>(preTodo.id ===id?todo:preTodo)))

  }


  const removeTodo = (id)=>{

    setTodos((pre)=>pre.filter((preTodo)=>(preTodo.id!==id)))
  }

  const isComplete = (id)=>{

    setTodos((pre)=>pre.map((preTodo)=>(preTodo.id===id?{...preTodo,completed:!preTodo.completed}:preTodo)))
  }


  useEffect(()=>{

    const todos = JSON.parse(localStorage.getItem("todos"))

    if(todos&&todos.length){
      setTodos(todos)
    }

  },[])


  useEffect(() => {
  
    localStorage.setItem("todos",JSON.stringify(todos))
    
  }, [todos])
  

  return (
    <>
    <TodoProvider value={{todos,addTodo,removeTodo,updateTodo,isComplete}}>
    <div className="bg-[#172842] min-h-screen py-8">
                <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
                    <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
                    <div className="mb-4">
                        <TodoForm/>
                    </div>
                    <div className="flex flex-wrap gap-y-3">
                        {
                          todos.map((todo)=>(
                            <div className='w-full' key={todo.id}>
                              <TodoItem todo={todo} />
                            </div>
                          ))
                        }
                    </div>
                </div>
            </div>
    </TodoProvider>
    </>
  )
}

export default App
