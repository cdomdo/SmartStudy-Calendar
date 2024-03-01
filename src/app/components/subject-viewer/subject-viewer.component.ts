import { Component, OnInit } from '@angular/core';

interface Professor {
  id: string;
  name: string;
  email: string;
}

interface DocumentReference<T> {
  id: string;
}

interface Course {
  id: string;
  name: string;
  professorsRefs: DocumentReference<Professor>[];
  description: string;
}

@Component({
  selector: 'app-subject-viewer',
  templateUrl: './subject-viewer.component.html',
  styleUrls: ['./subject-viewer.component.css']
})
export class SubjectViewerComponent implements OnInit {
  selectedCourse?: Course;
  professors: Professor[] = [
    { id: 'prof1', name: 'Profesor Uno', email: 'prof1@example.com' },
    { id: 'prof2', name: 'Profesor Dos', email: 'prof2@example.com' },
    { id: 'prof3', name: 'Profesor Tres', email: 'prof3@example.com' }
  ];

  constructor() {}

  ngOnInit(): void {
    this.selectedCourse = {
      id: '1',
      name: 'Curso 1',
      description: 'Descripción del Curso 1',
      professorsRefs: [{id: 'prof1'}, {id: 'prof2'}]
    };
  }

  getProfessorName(profRef: DocumentReference<Professor>): string {
    const professor = this.professors.find(prof => prof.id === profRef.id);
    return professor ? professor.name : 'Desconocido';
  }

  getProfessorEmail(profId: string): string {
    const professor = this.professors.find(prof => prof.id === profId);
    return professor ? professor.email : 'Desconocido';
  }

  closeDialog() {
  }
}
