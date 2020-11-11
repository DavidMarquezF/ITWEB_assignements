import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Workout } from '../workout.model';
import { HttpClient } from '@angular/common/http';
import {environment} from "../../../environments/environment";

@Injectable()
export class WorkoutsService {

  constructor(private _http: HttpClient) { }

  addWorkout(workout: Workout): Observable<any> {
    console.log("adding new workout: " + workout);
    return this._http.post<Workout>(`${environment.appUrl}workouts`, workout, {});
  }

}
