import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { Task } from './../../models/task.model';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  schemas: [NO_ERRORS_SCHEMA]
})
export class HomeComponent {
  tasks = signal<Task[]>([
    {
      id: Date.now(),
      title: 'Hacer el curso de Angular JS',
      completed: true
    },
    {
      id: Date.now(),
      title: 'Crear componente',
      completed: true
    }
  ]);

  newTaskCtrl = new FormControl('', {
    nonNullable: true,
    validators: [
      Validators.required,

    ]
  });

  changeHandler() {
    if(this.newTaskCtrl.valid) {
      const value = this.newTaskCtrl.value.trim();
      if(value !== '') {
        this.addTask(value);
        this.newTaskCtrl.setValue('');
      }

    }

  }

  addTask(title:string) {
    const newTask = {
      id:Date.now(),
      title,
      completed:false,
    };
    this.tasks.update((tasks) => [...tasks, newTask]);
  }

  deleteTask(index:number){
    this.tasks.update((tasks) => tasks.filter((task, position) => position !== index));
  }

  updateTask(index:number) {
    this.tasks.update((tasks) => {
      return tasks.map((task, position) => {
        if (position === index) {
          return {
            ...task,
            completed: !task.completed
          }
        }
        return task;
        })
      })
    }

    updateTaskEditingMode(index: number){
      this.tasks.update((tasks) => {
        return tasks.map((task, position) => {
          if (position === index) {
            return {
              ...task,
              editing:true,
            }
          }
          return task;
          })
        })
    }
  }


