import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CourseService } from '../../services/course.service';
import Course from '../../interfaces/course.interface';
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-subject-manager',
  templateUrl: './subject-manager.component.html',
  styleUrls: ['./subject-manager.component.css'],
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

export class SubjectManagerComponent implements OnInit {
  courses: Course[] = [];
  selectedCourse: Course | null = null;
  showEditor: boolean = false;

  @Output() close = new EventEmitter<void>();

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {
    this.courseService.getAllCourses().subscribe(courses => {
      this.courses = courses;
    });
  }

  selectCourse(course: Course): void {
    this.selectedCourse = course;
  }

  deleteSelectedCourse(): void {
    if (!this.selectedCourse || typeof this.selectedCourse.id === 'undefined') {
      alert('No course selected for deletion.');
      return;
    }
    const confirmDeletion = confirm('¿Estás seguro de que quieres borrar esta asignatura?');
    if (!confirmDeletion) {
      return;
    }
    this.courseService.deleteCourse(this.selectedCourse.id).then(() => {
      this.courses = this.courses.filter(course => course.id !== this.selectedCourse?.id);
      this.selectedCourse = null;
    }).catch(error => {
      alert('Failed to delete the course.');
    });
  }

  editSelectedCourse(): void {
    this.showEditor = true;
  }

  createCourse(): void {
    // Implementa la lógica para crear un nuevo curso
  }

  closeEditor(): void {
    this.showEditor = false;
    this.loadCourses(); // Recargar los cursos después de cerrar el editor
  }

  closeDialog(): void {
    this.showEditor = false;
    this.close.emit();
  }
}
