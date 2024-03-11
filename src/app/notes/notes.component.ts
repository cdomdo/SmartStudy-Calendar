import { Component } from '@angular/core';
import {NoteCardComponent} from "../note-card/note-card.component";
import {navbarComponent} from "../notes-nav/note-var.component";


@Component({
  selector: 'app-notes',
  standalone: true,
    imports: [
        NoteCardComponent,
        navbarComponent,
    ],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.css'
})
export class NotesComponent {

}
