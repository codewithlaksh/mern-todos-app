import React, { useState } from 'react'

const AddTodo = (props) => {
    const [todo, setTodo] = useState({ title: "", description: "" });
    const { fetchTodos, showAlert } = props;

    const handleOnChange = (e) => {
        setTodo(todo => ({ ...todo, [e.target.name]: `${e.target.value}` }));
        console.log(todo)
    }

    const handleInsert = async (e) => {
        e.preventDefault();
        let res = await fetch(`http://localhost:8000/api/todos/add`, {
            method: 'post',
            body: JSON.stringify(todo),
            headers: {
                'Content-type': 'application/json'
            }
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
    return (
        <div className="container my-3">
            <h2>Add your todo</h2>
            <form>
                <div className="form-group">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" minLength={5} onChange={handleOnChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea className="form-control" id="description" name="description" rows={3} minLength={5} onChange={handleOnChange} required />
                </div>
                <button type="submit" className="btn btn-sm btn-danger" onClick={handleInsert}>Add Todo</button>
            </form>
        </div>
    )
}

export default AddTodo