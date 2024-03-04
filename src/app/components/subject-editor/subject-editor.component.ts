import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import Course from '../../interfaces/course.interface';
import { CourseService } from '../../services/course.service';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-subject-editor',
  templateUrl: './subject-editor.component.html',
  styleUrls: ['./subject-editor.component.css'],
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
export class SubjectEditorComponent implements OnInit {
  @Input() course: Course | null = null;
  @Output() close = new EventEmitter<void>();
  courseForm: FormGroup;

  constructor(private fb: FormBuilder, private courseService: CourseService) {
    this.courseForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      professors: this.fb.array([])
    });
  }

  ngOnInit(): void {
    if (this.course) {
      this.courseForm.patchValue({
        name: this.course.name,
        description: this.course.description,
      });
    }
  }

  get professors(): FormArray {
    return this.courseForm.get('professors') as FormArray;
  }

  addProfessor(): void {
  }

  editProfessor(index: number): void {
  }

  removeProfessor(index: number): void {
    this.professors.removeAt(index);
  }

  saveCourse(): void {
    if (this.courseForm.valid && this.course) {
      const updatedCourseData = {
        name: this.courseForm.value.name,
        description: this.courseForm.value.description,
      };

      this.courseService.updateCourse(this.course.id!, updatedCourseData).then(() => {
        this.closeDialog();
      }).catch((error: any) => {
        window.alert("Error al actualizar el curso. Por favor, inténtalo de nuevo.");
      });
    } else {
      window.alert("No es posible dejar a una asignatura sin nombre. Por favor, introduzca un nombre para la misma.");
    }
  }

  closeDialog(): void {
    this.close.emit();
  }
}
