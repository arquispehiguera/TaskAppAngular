import { Component,OnInit,computed,effect,signal } from '@angular/core';
import {FilterType, TodoModel} from '../../app/models/todo' 
import { FormControl,ReactiveFormsModule,Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})
export class TodoComponent   {
 todoList=signal<TodoModel[]>([
 {
   id:1,
   tittle:"Tarea 1",
   completed:false,
   editing:false
 },
 {
  id:2,
  tittle:"Tarea 2",
  completed:true,
  editing:false
},
 {
  id:3,
  tittle:"Tarea 3",
  completed:false,
  editing:false
 }
]);

todoListFiltered =computed(()=>{

const filtro = this.filter()
const listaOriginal = this.todoList();
switch(filtro){
  case 'active': return listaOriginal.filter((task)=>!task.completed)
  case 'completed': return listaOriginal.filter((task)=>task.completed)
  default: return listaOriginal
}

})

//declare
 filter =signal<FilterType>('all')

 frmC = new FormControl('',{
  nonNullable:true,
  validators: [
    Validators.required,
    Validators.minLength(3)
  ]
 })
 //funtions
 onFilter(filterString:FilterType){
      this.filter.set(filterString)
 }

 addTask() {
  const newTaskInput = this.frmC.value.trim(); // Renombré la variable a camelCase
  if (this.frmC.valid && newTaskInput !== '') {
    this.todoList.update(prevTasks => [
      ...prevTasks,
      { id: Date.now(), tittle: newTaskInput, completed: false } // Renombré Title a title
    ]);
    this.frmC.reset();
  } else {
    this.frmC.reset();
  }
}





 IsCompleted(TaskId:number){
 return this.todoList.update((prev_task)=>
  prev_task.map((task)=>{
    return  task.id===TaskId ?{...task,completed :!task.completed}:task;
  }))
 }

 UpdateTaskToogle(TaskId:number){
  return this.todoList.update((prev_task)=>
   prev_task.map((task)=>{
     return  task.id===TaskId ?{...task,editing :true}:{...task,editing :false};
   }))
  }
 

 RemoveTask(TaskId:number){
  this.todoList.update((prev_task) =>prev_task.filter((task)=> task.id!==TaskId))
}

editTitleTask(TaskId: number, event: Event) {
  const titulo = (event.target as HTMLInputElement).value; // Cambiado "titulo" a "title" para seguir convenciones de nombres
  return this.todoList.update((prevTasks) =>
    prevTasks.map((task) =>
      task.id === TaskId ? { ...task, tittle: titulo, editing: false } : task
    )
  );
}


}

 




