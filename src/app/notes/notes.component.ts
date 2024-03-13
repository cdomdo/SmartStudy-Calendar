import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { NoteCardComponent } from "../note-card/note-card.component";
import { NoteHeaderComponent } from "../note-header/note-header.component";
import {AsyncPipe, NgForOf} from "@angular/common";
import { DragDropModule } from '@angular/cdk/drag-drop'; // Importa DragDropModule correctamente
import { Observable } from "rxjs";
import { NoteService } from "../services/note.service";
import  Note  from "../interfaces/note.interface"; // Asegúrate de que la ruta de importación es correcta

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [
    NoteCardComponent,
    NoteHeaderComponent,
    DragDropModule, // Usa DragDropModule aquí
    NgForOf,
    AsyncPipe
  ],
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  notes$!: Observable<Note[]>;

  constructor(private noteService: NoteService) {}

  ngOnInit() {
    this.loadNotes();
  }

  loadNotes() {
    this.notes$ = this.noteService.getNotes();
  }

  drop(event: CdkDragDrop<Note[]>): void {
    this.notes$.subscribe(notes => {
      moveItemInArray(notes, event.previousIndex, event.currentIndex);
      // Reordena las notas localmente, no en Firestore
    });
  }
}
