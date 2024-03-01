import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Timestamp } from '@angular/fire/firestore';
import { animate, style, transition, trigger } from "@angular/animations";
import { CourseService } from "../../services/course.service";
import Course from "../../interfaces/course.interface";

@Component({
  selector: 'app-event-creator',
  templateUrl: './event-creator.component.html',
  styleUrls: ['./event-creator.component.css'],
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
export class EventCreatorComponent implements OnInit {
  eventForm: FormGroup;
  courses: Course[] = [];
  showSubjectManager: boolean = false;


  @Output() eventCreated = new EventEmitter<any>();
  @Output() close = new EventEmitter<void>();

  constructor(private fb: FormBuilder, private courseService: CourseService) {
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
  }

  loadCourses(): void {
    this.courseService.getAllCourses().subscribe(courses => {
      this.courses = courses;
    });
  }

  createEvent(): void {
    if (this.eventForm.valid) {
      const formValue = this.eventForm.value;
      const eventDateTime = Timestamp.fromDate(new Date(`${formValue.date}T${formValue.time}`));
      const newEvent = {
        ...formValue,
        date: {
          seconds: eventDateTime.seconds,
          nanoseconds: eventDateTime.nanoseconds
        },
      };
      this.eventCreated.emit(newEvent);
      this.eventForm.reset();
      this.closeDialog();
    } else {
      window.alert('No es posible crear un evento sin completar los campos obligatorios.');
    }
  }

// Método para abrir el diálogo
  manageSubjects(): void {
    this.showSubjectManager = true;
  }

// Método para cerrar el diálogo
  closeSubjectManager(): void {
    this.showSubjectManager = false;
  }

  closeDialog(): void {
    this.close.emit();
  }
}
