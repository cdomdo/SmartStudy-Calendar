import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    FormsModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

