import { Component, OnInit } from '@angular/core';
import {WorkoutLog} from "../../workout/workout-log.model";
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "../../core/auth/auth.service";

@Component({
  selector: 'app-my-workouts',
  templateUrl: './my-workouts.component.html',
  styleUrls: ['./my-workouts.component.scss']
})
export class MyWorkoutsComponent implements OnInit {
  logs: WorkoutLog[];
  displayedColumns = ['name', 'time'];

  constructor(private _activatedRoute: ActivatedRoute, private _authService: AuthService) { }

  ngOnInit(): void {
    this.logs = this._activatedRoute.snapshot.data.workouts;
    // Filter logs just to show my workouts
    this.logs = this.logs.filter(log => log.userId === this._authService.currentUserId());
  }

}
