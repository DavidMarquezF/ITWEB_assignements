import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, concatMap } from 'rxjs/operators';
import { AuthService } from '../../core/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
//import { User } from '../../core/auth/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  //u : User;


  constructor(private _authService : AuthService, private _router: Router, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  register(): void {
    if(this.form.invalid){
      let snackBarRef = this.snackBar.open('Error upon registration. Check if the form is correct.', 'Close', {
        duration: 5000
      });
      return;
    }
    this._authService.register(this.form.value)
    .pipe(catchError(err => {
      let snackBarRef = this.snackBar.open(`Error upon registration. ${err.error.message}.`, 'Close', {
        duration: 5000
      });
      return err;
    }),
    concatMap(() => this._authService.login({email: this.form.value.email, password : this.form.value.password})),
    catchError(err => {
      let snackBarRef = this.snackBar.open(`Registration successful! Error upon logging in. ${err.error.message}.`, 'Close', {
        duration: 5000
      });
      return err;
    }))
    .subscribe(() => this._router.navigate(["/workouts"]));
  }

  getErrorEmail(){
    return this.form.get("email").hasError("required") ? 
    "Field is required." : "This doesn't seem like a valid email address.";
  }

  getErrorPassword(){
    return this.form.get("password").hasError("required") ? 
    "Field is required." : "Password needs to be at least six characters.";
  }

}
