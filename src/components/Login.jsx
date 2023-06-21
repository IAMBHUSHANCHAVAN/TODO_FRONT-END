import React, { useEffect, useState } from 'react'
import './css/common.css'
import { Login } from './services/api'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify"
import Header from './partials/Header'
const Loginall = (user, setUser) => {
  const [form, setForm] = useState({
    username: "",
    password: "",
  })
  useEffect(() => {
    const user = localStorage.getItem('user')
    if (user) {
      return navigation('/')
    }
  })
  const navigation = useNavigate()
  const [error, setError] = useState(null)

  const handlehange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }
  const handleSubmit = async () => {
    // console.log(form);
    const result = await Login(form)
    // console.log(result);
    setError(null)  // everey time we submit set error as null

    //handling errors
    if (result.status === 200) {
      if (result.data.status === 200) {
        localStorage.setItem('user', JSON.stringify(result.data.data))
        navigation("/")
        return;
      }
      if (result.data.status === 201) {
        setError(result.data.data)
        return
      }
      if (result.data.status === 202) {
        toast(result.data.message)
        return
      }
    }

  }

  return (
    <>
      <Header />
      <div className='logincss border border-dark container'>

        <ToastContainer />
        <h1 className='text-center'>Login Here</h1>
        
        <form className='container  p-5 mt-5'>
          <div className="form-group">
            <label for="exampleInputEmail1" className="form-label mt-4">Email address</label>
            <input type="email" onChange={handlehange} name="username" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
            {
              error?.username && <small id="emailHelp" className="form-text text-muted">{error.username.msg}</small>
            }
            {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
          </div>
          <div className="form-group">
            <label for="exampleInputPassword1" className="form-label mt-4">Password</label>
            <input type="password" className="form-control" name='password' onChange={handlehange} id="exampleInputPassword1" placeholder="Password" />
            {
              error?.password && <small id="emailHelp" className="form-text text-muted">{error.password.msg}</small>
            }
          </div>
          <button type="submit" onClick={handleSubmit} className="btn btn-primary mt-5">Submit</button>
        </form>
      </div>
    </>
  )
}

export default Loginall
