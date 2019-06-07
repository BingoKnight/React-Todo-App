import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Todos from './components/Todos';
import './App.css';
import Header from './components/layout/Header';
import AddTodo from './components/layout/AddTodo';
import About from './components/pages/About';
import Axios from 'axios';

//map also replace:
//   import React, { Component } from 'react';
//with:
//   import React from 'react';
//Also then replace:
//   class App extends Component
//with:
//   class App extends React.Component 
class App extends Component {
  state = {
    id: 0,
    todos: []
  }

  componentDidMount() {
    Axios.get('https://jsonplaceholder.typicode.com/todos').then(res => this.setState({todos: res.data}))
  }

  // toggle todo.completed
  markComplete = (id) =>{
    this.setState({todos : this.state.todos.map(todo=>{
      if(todo.id === id)
        todo.completed = !todo.completed
      return todo;
    }) });
  }

  delete = (id) =>{
    this.setState({ todos: [...this.state.todos.filter(todo =>
       todo.id !== id)]})
  }

  // Add Todo
  addTodo = (title) => {
    if(title && title !== ""){
      const newTodo = {
        id: this.state.id,
        title,
        completed: false
      }
      this.setState({ todos: [...this.state.todos, newTodo],
                      id: this.state.id + 1 })
    }
  }

  render() {
    return (
      <Router>
        <div className="App">
          <div className="container">
            <Header />
            <Route exact path="/" render={ props => (
              <React.Fragment>
                <Todos todos={this.state.todos} markComplete={this.markComplete}
                delete={this.delete} />       
                <AddTodo addTodo={this.addTodo} />
              </React.Fragment>
            ) } />
            <Route path="/about" component={About} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
