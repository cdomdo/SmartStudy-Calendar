import { Component, EventEmitter, Output } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import Event from '../../interfaces/event.interface';
import Course from '../../interfaces/course.interface';
import {animate, style, transition, trigger} from "@angular/animations";

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
  @Output() close = new EventEmitter<void>();

  currentDate: Timestamp = Timestamp.now();

  events: Event[] = [
    {
      id: '1',
      name: 'Examen de Matemáticas',
      date: Timestamp.fromDate(new Date()),
      course: { id: 'math101', name: 'Matemáticas', description: '', professorsRefs: [] }
    },
    {
      id: '2',
      name: 'Reunión de equipo',
      date: Timestamp.fromDate(new Date()),
      course: { id: 'team_meeting', name: 'Equipo', description: '', professorsRefs: [] }
    },
    {
      id: '3',
      name: 'Presentación de proyecto',
      date: Timestamp.fromDate(new Date()),
      course: { id: 'project101', name: 'Proyecto', description: '', professorsRefs: [] }
    },
    {
      id: '4',
      name: 'Entrega de tarea',
      date: Timestamp.fromDate(new Date()),
      course: { id: 'homework_delivery', name: 'Tarea', description: '', professorsRefs: [] }
    },
    {
      id: '5',
      name: 'Conferencia sobre tecnología',
      date: Timestamp.fromDate(new Date()),
      course: { id: 'tech_conference', name: 'Tecnología', description: '', professorsRefs: [] }
    },
    {
      id: '6',
      name: 'Sesión de entrenamiento',
      date: Timestamp.fromDate(new Date()),
      course: { id: 'training_session', name: 'Entrenamiento', description: '', professorsRefs: [] }
    },
    {
      id: '7',
      name: 'Entrevista de trabajo',
      date: Timestamp.fromDate(new Date()),
      course: { id: 'job_interview', name: 'Entrevista', description: '', professorsRefs: [] }
    },
    {
      id: '8',
      name: 'Clase de programación',
      date: Timestamp.fromDate(new Date()),
      course: { id: 'programming_class', name: 'Programación', description: '', professorsRefs: [] }
    },
    {
      id: '9',
      name: 'Reunión con clientes',
      date: Timestamp.fromDate(new Date()),
      course: { id: 'client_meeting', name: 'Clientes', description: '', professorsRefs: [] }
    },
    {
      id: '10',
      name: 'Sesión de tutoría',
      date: Timestamp.fromDate(new Date()),
      course: { id: 'tutoring_session', name: 'Tutoría', description: '', professorsRefs: [] }
    }
  ];

  closeDialog() {
    this.close.emit();
  }
}
