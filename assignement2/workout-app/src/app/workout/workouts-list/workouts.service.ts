import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Workout } from '../workout.model';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class WorkoutsService {

  constructor(private _http: HttpClient) { }

  addWorkout(s: Workout): Observable<string> {
    throw new Error('Method not implemented.');
  }

}
