import React, { useState } from 'react'
import { ToastContainer, toast } from "react-toastify"
import { createTodo } from '../services/api'
const TodoModal = ({setRefreshlist}) => {

    const [todo , setTodo]=useState()

    const handleSubmit = async ()=>{
        console.log(todo,'todo desc');
        if(todo===''){
        toast("todo is required")
        return
        }
        const result = await  createTodo({desc:todo})
        // console.log(result);
        if(result.status===200 && result.data.status===200){
            toast("todo added sucessfully")
            setRefreshlist(new Date())
        }
        else{
            toast(result.data.message)
        }
    }
  return (
      <div className="modal" id='exampleModal'>
        <ToastContainer/>
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title">Add New Todo</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
          <span aria-hidden="true"></span>
        </button>
      </div>
      <div className="modal-body">
        <textarea name="" className='form-control' id="" onChange={(e)=>{setTodo(e.target.value)}} placeholder='Write Todos ....' rows={3}></textarea>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-primary" onClick={handleSubmit} >Save changes</button>
        <button type="button" className="btn btn-secondary" onClick={()=>setTodo('')} data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
  )
}

export default TodoModal
