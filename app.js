const express = require('express');
const bodyParser = require('body-parser')
const http = require('http')
const mongoose = require('mongoose')
const apiRoutes = require('./routes/api')

const app = express();

app.use(bodyParser.json()) //application json Format

//Give CORS Access Control 
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Method', 'OPTIONS,GET,POST,PUT,PATCH,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
})

app.use('/api', apiRoutes);

//collective log throw
app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({ message: message });
});

const port = process.env.PORT || 3000;
const server = http.createServer(app);

const db = require("./config/keys").mongoURI;

mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

server.listen(port, () => {
  //    let's print a message when the server run successfully
  console.log("Server restarted successfully")
});
