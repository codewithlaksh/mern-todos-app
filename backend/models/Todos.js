const mongoose = require('mongoose');
const { Schema } = mongoose;

const TodosSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('todos', TodosSchema);