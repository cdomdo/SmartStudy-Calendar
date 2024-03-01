import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Course from '../../interfaces/course.interface';

@Component({
  selector: 'app-subject-editor',
  templateUrl: './subject-editor.component.html',
  styleUrls: ['./subject-editor.component.css']
})
export class SubjectEditorComponent implements OnInit {
  @Input() course: Course | null = null;
  @Output() close = new EventEmitter<void>();
  courseForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.courseForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      // Add other fields as needed
    });
  }

  ngOnInit(): void {
    if (this.course) {
      this.courseForm.patchValue({
        name: this.course.name,
        description: this.course.description,
        // Populate other fields as necessary
      });
    }
  }

  saveCourse(): void {
    // Logic to save the course
    console.log('Course data:', this.courseForm.value);
    // Implement saving logic here, possibly emitting an event when done
    this.close.emit(); // Close the editor after saving
  }

  closeDialog(): void {
    this.close.emit();
  }
}
