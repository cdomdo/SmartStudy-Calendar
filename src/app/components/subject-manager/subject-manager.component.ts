import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { CourseService } from '../../services/course.service';
import Course from '../../interfaces/course.interface';

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
        animate('200ms ease-in', style({ opacity: 0, transform: 'scale(0.9)' })),
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
    if (this.selectedCourse === null) {
      alert('No course selected for deletion.'); // Simple user feedback
      return;
    }
    // Confirm deletion with the user
    const confirmDeletion = confirm('Are you sure you want to delete this course?');
    if (!confirmDeletion) {
      return;
    }
    this.courseService.deleteCourse(this.selectedCourse.id).then(() => {
      this.courses = this.courses.filter(course => course.id !== this.selectedCourse?.id);
      this.selectedCourse = null; // Reset the selected course after deleting
      alert('Course successfully deleted.'); // Simple user feedback
    }).catch(error => {
      console.error('Error deleting course:', error);
      alert('Failed to delete the course.'); // Simple user feedback
    });
  }

  editSelectedCourse(): void {
    if (this.selectedCourse === null) {
      alert('No course selected for editing.'); // Simple user feedback
      return;
    }
    this.showEditor = true;
  }

  createCourse(): void {
    // Here you would implement functionality to create a new course
  }

  closeEditor(): void {
    this.showEditor = false;
    // Optionally, reload courses in case changes were made
    this.loadCourses();
  }

  closeDialog(): void {
    this.showEditor = false;
    this.close.emit();
  }
}
