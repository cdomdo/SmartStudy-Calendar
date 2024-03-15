import { Component, OnInit } from '@angular/core';
import Note from '../../interfaces/note.interface';
import { NotesService } from '../../services/notes.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  notes: Note[] = [];
  newNote: Note = {title: '', description: ''};

  constructor(private notesService: NotesService) {}

  ngOnInit(): void {
    this.loadNotes();
  }

  loadNotes(): void {
    this.notesService.getNotes().subscribe(notes => {
      this.notes = notes;
    });
  }

  addNote(): void {
    if (this.newNote.title && this.newNote.description) {
      this.notesService.addNote(this.newNote).then(() => {
        this.newNote = {title: '', description: ''}; // Reset form
        this.loadNotes(); // Recargar las notas
      });
    }
  }

  deleteNote(noteId: string): void { // Asegúrate de que el tipo sea string
    this.notesService.deleteNote(noteId).then(() => {
      this.loadNotes(); // Recargar las notas después de eliminar
    });
  }

  editNote(noteId: string, title: string, description: string): void {
    this.notesService.modifyNote(noteId, { title, description }).then(() => {
      this.loadNotes(); // Recargar las notas después de editar
    });
  }
}
