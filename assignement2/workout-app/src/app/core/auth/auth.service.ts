import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Jwt} from "./jwt.model";
import {User} from "./user.model";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
// Auth service inspired by Poul's slides from 9th lecture
export class AuthService {
  constructor(private _httpClient: HttpClient) { }

  public register(user: User): void {
    this._httpClient.post<Jwt>(`${environment.appUrl}auth/register`, user).subscribe(data => {
      this.saveToken(data.token);
      return true;
    },

    (err: HttpErrorResponse) => {
      if (err.error instanceof Error) {
        // A client-side or network error occurred. Handle it accordingly.
        console.log('An error occurred:', err.error.message);
      } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
      }
      return false;
    });
  }

  public login(user: User): void {
    this._httpClient.post<Jwt>(`${environment.appUrl}auth/login`, user).subscribe(data => {
      this.saveToken(data.token);
      return true;
    },

      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          // A client-side or network error occurred. Handle it accordingly.
          console.log('An error occurred:', err.error.message);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
        }
        return false;
      });
  }

  public logout(): void {
    this.deleteToken();
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
