const express = require('express');
const router = express.Router();
const Todos = require('../models/Todos');

router.get('/', async (req, res) => {
    let todos = await Todos.find({})
    res.json({ todos: todos });
    res.status(200);
})

router.get('/:id', async (req, res) => {
    let todo = await Todos.findById(req.params.id);
    if (!todo) {
        res.json({ "status": 404, "message": "No such todo found!" });
        res.status(404);
    } else {
        res.json({ todo: todo });
        res.status(200);
    }
})

router.post('/add', async (req, res) => {
    const { title, description } = req.body;
    const Todo = new Todos({
        title, description
    })
    await Todo.save();
    res.json({ "status": 200, "message": "Your todo has been added successfully!" });
    res.status(200);
})

router.post('/update/:id', async (req, res) => {
    const { title, description } = req.body;
    const newTodo = {};

    if (title) { newTodo.title = title }
    if (description) { newTodo.description = description }

    const todo = await Todos.findById(req.params.id)
    
    if (!todo) {
        res.json({ "status": 404, "message": "No such todo found!" });
        res.status(404);
    } else {
        await Todos.findByIdAndUpdate(req.params.id, { $set: newTodo }, { new: true })
        res.json({ "status": 200, "message": "Your todo has been updated successfully!" });
        res.status(200);
    }

})

router.post('/delete/:id', async (req, res) => {
    const todo = await Todos.findById(req.params.id)
    
    if (!todo) {
        res.json({ "status": 404, "message": "No such todo found!" });
        res.status(404);
    } else {
        await Todos.findByIdAndDelete(req.params.id)
        res.json({ "status": 200, "message": "Your todo has been deleted successfully!" });
        res.status(200);
    }

})

module.exports = router;