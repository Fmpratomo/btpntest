const { validationResult } = require('express-validator')

const Todo = require('../models/todo');

exports.getTodos = (req, res, next) => {
  Todo.find()
    .then(todo => {
      res
        .status(200)
        .json({ message: 'Fetched todos successfully.', todo: todo });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.createTodo = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is incorrect.');
    error.statusCode = 422;
    throw error;
  }
  const content = req.body.content;
  const isfavorite = req.body.isfavorite;
  const creator = req.body.creator;
  const post = new Todo({
    content: content,
    isfavorite: isfavorite,
    creator: creator
  });
  post
    .save()
    .then(result => {
      res.status(201).json({
        message: 'Todo created successfully!',
        post: result
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getTodo = (req, res, next) => {
  const todo = new Todo({
    _id: req.params.id
  });
  Todo.findById(todo)
    .then(post => {
      if (!post) {
        const error = new Error('Could not find todo.');
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({ message: 'get todo by id', post: post });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.deleteTodo = (req, res, next) => {
  const todo = new Todo({
    _id: req.params.id
  });
  Todo.findById(todo)
    .then(post => {
      if (!post) {
        const error = new Error('Could not find todo.');
        error.statusCode = 404;
        throw error;
      }
      Todo.deleteOne(todo)
        .then(
          res.status(200).json({ message: 'Delete todo by id' }))
        .catch(err => {
          if (!err.statusCode) {
            err.statusCode = 500;
          }
          next(err);
        });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.updateTodo = (req, res, next) => {
  const todo = new Todo({
    _id: req.params.id
  });
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is incorrect.');
    error.statusCode = 422;
    throw error;
  }
  const content = req.body.content;
  const isfavorite = req.body.isfavorite;
  Todo.findById(todo)
    .then(post => {
      if (!post) {
        const error = new Error('Could not find todo.');
        error.statusCode = 404;
        throw error;
      }
      post.content = content;
      post.isfavorite = isfavorite;
      return post.save();
    })
    .then(result => {
      res.status(200).json({ message: 'Todo updated by id!', post: result });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

