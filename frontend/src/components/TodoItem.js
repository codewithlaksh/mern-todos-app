import React from 'react'
import { Link } from 'react-router-dom'

const TodoItem = (props) => {
    const { indexSno, todoId, title, description, timestamp, fetchTodos, showAlert } = props;

    const handleDelete = async (e) => {
        e.preventDefault();
        if (window.confirm('Are you sure, you want to delete this todo ?')) {
            let res = await fetch(`http://localhost:8000/api/todos/delete/${e.target.id}`, {
                method: 'post'
            })
            let data = await res.json();
            if (data.status === 200) {
                showAlert(data.message, "success");
                fetchTodos();
            }
            else if (data.status === 200) {
                showAlert(data.message, "error");
            }
        }
    }

    return (
        <tr>
            <td>{indexSno}</td>
            <td>{title}</td>
            <td>{description}</td>
            <td>{new Date(timestamp).toLocaleString()}</td>
            <td>
                <Link className="btn btn-sm btn-success" to={"/edit/" + todoId}>Edit</Link>
                <button className="btn btn-sm btn-danger ml-2" id={todoId} onClick={handleDelete}>Delete</button>
            </td>
        </tr>
    )
}

export default TodoItem