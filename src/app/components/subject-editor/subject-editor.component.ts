import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import Course from '../../interfaces/course.interface';
import Professor from '../../interfaces/professor.interface';

@Component({
  selector: 'app-subject-editor',
  templateUrl: './subject-editor.component.html',
  styleUrls: ['./subject-editor.component.css']
})
export class SubjectEditorComponent implements OnInit {
  courseForm: FormGroup;
  selectedProfessorIndex: number | null = null;

  constructor(private fb: FormBuilder) {
    this.courseForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      professors: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.initializeFormWithDummyData();
  }

  initializeFormWithDummyData(): void {
    // Datos dummy para el curso, incluyendo profesores
    const dummyProfessors: Professor[] = [
      { id: 'prof1', name: 'Profesor Uno', email: 'prof1@example.com' },
      { id: 'prof2', name: 'Profesor Dos', email: 'prof2@example.com' },
      { id: 'prof3', name: 'Profesor Tres', email: 'prof3@example.com' }
    ];

    // Inicializar el formulario con datos de curso y profesores dummy
    this.courseForm.patchValue({
      name: 'Curso de Ejemplo',
      description: 'Este es un curso de ejemplo con profesores dummy.'
    });

    dummyProfessors.forEach(professor => {
      this.addProfessor(professor);
    });
  }

  get professors(): FormArray {
    return this.courseForm.get('professors') as FormArray;
  }

  addProfessor(professor?: Professor): void {
    const professorGroup = this.fb.group({
      id: [professor?.id || ''],
      name: [professor?.name || '', Validators.required],
      email: [professor?.email || '', [Validators.required, Validators.email]]
    });
    this.professors.push(professorGroup);
  }

  removeProfessor(): void {
    if (this.selectedProfessorIndex !== null) {
      this.professors.removeAt(this.selectedProfessorIndex);
      this.selectedProfessorIndex = null; // Reset the selection
    }
  }

  editProfessor(): void {
    if (this.selectedProfessorIndex !== null) {
      // Lógica para editar el profesor seleccionado
      // Esto podría implicar abrir un diálogo de edición o una forma similar
      console.log('Editing professor at index:', this.selectedProfessorIndex);
    }
  }

  selectProfessor(index: number): void {
    this.selectedProfessorIndex = index;
  }

  saveCourse(): void {
    if (this.courseForm.valid) {
      console.log('Course data:', this.courseForm.value);
      // Implement the save logic here
    }
  }

  closeDialog(): void {
    // Logic to close the dialog
    console.log('Closing dialog');
  }
}
