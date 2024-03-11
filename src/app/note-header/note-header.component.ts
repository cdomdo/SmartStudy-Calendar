import { Component } from '@angular/core';
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-note-header',
  standalone: true,
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './note-header.component.html',
  styleUrl: './note-header.component.css'
})
export class navbar {

}
