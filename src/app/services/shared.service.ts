import { Injectable } from '@angular/core';
// --- required import to use Behavior Subject
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class SharedService {
  // --- sets up variable as behavior subject of given type (bool in this case) and gives it initial value
  // --- initial value is mandatory, compared to 'Subject' type
  // --- when the value is passed to behavior subject with .next() it broadcasts the new value all subscribers
  // --- BehaviorSubject can be regarded as broadcast variable
  isLogged$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  isAdmin$: BehaviorSubject<boolean> = new BehaviorSubject(false);
}
