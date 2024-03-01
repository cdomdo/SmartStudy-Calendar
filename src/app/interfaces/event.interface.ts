import {Timestamp} from "@angular/fire/firestore";
import Course from './course.interface'
import { DocumentReference } from '@angular/fire/firestore';


export default interface Event {
  id?: string;
  date: Timestamp;
  name: string;
  description?: string;
  courseRef?: DocumentReference<Course>;
  course?: Course;
}
