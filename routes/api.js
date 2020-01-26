
const express = require('express');
const { body } = require('express-validator');

const todoController = require('../controllers/todo')

const router = express.Router();

router.get('/todo', todoController.getTodos);

router.post('/todo', [
    body('content').trim().isLength({ min: 5 })
], todoController.createTodo)

router.get('/todo/:id', todoController.getTodo);

router.delete('/todo/:id', todoController.deleteTodo);

router.put('/todo/:id',
    [
        body('content')
            .trim()
            .isLength({ min: 5 })
    ], todoController.updateTodo);

module.exports = router;