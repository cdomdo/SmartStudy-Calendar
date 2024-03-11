import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CalendarComponent} from "./components/calendar/calendar.component";
import {HomeComponent} from "./components/website/home/home.component";
import {LoginregisterComponent} from "./components/loginregister/loginregister.component";

const routes: Routes = [
  {path: '', component: HomeComponent, pathMatch: 'full'},
  {path: 'calendar', component: CalendarComponent},
  {path: 'login', component: LoginregisterComponent},
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
