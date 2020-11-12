import { Component, OnInit } from '@angular/core';
import { WorkoutDetailService } from './workout-detail.service';
import {ActivatedRoute} from "@angular/router";
import {Workout} from "../workout.model";
import {AuthService} from "../../core/auth/auth.service";
import {MatDialog} from "@angular/material/dialog";
import {concatMap, filter} from "rxjs/operators";
import {ExerciseFormComponent} from "../exercise-form/exercise-form.component";

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
  // exercises: Exercise[];
  displayedColumns = ['name', 'desc', 'sets', 'reps'];

  constructor(private _authService: AuthService,
              private _activatedRoute: ActivatedRoute,
              private _dialogRef: MatDialog,
              private _detailService: WorkoutDetailService) { }

  ngOnInit(): void {
    this.workout = this._activatedRoute.snapshot.data.workout;
    // this.exercises = this.workout.exercises;
  }

  checkUserPermissions(): boolean {
    return this.workout.userId === this._authService.currentUserId();
  }

  addExercise() {
    this._dialogRef
      .open(ExerciseFormComponent)
      .afterClosed()
      .pipe(
        filter((r) => !!r),
        concatMap((e) => this._detailService.addExercise(e))
      )
      .subscribe(res => this.workout = {...res});
  }

  logWorkout() {
    this._detailService.logWorkout({
      userId: this._authService.currentUserId(),
      workoutId: this.workout._id,
      timestamp: new Date()
    })
      .subscribe();
  }
}
