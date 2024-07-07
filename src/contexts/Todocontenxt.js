import { useContext,createContext } from "react";



export const Todocontext = createContext({
   todos: [
        {
            id:1,
            todo:"Todo msg",
            completed:false
        }
    ],

    addTodo:(todo)=>{},
    removeTodo:(id)=>{},
    updateTodo:(id,message)=>{},
    isComplete:(id)=>{}

})


export const  useTodo = ()=>{
    
    return useContext(Todocontext)
}

export const TodoProvider = Todocontext.Provider