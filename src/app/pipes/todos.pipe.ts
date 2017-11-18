import { Pipe, PipeTransform } from '@angular/core';

import { Todo } from '../types/todo';
import { TodosService } from '../services/todos.service';


@Pipe({
  name: 'todos'
})
export class TodosPipe implements PipeTransform {

	constructor(private todosService: TodosService) {};

  transform(value: any, btnName: string): any {
  	let todos = this.todosService.getTodos();
  	console.log(todos, btnName);
  	if(btnName == 'All') { return todos; }
  	
  	let todosFitered: Todo[] = [];
  	let condition: boolean;

  	if(btnName == 'Completed') {
  		condition = true;
  	} else if(btnName == 'Active') {
  		condition = false;
  	}

  	console.log('cond', condition);

  	todos.forEach((todo) => {
  		console.log(todo.isChecked, condition);
  		if(todo.isChecked == condition) {
  			todosFitered.push(todo);
  		}
  	});	

  	console.log('todosFitered', todosFitered);

  	return todosFitered;
  }

}
