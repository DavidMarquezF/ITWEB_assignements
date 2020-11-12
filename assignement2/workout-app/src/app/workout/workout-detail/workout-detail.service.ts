import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Workout} from "../workout.model";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Exercise} from "../exercise.model";
import {Router} from "@angular/router";
import {WorkoutLog} from "../workout-log.model";

@Injectable()
export class WorkoutDetailService {

  constructor(private _httpClient: HttpClient, private _router: Router) { }

  addExercise(exercise: Exercise): Observable<any> {
    console.log("adding new exercise: " + exercise);
    console.log(this._router.url);
    console.log(this._router.url.search("/workouts"));
    return this._httpClient.post<Workout>(`${environment.appUrl}${this._router.url}`, exercise, {});
  }

  logWorkout(log: WorkoutLog): Observable<any> {
    return this._httpClient.post<WorkoutLog>(`${environment.appUrl}/user/activity-logs`, log);
  }
}
