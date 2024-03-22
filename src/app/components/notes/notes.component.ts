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
  filteredNotes: Note[] = [];
  newNote: Note = {title: '', description: ''};
  showForm: boolean = false;
  editingNoteId: string | undefined = undefined;
  private _searchText: string = '';

  constructor(private notesService: NotesService) {
  }

  ngOnInit(): void {
    this.loadNotes();
  }

  loadNotes(): void {
    this.notesService.getNotes().subscribe(notes => {
      this.notes = notes;
      this.filterNotes();
    });
  }

  filterNotes(): void {
    this.filteredNotes = this.notes.filter(note =>
      note.title.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  get searchText(): string {
    return this._searchText;
  }

  set searchText(value: string) {
    this._searchText = value;
    this.filterNotes();
  }

  toggleForm(note?: Note): void {
    this.showForm = !this.showForm;
    if (note) {
      this.editingNoteId = note.id;
      this.newNote = {...note};
    } else {
      this.editingNoteId = undefined;
      this.newNote = {title: '', description: ''};
    }
  }

  submitNote(): void {
    if (this.editingNoteId) {
      // Actualizar una nota existente
      this.notesService.modifyNote(this.editingNoteId, this.newNote).then(() => {
        this.resetForm();
        this.loadNotes(); // Recargar las notas para reflejar los cambios
      });
    } else {
      // Crear una nueva nota
      if (this.newNote.title && this.newNote.description) {
        this.notesService.addNote(this.newNote).then(() => {
          this.resetForm();
          this.loadNotes(); // Recargar las notas para incluir la nueva
        });
      }
    }
  }

  deleteNote(noteId: string): void {
    this.notesService.deleteNote(noteId).then(() => {
      this.loadNotes(); // Recargar las notas después de eliminar
    });
  }

  resetForm(): void {
    this.showForm = false;
    this.newNote = {title: '', description: ''};
    this.editingNoteId = undefined;
  }
}
