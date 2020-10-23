import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-base-workouts',
  templateUrl: './base-workouts.component.html',
  styleUrls: ['./base-workouts.component.scss'],
})
export class BaseWorkoutsComponent {
}
