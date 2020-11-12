import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {WorkoutLog} from "../../workout/workout-log.model";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class MyWorkoutsResolverService implements Resolve<any> {

  constructor(private _httpClient: HttpClient) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return this._httpClient.get<WorkoutLog[]>(`${environment.appUrl}user/activity-logs`);
  }
}
