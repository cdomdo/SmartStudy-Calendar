import { Injectable } from '@angular/core';
import {
  Firestore,
  docData,
  DocumentReference,
  collectionData,
  collection,
  deleteDoc,
  doc, updateDoc, addDoc, query, where, getDocs
} from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth'; // Importa Auth para obtener el usuario autenticado
import { from, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import Course from '../interfaces/course.interface';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  constructor(private firestore: Firestore, private auth: Auth) {}

  private get userId(): string {
    return this.auth.currentUser?.uid ?? '';
  }

  getCourseFromReference(courseRef: DocumentReference<Course>): Observable<Course> {
    return docData(courseRef, { idField: 'id' }) as Observable<Course>;
  }

  getAllCourses(): Observable<Course[]> {
    const userCoursesCollectionRef = collection(this.firestore, `users/${this.userId}/courses`);
    return collectionData(userCoursesCollectionRef, { idField: 'id' }) as Observable<Course[]>;
  }

  async addCourse(newCourse: Course): Promise<void> {
    const userCoursesCollectionRef = collection(this.firestore, `users/${this.userId}/courses`);
    await addDoc(userCoursesCollectionRef, newCourse);
  }

  deleteCourse(courseId: string): Promise<void> {
    const courseDocRef = doc(this.firestore, `users/${this.userId}/courses`, courseId);
    return deleteDoc(courseDocRef);
  }

  updateCourse(courseId: string, updatedCourseData: Course): Promise<void> {
    const courseDocRef = doc(this.firestore, `users/${this.userId}/courses`, courseId);
    // @ts-ignore
    return updateDoc(courseDocRef, updatedCourseData);
  }

  findCourseByName(name: string): Observable<Course[]> {
    const userCoursesCollectionRef = collection(this.firestore, `users/${this.userId}/courses`);
    const q = query(userCoursesCollectionRef, where("name", "==", name.trim()));
    return from(getDocs(q)).pipe(
      map(querySnapshot => querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as Course))
    );
  }

  createRefToCourse(courseId: string): DocumentReference<Course> {
    return doc(this.firestore, `users/${this.userId}/courses/${courseId}`) as DocumentReference<Course>;
  }
}
