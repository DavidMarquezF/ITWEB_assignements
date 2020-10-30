import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _httpClient: HttpClient) { }

  public login(email: string, pass: string): Observable<any>{
    return null;
  }

  public get authToken(): string{
    return null;
  }

  public get isLoggedIn(): boolean{
    return null;
  }

}
