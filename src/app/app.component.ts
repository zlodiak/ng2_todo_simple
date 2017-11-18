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
  private isAllChecked: boolean = false;

  constructor(private todosService: TodosService) {};

  ngOnInit() {
		this.setActiveBtn(this.activeBtn);
  };

  private toggleAllChecked(): void {
  	let todos = this.todosService.getTodos();
  	let newTodos: Todo[] = [];

  	todos.forEach((todo) => {
  		this.checkboxes[todo.id] = this.isAllChecked;
  		todo.isChecked = this.isAllChecked;
  		newTodos.push(todo);
  	});

  	this.todosService.rewriteTodos(newTodos);
  	this.isAllChecked = false;
  };

  private clearCompleted(): void {
  	let todos = this.todosService.getTodos();

  	todos.forEach((todo) => {
  		if(todo.isChecked === true) {
  			this.todosService.removeTodo(todo.id);
  		}
  	});  	

  	this.ngOnInit();
  };

  private removeTodo(id): void {
  	this.todosService.removeTodo(id);
  	this.ngOnInit();
  };

  private setActiveBtn(btn): void {  	
  	this.activeBtn = btn;   
  	this.todos = this.todosService.getTodos();

  	this.todos.forEach((todo) => {
  		this.checkboxes[todo.id] = todo.isChecked;
  	});  	

  	if(this.activeBtn == 'All') { return; }

  	let allTodos = this.todos;
  	this.todos = [];

  	allTodos.forEach((todo) => {
  		if(this.activeBtn == 'Active' && todo.isChecked === false) {
  			this.todos.push(todo);
  		} else if(this.activeBtn == 'Completed' && todo.isChecked === true){
				this.todos.push(todo);
  		}
  	}); 
  }

  private changeRemoveIcon(id, state): void {
  	let todoId = 'todo_' + id;
  	let el = document.getElementById(todoId);

  	if(state == 'enter') {
			el.classList.add('hovered');
  	} else if(state == 'leave') {
			el.classList.remove('hovered');	
  	}		
  };

  private toggleTodoState(id, state): void {
  	let todos = this.todosService.getTodos();

  	todos.forEach((todo) => {
  		if(todo.id === id) {
  			todo.isChecked = state;
  			this.todosService.rewriteTodos(todos);
  			return;
  		}
  	});

  	this.setActiveBtn(this.activeBtn);
  };

  private renderTodo(todo): void {
  	this.todos.push(todo);
  };

  private createTodo(): void {
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

  	this.ngOnInit();
  }

}
