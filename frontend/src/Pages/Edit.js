import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const Edit = (props) => {
    const [todo, setTodo] = useState({ title: "", description: "" });
    const { showAlert } = props;
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetchTodo();
    }, [])

    // eslint-disable-next-line
    const fetchTodo = async () => {
        let res = await fetch(`http://localhost:8000/api/todos/${id}`);
        let data = await res.json();
        if (data.status === 404) {
            showAlert("No such todo was found!", "error");
            navigate('/');
        }
        setTodo({ title: data.todo.title, description: data.todo.description });
    }

    const handleOnChange = (e) => {
        setTodo(todo => ({ ...todo, [e.target.name]: `${e.target.value}` }));
        console.log(todo)
    }

    const handleUpdate = async (e) => {
        e.preventDefault();
        let res = await fetch(`http://localhost:8000/api/todos/update/${id}`, {
            method: 'post',
            body: JSON.stringify(todo),
            headers: {
                'Content-type': 'application/json'
            }
        })
        let data = await res.json();
        if (data.status === 200) {
            showAlert(data.message, "success");
        }
        else if (data.status === 200) {
            showAlert(data.message, "error");
        }
    }

    return (
        <div className="container my-3">
            <h2>Edit your todo</h2>
            <form>
                <div className="form-group">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" minLength={5} defaultValue={todo.title} onChange={handleOnChange}  required />
                </div>
                <div className="form-group">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea className="form-control" id="description" name="description" rows={3} minLength={5} defaultValue={todo.description} onChange={handleOnChange} required />
                </div>
                <button type="submit" className="btn btn-sm btn-danger" onClick={handleUpdate}>Update Todo</button>
            </form>
        </div>
    )
}

export default Edit