import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _apiUrl: string = "http://localhost:3000/api/auth";
  private _isLoggedIn: boolean = false;

  private _authToken: string;

  constructor(private _httpClient: HttpClient) { }

  public register(email: string, pass: string): Observable<any> {
    return this._httpClient.post(this._apiUrl + '/register', { email: email, password: pass });
  }

  public login(email: string, pass: string): Observable<any>{
    const result = this._httpClient.post(this._apiUrl + '/login', {email: email, password: pass});
    this._isLoggedIn = true;
    // TODO: look for a way to store JWT token
    return result;
  }

  public get authToken(): string{
    return this._authToken;
  }

  public get isLoggedIn(): boolean{
    return this._isLoggedIn;
  }

}
