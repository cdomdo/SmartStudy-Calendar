import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  selectedButton: string = 'Perfil';
  isListVisible: boolean = true;

  constructor(private userService: UserService) { }


  userEmail: string | null | undefined;
  ngOnInit(): void {
    this.userEmail = this.userService.getUserEmail();
  }
  toggleListVisibility(button: string) {
    this.selectedButton = button;
    this.isListVisible = button === 'Perfil';
  }

  Logout() {
    this.userService.logout();
  }
}
