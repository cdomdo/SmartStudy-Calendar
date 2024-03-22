import { Component } from '@angular/core';
import Task from '../../interfaces/task.interface'; // Asegúrate de que la ruta sea correcta

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent {
  tasks: Task[] = [];
  newTaskTitle: string = '';

  addTask(title: string): void {
    if (!title.trim()) return;
    // Asegura que 'description' es opcional; si no lo usas, no es necesario incluirlo
    const newTask: Task = {
      id: `task-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      title, // 'description' es opcional, omítelo si no lo necesitas
    };
    this.tasks.push(newTask);
    this.newTaskTitle = '';
  }

  removeTask(id: string | undefined): void {
    this.tasks = this.tasks.filter(task => task.id !== id);
  }
}
