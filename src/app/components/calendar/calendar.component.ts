import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsService } from "../../services/event.service";
import Event from "../../interfaces/event.interface";
import { FormsModule } from "@angular/forms";
import { Timestamp } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})

export class CalendarComponent implements OnInit {
  weeks: (Timestamp | null)[][] = [];
  weekDays: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  currentMonth: Timestamp = Timestamp.fromDate(new Date()); // Inicializa con Timestamp
  today: Timestamp = Timestamp.now(); // Utiliza Timestamp para 'today'
  monthTransition: string = '';
  events: Event[] = [];
  selectedEventIndex: number = -1;
  modifiedEvent: Event = { date: Timestamp.now(), name: '', course: '' };
  private eventsSub!: Subscription; // Para manejar la suscripción

  constructor(private eventsService: EventsService) { }

  ngOnInit(): void {
    this.generateCalendar();
    this.loadEvents();
  }

  ngOnDestroy(): void {
    if (this.eventsSub) {
      this.eventsSub.unsubscribe(); // Limpia la suscripción
    }
  }

  loadEvents(): void {
    this.eventsSub = this.eventsService.getEvents().subscribe(events => {
      this.events = events.map(event => {
        // Asegura que las fechas se manejen como Timestamps si no lo son
        event.date = event.date instanceof Timestamp ? event.date : Timestamp.fromDate(new Date(event.date));
        return event;
      });
    });
  }

  isSameDay(date1: Timestamp, date2: Timestamp): boolean {
    // Compara fechas utilizando Timestamp
    return date1.toDate().toDateString() === date2.toDate().toDateString();
  }

  generateCalendar(): void {
    const year = this.currentMonth.toDate().getFullYear();
    const month = this.currentMonth.toDate().getMonth();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const dates: (Timestamp | null)[] = Array(firstDayOfMonth).fill(null);
    for (let i = 1; i <= daysInMonth; i++) {
      dates.push(Timestamp.fromDate(new Date(year, month, i)));
    }

    while (dates.length % 7 !== 0) {
      dates.push(null);
    }

    this.weeks = [];
    for (let i = 0; i < dates.length; i += 7) {
      this.weeks.push(dates.slice(i, i + 7));
    }
  }

  changeMonth(delta: number): void {
    const newMonthDate = this.currentMonth.toDate();
    newMonthDate.setMonth(newMonthDate.getMonth() + delta);
    this.currentMonth = Timestamp.fromDate(newMonthDate);

    this.monthTransition = 'fade-out';
    setTimeout(() => {
      this.generateCalendar();
      this.monthTransition = 'fade-in';
      setTimeout(() => {
        this.monthTransition = '';
      }, 500);
    }, 500);
  }

  isToday(date: Timestamp | null): boolean {
    if (!date) return false;
    return date.toDate().toDateString() === this.today.toDate().toDateString();
  }

  selectEvent(index: number): void {
    this.selectedEventIndex = index;
    this.modifiedEvent = { ...this.events[index] };
  }
}
