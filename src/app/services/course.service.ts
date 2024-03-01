import { Injectable } from '@angular/core';
import {
  Firestore,
  docData,
  DocumentReference,
  collectionData,
  collection,
  deleteDoc,
  doc, updateDoc
} from '@angular/fire/firestore';
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

  getAllCourses(): Observable<Course[]> {
    const coursesCollectionRef = collection(this.firestore, 'courses');
    return collectionData(coursesCollectionRef, { idField: 'id' }) as Observable<Course[]>;
  }

  deleteCourse(courseId: string): Promise<void> {
    const courseDocRef = doc(this.firestore, 'courses', courseId);
    return deleteDoc(courseDocRef);
  }

  updateCourse(courseId: string, updatedCourseData: Course): Promise<void> {
    const courseDocRef = doc(this.firestore, 'courses', courseId);
    return updateDoc(courseDocRef, {
      name: updatedCourseData.name,
      description: updatedCourseData.description,
      // Asegúrate de actualizar aquí todos los campos relevantes de Course
      // Si manejas referencias a profesores, necesitarás una lógica adicional para manejar eso
    });
  }
}
