import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  private username = new BehaviorSubject<string | null>(null);

  isLoggedIn$ = this.loggedIn.asObservable();
  username$ = this.username.asObservable();

  login(user: string) {
    this.username.next(user);
    this.loggedIn.next(true);
  }

  logout() {
    this.username.next(null);
    this.loggedIn.next(false);
  }
}
