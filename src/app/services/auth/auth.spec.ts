import { TestBed } from '@angular/core/testing';

import { Auth } from './auth';

describe('Auth', () => {
  let service: Auth;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Auth);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('stores a newly registered user and allows that user to log in', () => {
    service.addUser({
      fullName: 'New User',
      email: 'new@test.com',
      password: 'new123',
    });

    expect(service.login('new@test.com', 'new123')).toBe(true);
    expect(service.currentUser()).toEqual({
      fullName: 'New User',
      email: 'new@test.com',
      password: 'new123',
      role: 'user',
    });
  });
});
