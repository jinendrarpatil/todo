
const Todo = require('../models/Todo')
const moment = require('moment')

const homeController = async (req, res) => {
    try {
        const todos = await Todo.find().sort({ createdAt: -1 })
        res.locals.moment = moment;
        res.render('index', { title: "List todo", todos })
    } catch (error) {
        res.send(500).json({ msg: error.message })
    }
}

const addtodoFormController = (req, res) => {
    try {
        res.render('newTodo', { title: "New todo" })
    } catch (error) {
        res.send(500).json({ msg: error.message })
    }
}

const updatetodoFormController = async (req, res) => {
    try {
        const { id } = req.query;
        const updateTodo = await Todo.findById({ _id: id })
        res.render('updateTodo', { title: "Update todo", updateTodo })
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

const deletetodoFormController = (req, res) => {
    try {
        const { id } = req.query
        res.render('deleteTodo', { title: "Delete todo", id })
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

const addtodoController = async (req, res, next) => {
    try {
        const { title, desc } = req.body;

        if (!title) {
            return res.status(400).json({ message: 'Title is required' })
        }
        const newToDo = new Todo({ title, desc })
        await newToDo.save()
        // res.status(201).json(newToDo)
        return res.redirect("..")
    } catch (error) {
        res.status(500).json({
            msg: error.message
        })
    }
}

const updatetodoController = async (req, res) => {
    try {
        const { id } = req.params
        const { title, desc } = req.body

        const updateTodo = await Todo.findById(id)
        if (!updateTodo) {
            res.status(404).json({
                msg: "Todo not found"
            })
        }
        updateTodo.title = title;
        updateTodo.desc = desc;
        await updateTodo.save()
        res.redirect('/')

    } catch (error) {
        res.status(500).json({
            msg: error.message
        })
    }
}

const deletetodoController = async (req, res) => {
    try {

        const { id, confirm } = req.query;
        if (confirm === 'yes') {
            const todo = await Todo.findByIdAndDelete(id)
        }

        res.redirect('/')
    } catch (error) {
        res.status(500).json({
            msg: error.message
        })
    }
}

module.exports = { homeController, addtodoFormController, updatetodoFormController, deletetodoFormController, addtodoController, updatetodoController, deletetodoController }