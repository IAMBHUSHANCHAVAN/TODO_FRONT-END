import React, { useState } from 'react'
import "./css/common.css"
import { register } from './services/api'
import { ToastContainer, toast } from 'react-toastify'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from './partials/Header'
const Register = () => {

  const [form, setForm] = useState({
    name: "",
    username: "",
    password: "",
    email: ""
  })

  const [error, setError] = useState(null)
  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }
  useEffect(() => {
    const user = localStorage.getItem('user')
    if (user) {
      return navigation('/')
    }
  })
  const navigation = useNavigate()
  const handleSubmit = async () => {
    // console.log(form);
    const result = await register(form);
    // console.log(result);

    if (result.status === 200) {
      if (result.data.status === 201) {
        setError(result.data.data)
        toast(result.data.message)
        return
      }
      if (result.data.status === 203) {
        setError(result.data.data)
        toast(result.data.message)
        return
      }
      if (result.data.status === 200) {
        localStorage.setItem('user', JSON.stringify(result.data.data))
        navigation('/')
        return
      }
    }
    else {
      toast("something went wrong , please try again")
    }
  }

  return (
    <> <Header />
      <div className='mt-5 border border-primary container'>

        <ToastContainer />
        <div className="container mt-4 text-center">
          <button type="button" className="btn btn-lg btn-outline-secondary mt-5">Register An Account</button>
          <div className='mt-5'>
            <form className=''>
              <div className="form-group row ">
                <div className="form-group mt-3">
                  <label for="exampleinputuser" className="form-label mt-4">Name</label>
                  <input type="text" name='name' onChange={handleInput} className="form-control mt-3" id="" placeholder="Enter Name" />
                  {
                    error?.name && <small id="emailHelp" className="form-text text-danger">{error.name.msg}</small>
                  }
                </div>
                <div className="form-group mt-3">
                  <label for="exampleinputuser" className="form-label mt-4">UserName</label>
                  <input type="text" name='username' onChange={handleInput} className="form-control mt-3" id="" placeholder="Enter UserName" />
                  {
                    error?.username && <small id="emailHelp" className="form-text text-danger">{error.username.msg}</small>
                  }
                </div>
              </div>
              <div className="form-group mt-3">
                <label for="exampleInputEmail1" className="form-label mt-4">Email address</label>
                <input type="email" name='email' onChange={handleInput} className="form-control " id="exampleInputEmail1 mt-3" aria-describedby="emailHelp" placeholder="Enter email" />
                {
                  error?.email && <small id="emailHelp" className="form-text text-danger">{error.email.msg}</small>
                }
              </div>
              <div className="form-group mt-3">
                <label for="exampleInputPassword1" className="form-label mt-4">Password</label>
                <input type="password" name='password' onChange={handleInput} className="form-control  mt-3" id="exampleInputPassword1" placeholder="Password" />
                {
                  error?.password && <small id="emailHelp" className="form-text text-danger">{error.password.msg}</small>
                }
              </div>
              <button class="btn btn-lg btn-primary mt-5" onClick={handleSubmit} type="button">Submit</button>
            </form>
          </div>
        </div>

      </div>
    </>
  )
}

export default Register
