import { Component, Input } from '@angular/core';
import { Note } from '../../../services/data-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-note-card',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './note-card.component.html',
  styleUrl: './note-card.component.scss'
})
export class NoteCardComponent {
  @Input() note!: Note;
}
