import { Component } from '@angular/core';
import {NoteCardComponent} from "../note-card/note-card.component";
import {NoteHeaderComponent} from "../note-header/note-header.component";

@Component({
  selector: 'app-notes',
  standalone: true,
    imports: [
        NoteCardComponent,
        NoteHeaderComponent
    ],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.css'
})
export class NotesComponent {

}
