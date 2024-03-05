import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Timestamp, DocumentReference } from '@angular/fire/firestore';
import { CourseService } from '../../services/course.service';
import { EventsService } from '../../services/event.service';
import Event from '../../interfaces/event.interface';
import Course from '../../interfaces/course.interface';
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-event-editor',
  templateUrl: './event-editor.component.html',
  styleUrls: ['./event-editor.component.css'],
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

export class EventEditorComponent implements OnInit {
  @Input() event?: Event; // Hacer que event sea opcional
  @Output() eventUpdated = new EventEmitter<Event>();
  @Output() closeEditor = new EventEmitter<void>(); // Agregado para manejar el cierre del editor
  eventForm: FormGroup;
  courses: Course[] = [];

  constructor(
    private fb: FormBuilder,
    private courseService: CourseService,
    private eventsService: EventsService
  ) {
    this.eventForm = this.fb.group({
      name: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
      course: ['', Validators.required],
      description: ['']
    });
  }

  ngOnInit(): void {
    this.loadCourses();
    if (this.event) {
      this.initializeFormWithEventData();
    }
  }

  loadCourses(): void {
    this.courseService.getAllCourses().subscribe(courses => {
      this.courses = courses;
    });
  }

  initializeFormWithEventData(): void {
    if (!this.event) return; // Asegurar que event no es undefined

    const dateTime = this.event.date.toDate();
    const date = dateTime.toISOString().split('T')[0];
    const time = dateTime.toTimeString().split(' ')[0].substring(0, 5);

    this.eventForm.patchValue({
      name: this.event.name,
      date: date,
      time: time,
      course: this.event.courseRef?.id,
      description: this.event.description
    });
  }

  updateEvent(): void {
    if (this.eventForm.valid && this.event?.id) {
      const formValue = this.eventForm.value;
      const eventDateTime = Timestamp.fromDate(new Date(`${formValue.date}T${formValue.time}`));
      const updatedEvent: Partial<Event> = {
        name: formValue.name,
        date: eventDateTime,
        description: formValue.description,
        courseRef: this.courseService.createRefToCourse(formValue.course)
      };
      this.eventsService.modifyEvent(this.event.id, updatedEvent).then(() => {
        this.eventUpdated.emit({...this.event, ...updatedEvent} as Event);
        this.closeDialog();
      }).catch(error => {
        console.error('Error al actualizar el evento:', error);
        window.alert('Hubo un error al actualizar el evento. Por favor, intenta nuevamente.');
      });
    } else {
      window.alert('Por favor, completa todos los campos requeridos.');
    }
  }

  closeDialog(): void {
    this.closeEditor.emit(); // Emitir un evento para indicar que el diálogo debe cerrarse
  }
}
