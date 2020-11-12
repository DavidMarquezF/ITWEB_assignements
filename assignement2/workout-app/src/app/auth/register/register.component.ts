import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  //form: FormGroup;

  constructor() { }

  ngOnInit(): void {
    //this.form = new FormGroup({
    //  email: new FormControl(null, Validators.required),
    //  password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    //});
  }

}
