import React, { useEffect, useState } from 'react'
import Header from './partials/Header'
import Todo from './partials/Todo'
import TodoModal from './partials/TodoModal'
import { getToken, todoList } from './services/api'
import { useNavigate } from 'react-router-dom'

const HomePage = () => {

  const navigation = useNavigate()

  const [list,setList]=useState([])
  const [refreshlist,setRefreshlist]= useState()
  useEffect(()=>{
    if(!getToken()){
      navigation('/login')
    }
    fetchTodoList()
  },[refreshlist])
async function fetchTodoList(){
  const result = await todoList()
  // console.log(result);
  if(result.status===200 && result.data.status===200){
    setList(result.data.data.todos.reverse())
  }
} 
  return (
    <div>
      <Header />
      <div className="container">
        <div className=" row justify-content-md-center mt-4">
          {
            list.map((todo) => <Todo todo={todo} key={todo._id}/>)
          }
        </div>
      </div>
     
    <div style={{position:'fixed',right:50,bottom:50,zIndex:100}}>
      <button type='button'  data-bs-toggle="modal" data-bs-target="#exampleModal" className='btn btn-primary'>Add</button>
    </div>

    <TodoModal setRefreshlist={setRefreshlist} />

    </div>
  )
}

export default HomePage
