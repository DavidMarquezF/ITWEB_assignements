import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Workout } from '../workout.model';

@Injectable()
export class WorkoutsResolverService implements Resolve<Workout[]>{

  constructor(private _httpClient: HttpClient) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Workout[] | Observable<Workout[]> | Promise<Workout[]> {
    return this._httpClient.get<Workout[]>(`${environment.appUrl}workouts`);
  }
}
