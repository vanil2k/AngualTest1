import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Note{
  id: number;
  title: string;
  content: string;
}
export interface TodoTask{
  id: number;
  text: string;
  done: boolean;
}
export interface Todo{
  id: number;
  title: string;
  tasks: TodoTask[];
}


@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
  private notes = new BehaviorSubject<Note[]>([
    { id: 1, title: "Shopping List", content: "Buy milk and bread" },
    { id: 2, title: "Ideas", content: "Start a blog about travel" }
  ]);
  private todos = new BehaviorSubject<Todo[]>([
    { id: 1, title: "Work Tasks", tasks: [
      { id: 1, text: "Finish report", done: false },
      { id: 2, text: "Email client", done: true }
    ]}
  ]);
  notes$ = this.notes.asObservable();
  todos$ = this.todos.asObservable();
  constructor() { }
  addNote(note: Note){
    const currentNotes = this.notes.value;
    this.notes.next([...currentNotes, note]);
  }
  
  deleteNote(id: number) {
    const currentNotes = this.notes.value;
    this.notes.next(currentNotes.filter(note => note.id !== id));
  }
  
  addTodo(todo: Todo){
    const currentTodos = this.todos.value;
    this.todos.next([...currentTodos, todo])
  }

  deleteTodo(id: number) {
    const currentTodos = this.todos.value;
    this.todos.next(currentTodos.filter(todo => todo.id !== id));
  }

  toggleTask(todoId: number, taskId: number) {
    const updatedTodos = this.todos.value.map(todo => {
      if (todo.id === todoId) {
        todo.tasks = todo.tasks.map(task => 
          task.id === taskId ? { ...task, done: !task.done } : task
        );
      }
      return todo;
    });
    this.todos.next(updatedTodos);
  }
}
