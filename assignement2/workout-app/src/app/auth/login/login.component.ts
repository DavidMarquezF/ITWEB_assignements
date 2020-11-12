import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
//import { User } from 'src/app/core/auth/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  //u : User;

  constructor(private authService : AuthService, private router : Router) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  login(){
    ///this.u = { email : String(this.form.get("email")), password : String(this.form.get("password")) };
    this.authService.login(this.form.value);
    this.checkLoggedIn ? this.router.navigate(["/workouts"]) : console.log("Invalid credentials");
  }

  checkLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }
}
