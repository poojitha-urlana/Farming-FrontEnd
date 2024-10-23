import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  private username = new BehaviorSubject<string | null>(null);

  isLoggedIn$ = this.loggedIn.asObservable();
  username$ = this.username.asObservable();
  constructor(private router: Router) {}
  // Simulate login
  login(user: string) {
    this.username.next(user);
    this.loggedIn.next(true);
    console.log('User logged in:', user);
  }

  // Simulate logout
  logout() {
    this.username.next(null);
    this.loggedIn.next(false);
    console.log('User logged out');

    this.router.navigate(['']);
  }
}
