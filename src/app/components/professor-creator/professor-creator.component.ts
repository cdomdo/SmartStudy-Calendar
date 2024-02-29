import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Professor from '../../interfaces/professor.interface'; // Ajusta la ruta según sea necesario

@Component({
  selector: 'app-professor-creator',
  templateUrl: './professor-creator.component.html',
  styleUrls: ['./professor-creator.component.css']
})
export class ProfessorCreatorComponent implements OnInit {
  professorForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.professorForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
  }

  saveProfessor(): void {
    if (this.professorForm.valid) {
      const newProfessor: Professor = this.professorForm.value;
      console.log('New Professor:', newProfessor);
      // Aquí iría la lógica para guardar el nuevo profesor en tu base de datos o servicio
    }
  }

  closeDialog() {

  }
}
