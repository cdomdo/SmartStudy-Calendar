import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CourseService } from '../../services/course.service';
import Course from '../../interfaces/course.interface';
import { animate, style, transition, trigger } from '@angular/animations';

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
  showCreator: boolean = false;

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

  editSelectedCourse(event: MouseEvent, course: Course): void {
    event.stopPropagation();
    this.selectedCourse = course;
    this.showEditor = true;
  }

  deleteSelectedCourse(event: MouseEvent, course: Course): void {
    event.stopPropagation();
    if (typeof course.id === 'undefined') {
      alert('El curso no tiene un ID válido.');
      return;
    }

    const confirmDeletion = confirm('¿Estás seguro de que quieres borrar esta asignatura?');
    if (!confirmDeletion) {
      return;
    }

    this.courseService.deleteCourse(course.id).then(() => {
      this.courses = this.courses.filter(c => c.id !== course.id);
      this.selectedCourse = null;
    }).catch(error => {
      alert('Failed to delete the course.');
    });
  }

  createCourse(): void {
    this.showCreator = true;
  }

  closeCreator(): void {
    this.showCreator = false;
    this.loadCourses();
  }

  closeEditor(): void {
    this.showEditor = false;
    this.loadCourses();
  }

  closeDialog(): void {
    this.showEditor = false;
    this.close.emit();
  }
}
