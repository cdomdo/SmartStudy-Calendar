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
  showForm: boolean = false;
  editingNoteId: string | undefined = undefined;

  constructor(private notesService: NotesService) { }

  ngOnInit(): void {
    this.loadNotes();
  }

  loadNotes(): void {
    this.notesService.getNotes().subscribe(notes => {
      this.notes = notes;
    });
  }

  toggleForm(note?: Note): void {
    this.showForm = !this.showForm;
    if (note) {
      this.editingNoteId = note.id;
      this.newNote = { ...note };
    } else {
      this.editingNoteId = undefined;
      this.newNote = {title: '', description: ''};
    }
  }

  submitNote(): void {
    if (this.editingNoteId) {
      this.notesService.modifyNote(this.editingNoteId, this.newNote).then(() => {
        this.resetForm();
      });
    } else if (this.newNote.title && this.newNote.description) {
      this.notesService.addNote(this.newNote).then(() => {
        this.resetForm();
      });
    }
  }

  deleteNote(noteId: string): void {
    this.notesService.deleteNote(noteId).then(() => {
      this.loadNotes();
    });
  }

  resetForm(): void {
    this.showForm = false;
    this.newNote = {title: '', description: ''};
    this.editingNoteId = undefined;
    this.loadNotes();
  }
}
