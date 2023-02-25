# Behavior Subject Example

Shared Service
```javascript
export class SharedService {
  // --- sets up variable as behavior subject of given type (bool in this case) and gives it initial value
  // --- initial value is mandatory, compared to 'Subject' type
  // --- when the value is passed to behavior subject with .next() it broadcasts the new value all subscribers
  // --- BehaviorSubject can be regarded as broadcast variable
  isLogged$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  isAdmin$: BehaviorSubject<boolean> = new BehaviorSubject(false);
}
```

Login Component HTML
```HTML
<div>
  <!-- Pushes data to BehaviorSubject via method -->
  <a (click)="loginClient()">Login as Client</a>
  <a (click)="loginAdmin()">Login as Admin</a>
  <a (click)="logout()">Logout</a>
</div>
```

Login Component
```javascript
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
```

Content HTML
```HTML
<div>
  <!-- Using async pipe subscribes to changes in behavior subject variables -->
  <p>Logged in: {{ shared.isLogged$ | async }}</p>
  <p *ngIf="(shared.isLogged$ | async)">Logged in as {{ (shared.isAdmin$ | async) ? "Admin" : "Client" }}</p>
</div>
```

Content Component
```javascript
export class ContentComponent {
  // --- registers shared service to gain access to behavior subject variables
  constructor(private shared: SharedService) {}
}
```