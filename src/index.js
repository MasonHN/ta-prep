import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { isNull } from "util";

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      todos: [],
      newTodo: ''
    }
    // this.addTodos.bind(this);
    // this.todoTextChange.bind(this);
  }

  componentDidMount() {
    
    axios.get('/todos')
    .then((results) => {
      this.setState({
        todos: results.data
      })
      console.log(results)
    })
  }

  todoTextChange(e) {
    e.preventDefault();
    this.setState({
      newTodo : e.target.value
    })
  }
  
  addTodos(text) {
    axios.post('/todos', {
      todo: text
    })
    .then((result) => {
      console.log(result.data);
      this.setState({
        todos: this.state.todos.concat([result.data])
      })
    })
  }

  updateTodo(i) {
    console.log(i)
    let updatedTodos = this.state.todos
    let todoToUpdate = this.state.todos[i]
    updatedTodos.splice(i, 1, todoToUpdate)
    axios.post('/updateTodo', {
      todo: todoToUpdate
    })
    this.setState({
      todos: updatedTodos
    })
  }

  deleteTodo(i) {
    console.log(i)
    let updatedTodos = this.state.todos
    updatedTodos.splice(i, 1)
    let todoToDelete = this.state.todos[i]
    axios.post('/todosDelete', {
      todo: todoToDelete.title
    })
    this.setState({
      todos : updatedTodos
    })
  }

  render() {
    return (
      <div>
        <div>I'm so lonely without anything to complete</div>
        <input type='text' onChange={this.todoTextChange.bind(this)}/>
        <button onClick={(e) => {e.preventDefault(); this.addTodos(this.state.newTodo)}}>Click Me To Do Things!</button>
        <br/>
        <div>
          {this.state.todos.map((todo, index) => (
            < TodoList delete = {this.deleteTodo.bind(this)} index={index} todo={todo} />
          ))}
        </div>
      </div>
    )
  }
};


const TodoList = (props) => {
  return (
    <div>

      <div>
        {props.todo.title}
        <button>Update</button>
        <input type='hidden'></input>
      </div>
        <button onClick={() => {props.delete(props.index)}}>X</button>
      <br/>
    </div>
  )
}


ReactDOM.render(<App />, document.getElementById("app"));
