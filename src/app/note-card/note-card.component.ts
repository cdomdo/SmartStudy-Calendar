import { Component, Input } from '@angular/core';
import {DragDropModule} from "@angular/cdk/drag-drop";
import {MatMenuModule} from "@angular/material/menu";
import {MatIconModule} from "@angular/material/icon";
@Component({
  selector: 'app-note-card',
  standalone: true,
  imports: [DragDropModule, MatMenuModule, MatIconModule],
  templateUrl: './note-card.component.html',
  styleUrl: './note-card.component.css'
})
export class NoteCardComponent {
  @Input() title: string = "";
  @Input() subtitle: string = "";
}
