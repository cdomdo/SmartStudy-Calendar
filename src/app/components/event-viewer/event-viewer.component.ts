import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import Event from "../../interfaces/event.interface";

@Component({
  selector: 'app-event-viewer',
  templateUrl: './event-viewer.component.html',
  styleUrls: ['./event-viewer.component.css'],
  animations: [
    trigger('dialog', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.9)' }),
        animate('200ms ease-out', style({ opacity: 1, transform: 'scale(1)' })),
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ opacity: 0, transform: 'scale(0.9)' }))
      ])
    ])
  ]
})
export class EventViewerComponent implements OnInit {
  @Input() event?: Event;
  @Output() close = new EventEmitter<void>();

  ngOnInit(): void {}

  closeDialog() {
    this.close.emit();
  }

  editEvent() {
    // Implementa la lógica para editar el evento
  }

  deleteEvent() {
    const confirmation = window.confirm("¿Estás seguro de que quieres borrar este evento?");
    if (confirmation) {
      // Implementa la lógica para borrar el evento
    }
  }
}
