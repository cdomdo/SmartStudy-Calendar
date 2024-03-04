import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import Professor from "../../interfaces/professor.interface";
import Course from "../../interfaces/course.interface";
import { DocumentReference } from "@angular/fire/firestore";

@Component({
  selector: 'app-subject-viewer',
  templateUrl: './subject-viewer.component.html',
  styleUrls: ['./subject-viewer.component.css'],
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
export class SubjectViewerComponent implements OnInit {
  @Input() selectedCourse?: Course;
  @Output() close = new EventEmitter<void>();

  professors: Professor[] = [];

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
    this.close.emit();
  }
}
