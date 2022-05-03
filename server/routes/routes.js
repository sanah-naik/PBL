const express = require('express');
const Model = require('../models/models');
const router = express.Router();

//Post Method
router.post('/signup', async (req, res) => {
    const data = new Model({
        name: req.body.name,
        password: req.body.password
    })

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//Get all Method
router.get('/getAll', async (req, res) => {
    try {
        const data = await Model.find();
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//Login
router.get('/login', async (req, res) => {
    try {
        const data = await Model.find({name: req.query.username, password: req.query.password});
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//Get by ID Method
router.get('/getOne/:id', async (req, res) => {
    try {
        const data = await Model.findById(req.params.id);
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//Update by ID Method
router.put('/update/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        console.log(updatedData);

        const result = await Model.findOneAndUpdate(
            { _id: id }, 
            { $push: updatedData })

        res.send(result)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//Update todo by ID
router.put('/updateTodo/:id/:todo', async (req, res) => {
    try {
        const id = req.params.id;
        const todo = req.params.todo;
        const updatedData = req.body.checked;
        console.log(updatedData);

        const result = await Model.findOneAndUpdate(
            { _id: id, "todo._id":  todo}, 
            { $set: {
                'todo.$.checked': updatedData
            }})

        res.send(result)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//Delete by ID Method
router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Model.findByIdAndDelete(id)
        res.send(`Document with ${data.name} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

module.exports = router;