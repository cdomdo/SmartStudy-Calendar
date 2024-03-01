import {Component, OnInit, signal} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Professor from '../../interfaces/professor.interface'; // Ajusta la ruta según sea necesario

@Component({
  selector: 'app-professor-manager',
  templateUrl: './professor-manager.component.html',
  styleUrls: ['./professor-manager.component.css']
})
export class ProfessorManagerComponent implements OnInit {
  professors: Professor[] = []; // Array para almacenar los profesores
  selectedProfessorIndex: number | null = null; // Para rastrear el profesor seleccionado

  constructor() { }

  ngOnInit(): void {
    this.loadProfessors();
  }

  loadProfessors(): void {
    // Cargar profesores dummy o desde una base de datos
    this.professors = [
      { id: '1', name: 'John Doe', email: 'john.doe@example.com' },
      { id: '2', name: 'Jane Doe', email: 'jane.doe@example.com' },
      // Añade más profesores dummy según sea necesario
    ];
  }

  selectProfessor(index: number): void {
    this.selectedProfessorIndex = index;
  }

  // Añadir, editar y eliminar profesores según la lógica de tu aplicación
  editProfessor = signal<any | null>(null);
  deleteProfessor = signal<any | null>(null);
  addProfessor = signal<any | null>(null);
  closeDialog = signal<any | null>(null);
}
