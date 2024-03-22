import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  docData,
  deleteDoc,
  updateDoc,
  addDoc, DocumentReference
} from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';
import {combineLatest, Observable, of} from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import Event from '../interfaces/event.interface';
import Course from '../interfaces/course.interface';
import firebase from "firebase/compat";
import DocumentData = firebase.firestore.DocumentData;

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  constructor(private firestore: Firestore, private auth: Auth) {}

  private getUserId(): string {
    return this.auth.currentUser?.uid ?? '';
  }

  getEventsWithCourse(): Observable<(Event & { course?: Course })[]> {
    const userId = this.getUserId();
    const eventsRef = collection(this.firestore, `users/${userId}/events`);
    return (collectionData(eventsRef, { idField: 'id' }) as Observable<Event[]>).pipe(
      switchMap((events: Event[]) => {
        if (events.length === 0) {
          return of([]);
        }
        const eventsWithCourses$ = events.map(event => {
          if (!event.courseRef) {
            return of({...event});
          }
          return docData(event.courseRef, { idField: 'id' }).pipe(
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

  addEvent(eventData: Event): Promise<DocumentReference<DocumentData, DocumentData>> {
    const userId = this.getUserId();
    const eventsRef = collection(this.firestore, `users/${userId}/events`);
    return addDoc(eventsRef, eventData);
  }

  modifyEvent(eventId: string, eventData: Partial<Event>): Promise<void> {
    const userId = this.getUserId();
    const eventRef = doc(this.firestore, `users/${userId}/events`, eventId);
    return updateDoc(eventRef, eventData);
  }

  deleteEvent(eventId: string): Promise<void> {
    const userId = this.getUserId();
    const eventRef = doc(this.firestore, `users/${userId}/events`, eventId);
    return deleteDoc(eventRef);
  }
}
