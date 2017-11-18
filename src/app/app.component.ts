import { Component, OnInit } from '@angular/core';

import { TodosService } from './services/todos.service';
import { Todo } from './types/todo';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  private newTodo: string = '';
  private todos: Todo[] = [];
  private checkboxes: Object = {};
  private activeBtn: string = 'All';

  constructor(private todosService: TodosService) {

   };

  ngOnInit() {
		this.setActiveBtn(this.activeBtn);
  };

  private setActiveBtn(btn) {  	  	
  	this.activeBtn = btn;   
  	this.todos = this.todosService.getTodos();

  	this.todos.forEach((todo) => {
  		this.checkboxes[todo.id] = todo.isChecked;
  	});  	

  	if(this.activeBtn == 'All') { return; }

  	let allTodos = this.todos;
  	this.todos = [];

  	allTodos.forEach((todo) => {
  		console.log(this.activeBtn, todo.isChecked);
  		if(this.activeBtn == 'Active' && todo.isChecked === false) {
  			this.todos.push(todo);
  		} else if(this.activeBtn == 'Completed' && todo.isChecked === true){
				this.todos.push(todo);
  		}
  	}); 
  }

  private hideRemoveIcon(id) {
  	let todoId = 'todo_' + id;
  	let el = document.getElementById(todoId);
		el.classList.remove('hovered');
  };

  private showRemoveIcon(id) {
  	let todoId = 'todo_' + id;
  	let el = document.getElementById(todoId);
  	el.classList.add('hovered');
  };

  private toggleTodoState(id, state): void {
  	console.log(id, state);

  	let todos = this.todosService.getTodos();

  	todos.forEach((todo) => {
  		if(todo.id === id) {
  			todo.isChecked = state;
  			console.log(todo);
  			this.todosService.rewriteTodos(todos);
  			return;
  		}
  	});
  };

  private renderTodo(todo): void {
  	this.todos.push(todo);
  };

  private createTodo(): void {
  	console.log('create new todo:', this.newTodo);

  	if(!this.newTodo.trim().length) { return; }

  	let newTodoObj: Todo = {
  		id: Date.now() + '_' + performance.now(),
  		title: this.newTodo.trim(),
  		isChecked: false,
  		dateUnix: Date.now()

  	};

  	this.todosService.addTodo(newTodoObj);
  	this.renderTodo(newTodoObj);

  	this.newTodo = '';  	
  }

}
