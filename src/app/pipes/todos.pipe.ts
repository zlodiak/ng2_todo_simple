import { Pipe, PipeTransform } from '@angular/core';

import { Todo } from '../types/todo';
import { TodosService } from '../services/todos.service';


@Pipe({
  name: 'todos'
})
export class TodosPipe implements PipeTransform {

	constructor(private todosService: TodosService) {};

  transform(value: any, btnName: string): any {
  	let todosFitered: Todo[] = []; 	
  	let todos = this.todosService.getTodos();

  	todos.forEach((todo) => {
  		if(todo.isChecked == false) {
  			todosFitered.push(todo);
  		}
  	});	

  	return todosFitered;
  }

}
