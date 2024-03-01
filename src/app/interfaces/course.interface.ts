import Professor from './professor.interface';
import {DocumentReference} from "@angular/fire/firestore";

export default interface Course {
  id?: string;
  name: string;
  professorsRefs?: DocumentReference<Professor>[];
  description?: string;
}
