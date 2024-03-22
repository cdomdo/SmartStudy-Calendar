import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  docData,
  deleteDoc,
  updateDoc,
  addDoc,
  DocumentReference
} from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import Note from '../interfaces/note.interface';
import firebase from "firebase/compat";
import DocumentData = firebase.firestore.DocumentData;

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  constructor(private firestore: Firestore, private auth: Auth) {}

  private getUserId(): string {
    return this.auth.currentUser?.uid ?? '';
  }

  getNotes(): Observable<Note[]> {
    const userId = this.getUserId();
    const notesRef = collection(this.firestore, `users/${userId}/notes`);
    return collectionData(notesRef, { idField: 'id' }) as Observable<Note[]>;
  }

  addNote(noteData: Note): Promise<DocumentReference<DocumentData>> {
    const userId = this.getUserId();
    const notesRef = collection(this.firestore, `users/${userId}/notes`);
    return addDoc(notesRef, noteData);
  }

  modifyNote(noteId: string, noteData: Partial<Note>): Promise<void> {
    const userId = this.getUserId();
    const noteRef = doc(this.firestore, `users/${userId}/notes`, noteId);
    return updateDoc(noteRef, noteData);
  }

  deleteNote(noteId: string): Promise<void> {
    const userId = this.getUserId();
    const noteRef = doc(this.firestore, `users/${userId}/notes`, noteId);
    return deleteDoc(noteRef);
  }
}
