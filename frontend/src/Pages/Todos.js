import React, { useState, useEffect } from 'react'
import TodoItem from '../components/TodoItem';
import AddTodo from '../components/AddTodo';

const Todos = (props) => {
    const [todos, setTodos] = useState([]);
    const { showAlert } = props;

    useEffect(() => {
        fetchTodos();
    }, [])

    // eslint-disable-next-line
    const fetchTodos = async () => {
        let res = await fetch('http://localhost:8000/api/todos');
        let data = await res.json();
        setTodos(data.todos);
    }

    return (
        <>
            <AddTodo fetchTodos={fetchTodos} showAlert={showAlert}/>
            <div className="container my-3">
                <h2>Your todos</h2>
                {todos.length === 0 ? <p>No todos to display! Please add your first todo.</p> : <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>S.No</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Timestamp</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {todos.map((todo, index) => {
                            return <TodoItem key={todo._id} todoId={todo._id} title={todo.title} description={todo.description} timestamp={todo.timestamp} indexSno={index + 1} fetchTodos={fetchTodos} showAlert={showAlert} />
                        })}
                    </tbody>
                </table>}
            </div>
        </>
    )
}

export default Todos