import React, { Component } from 'react'
import TodoInput from './TodoInput'
import TodoList from './TodoList';
export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tasks: [
        {title: 'Todo 1번째', id: 0},
      {title: '2번째', id:1}
      ],
      uniqueId: 1
    }

    this.addTodo = this.addTodo.bind(this);
     
  }

  addTodo(title) {
    const {
      tasks,
      uniqueId
    } = this.state;

    tasks.push({
      title,
      id: uniqueId
    })

    this.setState({
      tasks,
      uniqueId: uniqueId + 1,
    })
  }

  render() {


    const tasks = [
      {title: 'Todo 1번째', id: 0},
      {title: '2번째', id:1}

    ]


    return (
      <div>
        <h1>TODO APP</h1>
        <TodoInput addTodo={this.addTodo}/>
        <TodoList  tasks={this.state.tasks}/>
      </div>


    )
  }
}
