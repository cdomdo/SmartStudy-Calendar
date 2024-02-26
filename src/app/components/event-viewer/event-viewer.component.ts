import { Component, OnInit } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore'; // O 'firebase/firestore', ajusta según tu importación
import Event from "../../interfaces/event.interface";
import Course from "../../interfaces/course.interface";

@Component({
  selector: 'app-event-viewer',
  templateUrl: './event-viewer.component.html',
  styleUrls: ['./event-viewer.component.css']
})
export class EventViewerComponent implements OnInit {
  event: Event = {
    name: 'Evento de Prueba',
    date: Timestamp.fromDate(new Date()), // Usa la fecha actual para el ejemplo
    description: 'Esta es una descripción de prueba del evento.',
    course: {
      name: 'Curso de Prueba',
      description: 'Descripción del curso de prueba.'
      // Añade más campos si son necesarios
    }
  };

  constructor() { }
  ngOnInit(): void {
  }

  closeDialog() {
  }

  editEvent() {
    // Lógica para editar el evento
  }

  deleteEvent() {
    const confirmation = window.confirm("¿Estás seguro de que quieres borrar este evento?");
    if (confirmation) {
    }
  }

}
