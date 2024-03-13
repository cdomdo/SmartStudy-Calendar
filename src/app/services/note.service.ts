import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  deleteDoc,
  updateDoc,
  addDoc,
  setDoc
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import Note from '../interfaces/note.interface'

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  constructor(private firestore: Firestore) {}

  // Devuelve todas las notas de la colección provisional notas (FUNCIÓN TEMPORAL!)
  // Se espera organizarlas en users/{user_id}/notes (funciones de abajo)
  getNotes(): Observable<Note[]> {
    const notesRef = collection(this.firestore, 'notes');
    return collectionData(notesRef, { idField: 'id' }) as Observable<Note[]>;
  }
  getUserNotes(username: string): Observable<Note[]> {
    const userNotesRef = collection(this.firestore, `users/${username}/notes`);
    return collectionData(userNotesRef, { idField: 'id' }) as Observable<Note[]>;
  }

  async addNote(noteData: Note, username: string): Promise<void> {
    const userNotesRef = collection(this.firestore, `users/${username}/notes`);
    const docRef = await addDoc(userNotesRef, noteData);
    await setDoc(docRef, { ...noteData, id: docRef.id }, { merge: true });
  }


  async modifyNote(noteId: string, username: string, noteData: Partial<Note>): Promise<void> {
    const noteDocRef = doc(this.firestore, `users/${username}/notes`, noteId);
    await updateDoc(noteDocRef, noteData);
  }

  async deleteNote(noteId: string, username: string): Promise<void> {
    const noteDocRef = doc(this.firestore, `users/${username}/notes`, noteId);
    await deleteDoc(noteDocRef);
  }

}
