import { Component, OnInit } from '@angular/core';
import {Workout} from "../../workout/workout.model";
import {AuthService} from "../../core/auth/auth.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {
  workouts: Workout[];

  constructor(private _authService: AuthService, private _activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.workouts = this._activatedRoute.snapshot.data.workouts;
    // this.workouts = [
    //   { _id: '1224fas', name: 'My workout 1', description: 'My first workout.', exercises: [
    //     { name: 'Exercise 1', description: '', sets: 0, durationType: 'time', duration: 0 },
    //       { name: 'Exercise 2', description: '', sets: 0, durationType: 'time', duration: 0 }
    //     ] },
    //   { _id: '1225fas', name: 'My workout 2', description: 'My second workout.', exercises: [] },
    //   { _id: '1226fas', name: 'My workout 3', description: 'My third workout.', exercises: [] },
    //   { _id: '1227fas', name: 'My workout 4', description: 'My fourth workout.', exercises: [] },
    //   { _id: '1228fas', name: 'My workout 5', description: 'My fifth workout.', exercises: [] }
    // ];
  }

  checkLoggedIn(): boolean {
    return this._authService.isLoggedIn;
  }

  // TODO: remove when proper login form is done
  login() {
    this._authService.login({
      email : "onj@example.com",
      password : "qwerASDF"
    })
  }

  logout() {
    this._authService.logout();
  }
}
