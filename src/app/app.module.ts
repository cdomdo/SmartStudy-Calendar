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


@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    EventViewerComponent,
    EventCreatorComponent,
    EventEditorComponent
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

