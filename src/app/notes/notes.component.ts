import { Component } from '@angular/core';
import {CdkDragDrop, CdkDropList, moveItemInArray} from '@angular/cdk/drag-drop';
import {NoteCardComponent} from "../note-card/note-card.component";
import {NoteHeaderComponent} from "../note-header/note-header.component";
import {NgForOf} from "@angular/common";
import { DragDropModule } from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [
    NoteCardComponent,
    NoteHeaderComponent,
    CdkDropList,
    NgForOf
  ],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.css'
})
export class NotesComponent {
  notes = [
    { title: 'Dato inecesario 1', subtitle: 'El café es una de las bebidas más populares...' },
    { title: 'Dato inecesario 2', subtitle: 'El café es una de las bebidas más populares...' },
    { title: 'Dato inecesario 3', subtitle: 'El café es una de las bebidas más populares...' },
    { title: 'Dato inecesario 4', subtitle: 'El café es una de las bebidas más populares...' },
    { title: 'Dato inecesario 5', subtitle: 'El café es una de las bebidas más populares...' }
  ];

  drop(event: CdkDragDrop<{title: string, subtitle: string}[]>): void {
    moveItemInArray(this.notes, event.previousIndex, event.currentIndex);
  }

}
