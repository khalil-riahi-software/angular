import { SharedService } from './../services/shared.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  // --- registers shared service to gain access to behavior subject variables
  constructor(private shared: SharedService) { }

  // --- sends data to shared service and updates the behavior subject
  loginClient(): void {
    this.shared.isLogged$.next(true);
    this.shared.isAdmin$.next(false);
  }

  // --- sends data to shared service and updates the behavior subject
  loginAdmin(): void {
    this.shared.isLogged$.next(true);
    this.shared.isAdmin$.next(true);
  }

  // --- sends data to shared service and updates the behavior subject
  logout(): void {
    this.shared.isLogged$.next(false);
    this.shared.isAdmin$.next(false);
  }
}
