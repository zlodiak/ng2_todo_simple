import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { 	MatButtonModule, 
					MatCardModule,
					MatInputModule,
          MatCheckboxModule,
          MatIconModule } from '@angular/material';

import { AppComponent } from './app.component';
import { TodosService } from './services/todos.service';
import { TodosPipe } from './pipes/todos.pipe';


@NgModule({
  declarations: [
    AppComponent,
    TodosPipe
  ],
  imports: [
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
  	MatInputModule,
  	FormsModule,
  	MatCardModule,
  	BrowserAnimationsModule,
    BrowserModule
  ],
  providers: [TodosService],
  bootstrap: [AppComponent]
})
export class AppModule { }
