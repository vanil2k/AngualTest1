import { Component, Input } from '@angular/core';
import { DataServiceService, Todo, TodoTask } from '../../services/data-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todos-section',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todos-section.component.html',
  styleUrl: './todos-section.component.scss'
})
export class TodosSectionComponent {
  todos: Todo[] = [];
  filteredTodos: Todo[] = [];
  @Input() searchQuery = '';
  newTodoTitle = '';
  newTaskTexts: { [todoId: number]: string } = {};

  constructor(private dataService: DataServiceService) {}

  ngOnInit() {
    this.dataService.todos$.subscribe(todos => {
      this.todos = todos;
      this.applySearch();
    });
  }

  ngOnChanges() {
    this.applySearch();
  }

  applySearch() {
    this.filteredTodos = this.searchQuery
      ? this.todos.filter(todo => 
          todo.title.toLowerCase().includes(this.searchQuery) ||
          todo.tasks.some(task => task.text.toLowerCase().includes(this.searchQuery))
        )
      : this.todos;
  }

  addTodo() {
    if (!this.newTodoTitle.trim()) return;
    const todo: Todo = {
      id: Date.now(),
      title: this.newTodoTitle,
      tasks: []
    };
    this.dataService.addTodo(todo);
    this.newTodoTitle = '';
  }

  deleteTodo(id: number) {
    this.dataService.deleteTodo(id);
  }

  toggleTask(todoId: number, taskId: number) {
    this.dataService.toggleTask(todoId, taskId);
  }

  addTask(todoId: number) {
    const taskText = this.newTaskTexts[todoId];
    if (!taskText || !taskText.trim()) return;
    
    const newTask: TodoTask = {
      id: Date.now(),
      text: taskText.trim(),
      done: false
    };

    const updatedTodos = this.todos.map((todo: Todo) => {
      if (todo.id === todoId) {
        return { ...todo, tasks: [...todo.tasks, newTask] };
      }
      return todo;
    });

    this.dataService['todos'].next(updatedTodos);
    this.newTaskTexts[todoId] = '';
  }
}
