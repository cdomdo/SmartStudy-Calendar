import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from "../../services/user.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private router: Router,private userService: UserService) {}

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['/logout']);
  }
}
