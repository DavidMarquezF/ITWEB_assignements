import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Jwt} from "./jwt";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // TODO: Add real API url
  private _apiUrl: string = "http://localhost:3000/api/auth";
  private _isLoggedIn: boolean = false;

  private _authToken: string;

  constructor(private _httpClient: HttpClient) { }

  public register(email: string, pass: string): Observable<any> {
    return this._httpClient.post(this._apiUrl + '/register', { email: email, password: pass });
  }

  public login(email: string, pass: string): Observable<any>{
    return this._httpClient.post<Jwt>(this._apiUrl + '/login', {email: email, password: pass})
      .pipe(tap(token => {
        this._authToken = token.token;
        this._isLoggedIn = true;
      }));
  }

  public get authToken(): string{
    return this._authToken;
  }

  public get isLoggedIn(): boolean{
    return this._isLoggedIn;
  }

}
