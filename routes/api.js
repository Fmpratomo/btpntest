
const express = require('express');
const { body } = require('express-validator');

const todoController = require('../controllers/todo')

const router = express.Router();

// GET /feed/posts 
router.get('/todo', todoController.getTodos);

router.post('/todo', [
    body('content').trim().isLength({ min: 5 })
], todoController.createTodo)

// router.get('/post/:postId', feedController.getPost);

module.exports = router;