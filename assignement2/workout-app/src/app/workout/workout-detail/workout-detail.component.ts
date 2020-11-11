import { Component, OnInit } from '@angular/core';
import { WorkoutDetailService } from './workout-detail.service';
import {ActivatedRoute} from "@angular/router";
import {Workout} from "../workout.model";
import {AuthService} from "../../core/auth/auth.service";

@Component({
  selector: 'app-workout-detail',
  templateUrl: './workout-detail.component.html',
  styleUrls: ['./workout-detail.component.scss'],
  providers: [
    WorkoutDetailService
  ]
})
export class WorkoutDetailComponent implements OnInit {
  workout: Workout;
  displayedColumns = ['name', 'desc', 'sets', 'reps'];

  constructor(private _authService: AuthService, private _activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.workout = this._activatedRoute.snapshot.data.workout;
    console.log(this.workout);
  }

  checkUserPermissions(): boolean {
    return this.workout.userId === this._authService.currentUserId();
  }

}
