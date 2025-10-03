import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { TodosSectionComponent } from './components/todos-section/todos-section.component';
import { NotesSectionComponent } from './components/notes-section/notes-section.component';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, SearchBarComponent, TodosSectionComponent, NotesSectionComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'todo-notes';
  searchQuery = '';

  onSearch(query: string){
    this.searchQuery = query.toLowerCase();
  }
}
