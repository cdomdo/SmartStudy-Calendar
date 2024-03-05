import {Component, Input, Output, EventEmitter, OnInit, signal} from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import Event from "../../interfaces/event.interface";
import { EventsService } from "../../services/event.service";
import Course from "../../interfaces/course.interface";

@Component( {
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
  showSubjectViewer: boolean = false; // Controla la visibilidad de SubjectViewerComponent
  selectedCourse?: Course; // Almacena el curso seleccionado para pasarlo a SubjectViewerComponent

  constructor(private eventsService: EventsService) {}

  ngOnInit(): void {}

  toggleSubjectViewer() {
    if (this.event && this.event.course) {
      this.selectedCourse = this.event.course; // Asume que event.course es del tipo Course
      this.showSubjectViewer = true;
    }
  }

  closeDialog() {
    this.close.emit();
  }

  deleteEvent() {
    const confirmation = window.confirm("¿Estás seguro de que quieres borrar este evento?");
    if (confirmation && this.event?.id) {
      this.eventsService.deleteEvent(this.event.id).then(() => {
        this.closeDialog();
      }).catch((error: any) => {
        window.alert('Hubo un error al borrar el evento. Por favor, intenta nuevamente.');
      });
    }
  }

  editEvent() {
  }
}
