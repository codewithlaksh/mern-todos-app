// TODO: Add connection to the mongodb cluster
const mongoose = require('mongoose');

const connectToMongo = () => {
    mongoose.connect('mongodb://localhost:27017/mern-todo-app', () => {
        console.log('Connected to mongodb successfully!');
    })
}

module.exports = connectToMongo;