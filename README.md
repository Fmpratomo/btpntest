# btpntest

This project uses the following technologies:
- [Express](http://expressjs.com/) and [Node](https://nodejs.org/en/) for the backend
- [MongoDB](https://www.mongodb.com/) for the database

## Quick Start
Install dependencies
- npm install

Run backend
- npm start

## API Backend
Server runs on https://btpntest.herokuapp.com and on local  http://localhost:3000

Get List all Todo 
- [GET] https://btpntest.herokuapp.com/api/todo 

Get Spesifict todo 
[GET] https://btpntest.herokuapp.com/api/todo/id
- https://btpntest.herokuapp.com/api/todo/5e2d079429de4146043c6183

Create todo
[POST] https://btpntest.herokuapp.com/api/todo
- body JSON = {"content":"Saya buat content pertama","isfavorite":"true","creator":"Fahmi"} ]

[DELETE] https://btpntest.herokuapp.com/api/todo/id 
- https://btpntest.herokuapp.com/api/todo/5e2d0ec246983200245b2cd1

[PUT] https://btpntest.herokuapp.com/api/todo/id 
- Body JSON {"content":"Saya buat content Ketiga","isfavorite":"false"}


