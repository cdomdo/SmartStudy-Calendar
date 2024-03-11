import { Component, Input } from '@angular/core';
@Component({
  selector: 'app-note-card',
  standalone: true,
  imports: [],
  templateUrl: './note-card.component.html',
  styleUrl: './note-card.component.css'
})
export class NoteCardComponent {
  @Input() title: string = "";
  @Input() subtitle: string = "";
}
