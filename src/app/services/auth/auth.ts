import { Injectable, signal } from '@angular/core';

export interface User {
  fullName: string;
  email: string;
  password: string;
  role: 'user' | 'admin'
}

@Injectable({
  providedIn: 'root',
})
export class Auth {

  private users = signal<User[]>([
    {
      fullName: 'User',
      email: "user@test.com",
      password: "user123",
      role: "user"
    },
    {
      fullName: 'Admin',
      email: "admin@test.com",
      password: "admin123",
      role: "admin"
    }
  ]);

  currentUser = signal<User | null>(null);

  login(email: string, password: string): boolean {

    const user = this.users().find((user) =>
      user.email === email && user.password === password
    );

    if (user) {
      this.currentUser.set(user);
      return true;
    };
    return false;
  };

  logout() {
    this.currentUser.set(null);
  };

  isLoggedin(): boolean {
    return this.currentUser() !== null;
  };

  getRole(): string | null {
    return this.currentUser()?.role ?? null;
  };

  addUser(data: Omit<User, 'role'>): void {
    const user: User = { ...data, role: 'user' };
    this.users.update((users) => [...users, user]);
  }

}
