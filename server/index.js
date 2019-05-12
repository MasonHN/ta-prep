const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const db = require('../database/index.js')

const app = express();

//Parse json and x-ww-form-urlencoded
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/", express.static("dist"));

app.get("/todos", (req, res) => {
  // request.get('https://jsonplaceholder.typicode.com/todos', (err, response, body) => {
  //   if (err) {
  //     console.log('error', err)
  //     res.send();
  //   } else {
  //     console.log('body', typeof(body));
  //     let data = JSON.parse(body);
  //     for (let i = 0; i < data.length; i++) {
  //       db.con.query(`INSERT INTO todos(title) values ('${data[i].title}');`, (err, result) => {
  //         if (err) {
  //           console.log('error', err)
  //         } else {
  //         }
  //       })
  //     }
  //     db.con.query(`SELECT * from todos;`, (err, results) => {
  //       if (err) {
  //         console.log('error', err)
  //       } else {
  //         res.send(results);
  //       }
  //     })
  //   }
  // })
  db.con.query(`SELECT * from todos;`, (err, results) => {
    if (err) {
      console.log('error', err)
      res.send();
    } else {
      res.send(results);
    }
  })
});

app.post("/todos", (req, res) => {
  db.con.query(`INSERT INTO todos(title) values ('${req.body.todo}');`, (err, result) => {
    if (err) {
      console.log('error', err)
      res.send();
    } else {
      console.log('success db insert')
      res.send(req.body.todo)
    }
  })
});

app.post("/updateTodo", (req, res) => {
  db.con.query(`UPDATE todos SET title = '${req.body.todo}' WHERE todo_id = '${req.body.id + 1}';`, (err, result) => {
    if (err) {
      console.log('error', err)
      res.send();
    } else {
      console.log('success db update')
      res.send(req.body.todo)
    }
  })
});

app.post("/todosDelete", (req, res) => {
  db.con.query(`DELETE FROM todos WHERE title='${req.body.todo}';`, (err, result) => {
    if (err) {
      console.log('error', err)
      res.send();
    } else {
      console.log('success db delete')
      res.send(req.body.todo)
    }
  })
});

app.listen(3000, () => console.log("Now listening on port 3000!"));
