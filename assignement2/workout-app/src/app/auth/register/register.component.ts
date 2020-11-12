import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../core/auth/auth.service';
//import { User } from '../../core/auth/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  //u : User;

  constructor(private authService : AuthService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  register(): void {
    console.log(this.form.value);
    //this.u = { email : String(this.form.get("email")), password : String(this.form.get("password")) };
    this.authService.register(this.form.value);
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
