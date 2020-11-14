import { Component, OnInit } from '@angular/core';
import { WorkoutDetailService } from './workout-detail.service';
import {ActivatedRoute} from "@angular/router";
import {WorkoutDetail} from "../workout.model";
import {AuthService} from "../../core/auth/auth.service";
import {MatDialog} from "@angular/material/dialog";
import {concatMap, filter, switchMap} from "rxjs/operators";
import {ExerciseFormComponent} from "../exercise-form/exercise-form.component";
import {Observable} from "rxjs";
import {WorkoutLog} from "../workout-log.model";

@Component({
  selector: 'app-workout-detail',
  templateUrl: './workout-detail.component.html',
  styleUrls: ['./workout-detail.component.scss'],
  providers: [
    WorkoutDetailService
  ]
})
export class WorkoutDetailComponent implements OnInit {
  workout: WorkoutDetail;
  displayedColumns = ['name', 'desc', 'sets', 'reps'];
  isLoggedIn$: Observable<boolean>;
  currentUserId$: Observable<string>;

  constructor(private _authService: AuthService,
              private _activatedRoute: ActivatedRoute,
              private _dialogRef: MatDialog,
              private _detailService: WorkoutDetailService) { }

  ngOnInit(): void {
    this.workout = this._activatedRoute.snapshot.data.workout;
    this.isLoggedIn$ = this._authService.onLoggedInOut$;
    this.currentUserId$ = this._authService.onCurrentUserId$;
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
    this._authService.onCurrentUserId$
      .pipe(switchMap(id => {
        let log: WorkoutLog = {userId: id, workoutId: this.workout._id, timestamp: new Date()};
        return this._detailService.logWorkout(log);
      })).subscribe();
  }
}
