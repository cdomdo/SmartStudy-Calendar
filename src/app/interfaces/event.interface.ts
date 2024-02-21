import {Timestamp} from "@angular/fire/firestore";

export default interface Event {
  id?: string;
  date: Timestamp;
  name: string;
  description?: string;
  course: string;
}
