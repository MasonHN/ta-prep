const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

//Parse json and x-ww-form-urlencoded
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/", express.static("dist"));

app.get("/todos", (req, res) => {
  request.get('https://jsonplaceholder.typicode.com/todos', (err, response, body) => {
    if (err) {
      console.log('error', err)
    } else {
      console.log('body', typeof(body));
      res.send(JSON.parse(body));
    }
  })
  // console.log("successful request!", req.body);
  // res.send("Hi there");
});

app.listen(3000, () => console.log("Now listening on port 3000!"));
