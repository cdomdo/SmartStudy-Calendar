import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {User} from "../../interfaces/user.interface";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  userData: User | null = null;
  selectedButton: string = 'Perfil';
  isListVisible: boolean = true;

  constructor(private userService: UserService) { }


  userEmail: string | null | undefined;
  ngOnInit(): void {
    // @ts-ignore
    this.userService.getUserData().subscribe(userData => {
      if (userData) {
        this.userData = userData; // Asegúrate de que userData sea de tipo User
      }
    });
  }
  toggleListVisibility(button: string) {
    this.selectedButton = button;
    this.isListVisible = button === 'Perfil';
  }

  Logout() {
    this.userService.logout();
  }
}
