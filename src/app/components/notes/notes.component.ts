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
  editingNoteId: string | undefined = undefined;
  editingNoteTitle: string = '';
  editingNoteDescription: string = '';

  constructor(private notesService: NotesService) { }

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
        this.newNote = {title: '', description: ''};
        this.loadNotes();
      });
    }
  }

  startEdit(note: Note): void {
    if(note.id) {
      this.editingNoteId = note.id;
      this.editingNoteTitle = note.title;
      this.editingNoteDescription = note.description;
    }
  }

  saveEdit(): void {
    if (this.editingNoteId) {
      this.notesService.modifyNote(this.editingNoteId, { title: this.editingNoteTitle, description: this.editingNoteDescription }).then(() => {
        this.editingNoteId = undefined;
        this.loadNotes();
      });
    }
  }

  cancelEdit(): void {
    this.editingNoteId = undefined;
  }

  deleteNote(noteId: string): void {
    this.notesService.deleteNote(noteId).then(() => {
      this.loadNotes();
    });
  }
}
