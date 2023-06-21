import axios from 'axios'
import { CREATE_TODO, LOGIN, REGISTER, TODO_LIST } from './apiConstraints'

export const Login = async (data)=>{   // data from the form
    return axios.post(LOGIN,data) // login - url from login
}
export const register = async (data)=>{   // data from the form
    return axios.post(REGISTER,data) // login - url from login
}
export const createTodo = async (data)=>{   // data from the form
    let token = getToken()
    console.log(token);
    return axios.post(CREATE_TODO,data,{
        headers:{
            auth : token
        }
    }) // login - url from login
}
export const todoList = async (data)=>{   // data from the form
    let token = getToken()
    console.log(token);
    return axios.get(TODO_LIST,{
        headers:{
            auth : token
        }
    }) // login - url from login
}

export function getToken() {
    let user = localStorage.getItem('user');
    if(!user) return
    const userObj = JSON.parse(user)
    return userObj.token;
    
}