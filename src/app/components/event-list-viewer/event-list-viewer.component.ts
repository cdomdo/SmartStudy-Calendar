import { Component, EventEmitter, Input, Output } from '@angular/core';
import Event from '../../interfaces/event.interface';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-event-list-viewer',
  templateUrl: './event-list-viewer.component.html',
  styleUrls: ['./event-list-viewer.component.css'],
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
export class EventListViewerComponent {
  @Input() events: Event[] = [];
  @Output() close = new EventEmitter<void>();
  @Output() eventSelected = new EventEmitter<Event>();

  closeDialog() {
    this.close.emit();
  }

  onEventClick(event: Event) {
    this.eventSelected.emit(event);
  }
}
