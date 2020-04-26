import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAdmin = true;
  constructor() { }

  get IsAdmin(): boolean {
    return this.isAdmin;
  }

  setAdmin(): void {
    this.isAdmin = true;
  }
  setUser(): void {
    this.isAdmin = false;
  }
}
