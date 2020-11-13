import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Jwt } from './jwt.model';
import { User } from './user.model';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
// Auth service inspired by Poul's slides from 9th lecture
export class AuthService {
  constructor(private _httpClient: HttpClient) {
    this._isLoggedInOrOut$ = new BehaviorSubject(this.isLoggedIn);
  }

  private _isLoggedInOrOut$: BehaviorSubject<boolean>;
  public get onLoggedInOut$(): Observable<boolean> {
    return this._isLoggedInOrOut$.asObservable();
  }

  public register(user: User): Observable<User> {
    return this._httpClient.post<User>(
      `${environment.appUrl}auth/register`,
      user
    );
  }

  public login(user: User): Observable<Jwt> {
    return this._httpClient
      .post<Jwt>(`${environment.appUrl}auth/login`, user)
      .pipe(
        tap((data) => {
          this.saveToken(data.token);
          this._isLoggedInOrOut$.next(true);
        })
      );
  }

  public logout(): void {
    this.deleteToken();
    this._isLoggedInOrOut$.next(false);
  }

  public get authToken(): string {
    return this.getToken();
  }

  public get isLoggedIn(): boolean {
    const token = this.getToken();
    if (token) {
      const payload = JSON.parse(window.atob(token.split('.')[1]));
      return payload.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }

  public currentUserId(): string {
    if (this.isLoggedIn) {
      const token = this.getToken();
      const payload = JSON.parse(window.atob(token.split('.')[1]));
      console.log(payload);
      return payload._id;
    } else {
      return;
    }
  }

  private saveToken(token: string): void {
    window.localStorage['jwt'] = token;
  }

  private getToken(): string {
    if (window.localStorage['jwt']) {
      return window.localStorage['jwt'];
    } else {
      return '';
    }
  }

  private deleteToken(): void {
    window.localStorage['jwt'] = '';
  }
}
