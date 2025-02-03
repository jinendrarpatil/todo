const express = require('express')
const Todo = require('../models/Todo')
const router = express.Router();
const todo = require('../controller/todo')

router.get('/', todo.homeController)

router.get('/add-todo', todo.addtodoFormController)

router.get('/update-todo', todo.updatetodoFormController)

router.get('/delete-todo', todo.deletetodoFormController)

router.post('/add-todo', todo.addtodoController)

router.post('/update-todo/:id', todo.updatetodoController)

router.get('/confirm-delete', todo.deletetodoController)

module.exports = router;