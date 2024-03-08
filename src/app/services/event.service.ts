import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  docData,
  deleteDoc,
  updateDoc,
  addDoc
} from '@angular/fire/firestore';
import { Observable, combineLatest, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import  Event  from '../interfaces/event.interface';
import  Course  from '../interfaces/course.interface';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  constructor(private firestore: Firestore) {}

  getEventsWithCourse(): Observable<(Event & { course?: Course })[]> {
    const eventsRef = collection(this.firestore, 'events');
    return (collectionData(eventsRef, { idField: 'id' }) as Observable<Event[]>).pipe(
      switchMap((events: Event[]) => {
        if (events.length === 0) {
          return of([]);
        }
        const eventsWithCourses$ = events.map(event => {
          if (!event.courseRef) {
            return of({...event});
          }
          return docData(event.courseRef).pipe(
            map((course: any) => {
              const courseData: Course = course as Course;
              return {
                ...event,
                course: courseData // Añade el curso recuperado al evento
              };
            })
          );
        });
        return combineLatest(eventsWithCourses$);
      })
    );
  }

  modifyEvent(eventId: string, eventData: Partial<Event>): Promise<void> {
    const eventRef = doc(this.firestore, 'events', eventId);
    return updateDoc(eventRef, eventData);
  }

  addEvent(eventData: Event): Promise<void> {
    const eventsRef = collection(this.firestore, 'events');
    return addDoc(eventsRef, eventData).then(docRef => {
      const eventDocRef = doc(this.firestore, 'events', docRef.id);
      return updateDoc(eventDocRef, { id: docRef.id });
    }).catch(error => {
      throw new Error("Error al crear el evento");
    });
  }

  deleteEvent(eventId: string): Promise<void> {
    const eventRef = doc(this.firestore, 'events', eventId);
    return deleteDoc(eventRef);
  }
}
