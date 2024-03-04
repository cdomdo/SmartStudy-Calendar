import { Component, Input, OnInit } from '@angular/core';

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
  @Input() selectedCourse?: Course; // Ahora acepta un curso como entrada
  professors: Professor[] = [
    { id: 'prof1', name: 'Profesor Uno', email: 'prof1@example.com' },
    { id: 'prof2', name: 'Profesor Dos', email: 'prof2@example.com' },
    { id: 'prof3', name: 'Profesor Tres', email: 'prof3@example.com' }
  ];

  ngOnInit(): void {}

  getProfessorName(profRef: DocumentReference<Professor>): string {
    const professor = this.professors.find(prof => prof.id === profRef.id);
    return professor ? professor.name : 'Desconocido';
  }

  getProfessorEmail(profId: string): string {
    const professor = this.professors.find(prof => prof.id === profId);
    return professor ? professor.email : 'Desconocido';
  }

  closeDialog() {
    // Implementa la lógica para cerrar este componente, por ejemplo, emitiendo un evento o cambiando una variable booleana en el componente padre
  }
}
