import { Injectable } from '@angular/core';

import { Todo } from '../types/todo';


@Injectable()
export class TodosService {

  constructor() { }

  rewriteTodos(todos) {
  	localStorage.todos = JSON.stringify(todos);
  }

  getTodos() {
  	return localStorage.todos ? JSON.parse(localStorage.todos) : [];
  };

  removeTodo(id) {
    let todos = this.getTodos();
    let newTodos: Todo[] = [];

    todos.forEach((todo) => {
      if(todo.id != id) {
        newTodos.push(todo);
      }
    });

    localStorage.todos = JSON.stringify(newTodos);
  };

  addTodo(todo) {
  	let todos = this.getTodos();
  	todos.push(todo);
  	localStorage.todos = JSON.stringify(todos);
  };

}
