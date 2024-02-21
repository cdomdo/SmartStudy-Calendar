import { Injectable } from '@angular/core';
import Event from '../interfaces/event.interface';
import { Observable } from "rxjs";
import { Firestore, collection, addDoc, collectionData, deleteDoc, doc, setDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private firestore: Firestore) { }

  addEvent(event: Event) {
    const eventsRef = collection(this.firestore, 'events');
    return addDoc(eventsRef, event);
  }

  getEvents(): Observable<Event[]> {
    const eventsRef = collection(this.firestore, 'events');
    return collectionData(eventsRef, { idField: 'id' }) as Observable<Event[]>;
  }

  deleteEvent(event: Event) {
    const eventsRef = doc(this.firestore, `events/${event.id}`);
    return deleteDoc(eventsRef);
  }

  updateEvent(event: Event) {
    const eventsRef = doc(this.firestore, `events/${event.id}`);
    return setDoc(eventsRef, event);
  }
}
