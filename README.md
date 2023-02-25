#  Subject
The Subjects are special observable which acts as both observer & observable. They allow us to emit new values to the observable stream using the next method. All the subscribers, who subscribe to the subject will receive the same instance of the subject & hence the same values.
![image](https://user-images.githubusercontent.com/8484777/221375637-ce779e33-60ab-4bbd-915b-8505882108da.png)

An Observer can subscribe to the Subject and receive value from it. Subject adds them to its collection observers. Whenever there is a value in the stream it notifies all of its Observers.

# Subject is hot Observable
Cold observable: The cold observable does not activate the producer until there is a subscriber. This is usually the case when the observable itself produces the data.
Hot observable
The hot observable does not wait for a subscriber to emit the data. It can start emitting the values right away. The happens when the producer is outside the observable.

# Subjects are Multicast
More than one subscriber can subscribe to a subject. They will share the same instance of the observable. This means that all of them receive the same event when the subject emits it.
Multiple observers of an observable, on the other hand, will receive a separate instance of the observable.
Unicast :the observers will receive new instance of observable and hence not the same data.
===>Subjects maintain a list of subscribers
# There are other types of subjects
# ReplaySubject: replays old values to new subscribers when they first subscribe.
The ReplaySubject will store every value it emits in a buffer. It will emit them to the new subscribers in the order it received them. You can configure the buffer using the arguments bufferSize and windowTime
# BehaviorSubject: is an exact copy of Subject. The only difference is an initial value must be provided while initializing the behavior subject and it provides the latest value right after subscription.
# AsyncSubject: only emits the latest value only when it completes. If it errors out then it will emit an error, but will not emit any values.

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
