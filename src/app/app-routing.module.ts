import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginregisterComponent } from './components/loginregister/loginregister.component';
import { ProfileComponent} from "./components/profile/profile.component";

const routes: Routes = [
  { path: 'loginregister', component: LoginregisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: '', redirectTo: '/loginregister', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
