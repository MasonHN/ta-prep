import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      todos: [],
      newTodo: '',
      updateField: [],
      count: 0
    }
    // this.addTodos.bind(this);
    // this.todoTextChange.bind(this);
  }

  componentDidMount() {
    axios.get('/todos')
    .then((results) => {
      console.log(results.data);
      this.setState({
        todos: results.data,
        updateField: Array(results.data.length).fill(null)
      })
      console.log(this.state)
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
      let newTodoList = this.state.todos;
      newTodoList.push(result.data);
      this.setState({
        todos: newTodoList
      })
      this.componentDidMount()
    })
  }

  updateButtonHandler(i) {
    let updatedTodos = this.state.updateField;
    updatedTodos[i] = !updatedTodos[i]
    this.setState({
      updateField : updatedTodos
    })
    if (!updatedTodos[i]) {
      axios.post('/updateTodo', {
        todo: this.state.todos[i].title,
        id : this.state.todos[i].id
      })
      .then(() => {
        this.componentDidMount()
      })
    }
  }

  updateTodo(updateText, i) {
    console.log(i)
    console.log(updateText)
    let updatedTodos = this.state.todos
    updatedTodos[i].title = updateText
    this.setState({
      todos: updatedTodos,
    })
  }

  deleteTodo(i) {
    console.log(i)
    let updatedTodos = this.state.todos
    let todoToDelete = this.state.todos[i]
    updatedTodos.splice(i, 1)
    axios.post('/todosDelete', {
      todo: todoToDelete.title,
    })
    this.setState({
      todos : updatedTodos,
      updateField: Array(updatedTodos.length).fill(null)
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
            < TodoList update = {this.updateTodo.bind(this)} updateField = {this.state.updateField} updateButton = {this.updateButtonHandler.bind(this)} delete = {this.deleteTodo.bind(this)} index={index} todo={todo} />
          ))}
        </div>
      </div>
    )
  }
};


const TodoList = (props) => {
  if(props.updateField[props.index]) {
    return (
      <div>
        <div>
          {props.todo.title}
          <button onClick= {() => {props.updateButton(props.index)}} >Update</button>
          <input onChange={(e) => {e.preventDefault(); props.update(e.target.value, props.index)}} type='text' name='update'></input>
        </div>
        <br/>
      </div>      
    )
  } else {
    return (
      <div>
        <div>
          {props.todo.title}
          <button onClick={() => {props.delete(props.index)}}>X</button>
          <button onClick={() => {props.updateButton(props.index)}} >Update</button>
        </div>
        <br/>
      </div>
    )
}
}


ReactDOM.render(<App />, document.getElementById("app"));
