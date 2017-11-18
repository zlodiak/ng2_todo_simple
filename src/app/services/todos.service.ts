import { Injectable } from '@angular/core';

@Injectable()
export class TodosService {

  constructor() { }

  rewriteTodos(todos) {
  	localStorage.todos = JSON.stringify(todos);
  }

  getTodos() {
  	return localStorage.todos ? JSON.parse(localStorage.todos) : [];
  };

  addTodo(todo) {
  	let todos = this.getTodos();
  	todos.push(todo);
  	localStorage.todos = JSON.stringify(todos);
  };

}
