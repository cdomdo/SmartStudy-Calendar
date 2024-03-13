import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginregisterComponent } from './components/loginregister/loginregister.component';
import { ProfileComponent} from "./components/profile/profile.component";
import {CalendarComponent} from "./components/calendar/calendar.component";
import {HomeComponent} from "./components/website/home/home.component";

const routes: Routes = [
  {path: '', component: HomeComponent, pathMatch: 'full'},
  {path: 'calendar', component: CalendarComponent},
  {path: 'loginregister', component: LoginregisterComponent },
  {path: 'profile', component: ProfileComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
