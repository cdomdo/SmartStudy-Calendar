import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Timestamp } from '@angular/fire/firestore';

interface Course {
  id: string;
  name: string;
  description: string;
}

@Component({
  selector: 'app-event-creator',
  templateUrl: './event-creator.component.html',
  styleUrls: ['./event-creator.component.css']
})
export class EventCreatorComponent implements OnInit {
  eventForm: FormGroup;
  courses: Course[] = [
    { id: '1', name: 'Curso 1', description: 'Descripción del Curso 1' },
    { id: '2', name: 'Curso 2', description: 'Descripción del Curso 2' },
    { id: '3', name: 'Curso 3', description: 'Descripción del Curso 3' }
  ];

  @Output() eventCreated = new EventEmitter<any>();

  constructor(private fb: FormBuilder) {
    this.eventForm = this.fb.group({
      name: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
      course: ['', Validators.required],
      description: ['']
    });
  }

  ngOnInit(): void {}

  createEvent(): void {
    if (this.eventForm.valid) {
      const formValue = this.eventForm.value;
      const eventDateTime = new Date(`${formValue.date}T${formValue.time}`);
      const newEvent = {
        ...formValue,
        date: Timestamp.fromDate(eventDateTime),
        // Suponiendo que "course" es el ID del curso, así que ajusta según sea necesario
      };
      this.eventCreated.emit(newEvent);
      this.eventForm.reset();
    }
  }

  closeDialog(): void {
    // Implementa la lógica para cerrar el diálogo aquí
  }

manageSubjects(): void {
    // Implementa la lógica para gestionar las asignaturas aquí
    console.log('Gestionar asignaturas');
  }

  // Implementa esta función según tu lógica de aplicación
  findCourseRef(courseId: string): any {
    // Placeholder para la función que encuentra la referencia del curso
    return null;
  }
}
