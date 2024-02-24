import { Injectable } from '@angular/core';
import {Firestore, docData, DocumentReference} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import  Course  from '../interfaces/course.interface';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  constructor(private firestore: Firestore) {}

  // Returns a Course object from a database reference
  getCourseFromReference(courseRef: DocumentReference<Course>): Observable<Course> {
    return docData(courseRef, { idField: 'id' }) as Observable<Course>;
  }
}
