import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../core/auth/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private _authService: AuthService) { }

  ngOnInit(): void {
  }

  checkLoggedIn(): boolean {
    return this._authService.isLoggedIn;
  }

  logout() {
    this._authService.logout();
  }

}