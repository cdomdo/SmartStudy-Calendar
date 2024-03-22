import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CourseService } from '../../services/course.service';
import Course from '../../interfaces/course.interface';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-subject-creator',
  templateUrl: './subject-creator.component.html',
  styleUrls: ['./subject-creator.component.css'],
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
export class SubjectCreatorComponent implements OnInit {
  courseForm!: FormGroup;
  @Output() close = new EventEmitter<void>();

  constructor(private fb: FormBuilder, private courseService: CourseService) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.courseForm = this.fb.group({
      name: ['', Validators.required],
      description: ['']
    });
  }

  createCourse(): void {
    if (this.courseForm.valid && this.courseForm.value.name.trim()) {
      const courseName = this.courseForm.value.name.trim();
      // Buscar si ya existe un curso con el mismo nombre
      this.courseService.findCourseByName(courseName).subscribe((courses) => {
        if (courses && courses.length > 0) {
          // Si se encuentra un curso con el mismo nombre, mostrar una alerta y detener la creación
          alert('Ya existe un curso con este nombre. Por favor, elige un nombre diferente.');
        } else {
          // Si no se encuentra, proceder a crear el nuevo curso
          const course: Course = this.courseForm.value;
          this.courseService.addCourse(course).then(() => {
            this.closeDialog();
          }).catch((e) => {
            alert('Hubo un error al crear el curso. Por favor, intenta nuevamente.');
          });
        }
      });
    } else {
      alert('El nombre del curso es obligatorio y no puede estar vacío.');
    }
  }

  closeDialog(): void {
    this.close.emit();
  }
}
