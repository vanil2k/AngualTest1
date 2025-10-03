import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { DataServiceService, Note } from '../../services/data-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-notes-section',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './notes-section.component.html',
  styleUrl: './notes-section.component.scss'
})
export class NotesSectionComponent implements OnInit, OnChanges {
  notes: Note[] = [];
  filteredNotes: Note[] = [];
  @Input() searchQuery = '';
  newTitle = '';
  newContent = '';
  
  constructor(private dataService: DataServiceService) {}

  ngOnInit() {
    this.dataService.notes$.subscribe(notes => {
      this.notes = notes;
      this.applySearch();
    });
  }

  ngOnChanges() {
    this.applySearch();
  }

  applySearch() {
    this.filteredNotes = this.searchQuery
      ? this.notes.filter(note => 
          note.title.toLowerCase().includes(this.searchQuery) ||
          note.content.toLowerCase().includes(this.searchQuery)
        )
      : this.notes;
  }
  addNote() {
    if (!this.newTitle.trim()) return;
    const note: Note = {
      id: Date.now(),
      title: this.newTitle,
      content: this.newContent
    };
    this.dataService.addNote(note);
    this.newTitle = '';
    this.newContent = '';
  }

  deleteNote(id: number) {
    this.dataService.deleteNote(id);
  }
}
