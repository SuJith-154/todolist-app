const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const TodoModel = require('./models/todo.js');
const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/test')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('Connection error:', err));  // Fixed: Added error handling for DB connection

app.get('/get', (req, res) => {
    TodoModel.find()
    .then(result => res.json(result))
    .catch(err => {
        console.log(err);
        res.status(500).json({ error: 'Server error' });  // Fixed: Send error response to client
    });
});

app.put('/update/:id', (req, res) => {
    const { id } = req.params;  // Fixed: Destructure id from params
    const { done } = req.body;  // Fixed: Get done status from request body
    
    TodoModel.findByIdAndUpdate(id, { done }, { new: true })  // Fixed: Correct update syntax
    .then(result => res.json(result))
    .catch(err => {
        console.log(err);
        res.status(500).json({ error: 'Update failed' });  // Fixed: Error response
    });
});

app.delete('/delete/:id', (req, res) => {  // Fixed: Changed to DELETE method
    const { id } = req.params;  // Fixed: Destructure id
    
    TodoModel.findByIdAndDelete(id)  // Fixed: Correct delete syntax
    .then(result => res.json(result))
    .catch(err => {
        console.log(err);
        res.status(500).json({ error: 'Delete failed' });  // Fixed: Error response
    });
});

app.post('/add', (req, res) => {
    const task = req.body.task;
    
    TodoModel.create({ task })
    .then(result => res.json(result))  // Fixed: Removed location.reload()
    .catch(err => {
        console.log(err);
        res.status(500).json({ error: 'Failed to add task' });  // Fixed: Error response
    });
});

app.listen(3001, () => {
    console.log('Server is running on port 3001');
});