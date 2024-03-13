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
import {from, Observable, of} from 'rxjs';
import  Course  from '../interfaces/course.interface';
import {map} from "rxjs/operators";

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


  async addCourse(newCourse: Course): Promise<void> {
    const coursesCollectionRef = collection(this.firestore, 'courses');
    const docRef = await addDoc(coursesCollectionRef, newCourse);
    const courseDocRef = doc(this.firestore, 'courses', docRef.id);
    await updateDoc(courseDocRef, { id: docRef.id }).catch(error => {
      throw new Error("Error al actualizar el ID del curso");
    });
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
    });
  }
  findCourseByName(name: string): Observable<Course[]> {
    const coursesCollectionRef = collection(this.firestore, 'courses');
    const q = query(coursesCollectionRef, where("name", "==", name.trim()));
    return from(getDocs(q)).pipe(
      map(querySnapshot => querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as Course))
    );
  }

  createRefToCourse(courseId: string): DocumentReference<Course> {
    return doc(this.firestore, `courses/${courseId}`) as DocumentReference<Course>;
  }

}
