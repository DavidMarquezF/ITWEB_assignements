import { Component, OnInit } from '@angular/core';
import { WorkoutDetailService } from './workout-detail.service';

@Component({
  selector: 'app-workout-detail',
  templateUrl: './workout-detail.component.html',
  styleUrls: ['./workout-detail.component.scss'],
  providers: [
    WorkoutDetailService
  ]
})
export class WorkoutDetailComponent implements OnInit {

  constructor(private _workoutService: WorkoutDetailService) { }

  ngOnInit(): void {
  }

}
