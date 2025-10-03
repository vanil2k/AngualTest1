import { Component, Input } from '@angular/core';
import { DataServiceService, Todo, TodoTask } from '../../../services/data-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo-card',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo-card.component.html',
  styleUrl: './todo-card.component.scss'
})
export class TodoCardComponent {
  @Input() todo!: Todo;
  newTaskText = '';

  constructor(private dataService: DataServiceService) {}

  toggleTask(taskId: number) {
    this.dataService.toggleTask(this.todo.id, taskId);
  }

  addTask() {
    if (!this.newTaskText.trim()) return;
    const newTask: TodoTask = {
      id: Date.now(),
      text: this.newTaskText,
      done: false
    };
    const updatedTodo: Todo = { ...this.todo, tasks: [...this.todo.tasks, newTask] };
    this.dataService.addTodo(updatedTodo); // Replace old one
    this.newTaskText = '';
  }
}
