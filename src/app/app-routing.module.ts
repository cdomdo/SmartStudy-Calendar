import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginregisterComponent } from './components/loginregister/loginregister.component';
import { ProfileComponent} from "./components/profile/profile.component";
import {CalendarComponent} from "./components/calendar/calendar.component";
import {HomeComponent} from "./components/website/home/home.component";
import {LogoutComponent} from "./components/logout/logout.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import { NotesComponent } from './components/notes/notes.component';

const routes: Routes = [
  {path: '', component: LoginregisterComponent, pathMatch: 'full'},
  {path: 'calendar', component: CalendarComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'home', component: HomeComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'logout', component: LogoutComponent},
  {path: 'notes', component: NotesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
