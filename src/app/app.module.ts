import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import { EventViewerComponent } from './components/event-viewer/event-viewer.component';
import {getAuth, provideAuth} from "@angular/fire/auth";
import { EventCreatorComponent } from './components/event-creator/event-creator.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { EventEditorComponent } from './components/event-editor/event-editor.component';
import { SubjectManagerComponent } from './components/subject-manager/subject-manager.component';
import { SubjectViewerComponent } from './components/subject-viewer/subject-viewer.component';
import { SubjectEditorComponent } from './components/subject-editor/subject-editor.component';
import { ProfessorCreatorComponent } from './components/professor-creator/professor-creator.component';
import { ProfessorManagerComponent } from './components/professor-manager/professor-manager.component';
import { SubjectCreatorComponent } from './components/subject-creator/subject-creator.component';


@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    EventViewerComponent,
    EventCreatorComponent,
    EventEditorComponent,
    SubjectManagerComponent,
    SubjectViewerComponent,
    SubjectEditorComponent,
    ProfessorCreatorComponent,
    ProfessorManagerComponent,
    SubjectEditorComponent,
    SubjectCreatorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

