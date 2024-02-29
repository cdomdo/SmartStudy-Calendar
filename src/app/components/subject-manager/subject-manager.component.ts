import { Component, OnInit } from '@angular/core';
import Course from '../../interfaces/course.interface'

@Component({
  selector: 'app-subject-manager',
  templateUrl: './subject-manager.component.html',
  styleUrls: ['./subject-manager.component.css']
})
export class SubjectManagerComponent implements OnInit {
  courses: Course[] = [
    { id: '1', name: 'Curso 1', description: 'Descripción del Curso 1' },
    { id: '2', name: 'Curso 2', description: 'Descripción del Curso 2' },
    { id: '3', name: 'Curso 3', description: 'Descripción del Curso 3' },
    { id: '4', name: 'Curso 4', description: 'Descripción del Curso 4' },
    { id: '5', name: 'Curso 5', description: 'Descripción del Curso 5' },
    { id: '6', name: 'Curso 6', description: 'Descripción del Curso 6' },
    { id: '7', name: 'Curso 7', description: 'Descripción del Curso 7' },
    { id: '8', name: 'Curso 8', description: 'Descripción del Curso 8' },
    { id: '9', name: 'Curso 9', description: 'Descripción del Curso 9' },
    { id: '10', name: 'Curso 10', description: 'Descripción del Curso 10' }
  ];
  selectedCourse?: Course;

  constructor() {}

  ngOnInit(): void {}

  selectCourse(course: Course): void {
    this.selectedCourse = course;
  }

  deleteSelectedCourse(): void {
    if (!this.selectedCourse || !this.selectedCourse.id) {
      console.error('No hay un curso seleccionado para eliminar.');
      return;
    }
    this.courses = this.courses.filter(course => course.id !== this.selectedCourse?.id);
    this.selectedCourse = undefined; // Resetea el curso seleccionado después de eliminarlo
  }

  editSelectedCourse(): void {
    // Aquí iría la lógica para editar el curso seleccionado
  }

  createCourse(): void {
    // Lógica para crear un nuevo curso
  }

  closeDialog(): void {
    // Implementa la lógica para cerrar este componente/diálogo, por ejemplo, ocultándolo o cambiando una variable de estado.
    console.log('Diálogo cerrado');
  }

}
