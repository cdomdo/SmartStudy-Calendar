import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { animate, style, transition, trigger } from '@angular/animations';
import { CourseService } from '../../services/course.service';
import { EventsService } from '../../services/event.service';
import { Firestore, Timestamp } from '@angular/fire/firestore';
import Course from '../../interfaces/course.interface';

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
  eventForm!: FormGroup;
  courses: Course[] = [];
  showSubjectManager: boolean = false;
  isLoadingCourses: boolean = true;

  @Output() eventCreated = new EventEmitter<any>();
  @Output() close = new EventEmitter<void>();

  constructor(
    private fb: FormBuilder,
    private courseService: CourseService,
    private eventsService: EventsService,
    private firestore: Firestore
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadCourses();
  }

  initializeForm(): void {
    this.eventForm = this.fb.group({
      name: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
      course: [this.courses.length > 0 ? this.courses[0].id : '', Validators.required], // Establece un valor predeterminado para 'course'
      description: ['']
    });
  }

  loadCourses(): void {
    this.isLoadingCourses = true;
    this.courseService.getAllCourses().subscribe(courses => {
      this.courses = courses;
      this.initializeForm(); // Inicializa el formulario después de cargar los cursos
      this.isLoadingCourses = false;
    }, () => {
      this.isLoadingCourses = false; // Maneja el caso de error
    });
  }

  createEvent(): void {
    if (this.eventForm.valid) {
      const formValue = this.eventForm.value;
      const eventDateTime = Timestamp.fromDate(new Date(`${formValue.date}T${formValue.time}`));
      const courseRef = this.courseService.createRefToCourse(formValue.course);

      const newEvent = {
        name: formValue.name,
        date: eventDateTime,
        description: formValue.description,
        courseRef: courseRef
      };

      this.eventsService.addEvent(newEvent).then(() => {
        this.eventCreated.emit(newEvent);
        this.eventForm.reset();
        this.closeDialog();
      }).catch((error: any) => {
        console.error('Error creating event:', error);
        window.alert('Hubo un error al crear el evento. Por favor, intenta nuevamente.');
      });
    } else {
      window.alert('Por favor, completa todos los campos requeridos.');
    }
  }



  manageSubjects(): void {
    this.showSubjectManager = true;
  }

  closeSubjectManager(): void {
    this.showSubjectManager = false;
    this.loadCourses();
  }

  openDialog(): void {
    this.initializeForm();
    this.loadCourses();
    this.showSubjectManager = true;
  }

  closeDialog(): void {
    this.showSubjectManager = false;
    this.close.emit();
  }
}
