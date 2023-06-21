import React from 'react'
import moment from 'moment'
const Todo = (todo) => {

    console.log(todo.todo);
    return (

        <div className="col-sm-3 mx-3 my-2 alert bg-light">
            <div className="card-header">
                {todo.todo.isCompleted ? 'completed':'not completed'}
            </div>
            <div className="card-body">
                <h4 className="card-title">{todo.todo.desc}</h4>
                <p className="card-text">{moment(todo.todo.date).fromNow()}</p>
            </div>
        </div>

    )
}

export default Todo
