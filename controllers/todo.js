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


// exports.getPost = (req, res, next) => {
//   const postId = req.params.postId;
//   Post.findById(postId)
//     .then(post => {
//       if (!post) {
//         const error = new Error('Could not find post.');
//         error.statusCode = 404;
//         throw error;
//       }
//       res.status(200).json({ message: 'Post fetched.', post: post });
//     })
//     .catch(err => {
//       if (!err.statusCode) {
//         err.statusCode = 500;
//       }
//       next(err);
//     });
// };
