import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Workout } from '../workout.model';
import { WorkoutsService } from './workouts.service';
import { MatDialog } from '@angular/material/dialog';
import { filter, concatMap } from 'rxjs/operators';
import { WorkoutFormComponent } from '../workout-form/workout-form.component';

@Component({
  selector: 'app-workouts-list',
  templateUrl: './workouts-list.component.html',
  styleUrls: ['./workouts-list.component.scss'],
  providers: [WorkoutsService],
})
export class WorkoutsListComponent implements OnInit {
  workouts: Workout[];
  displayedColumns = ['num', 'name', 'description'];

  constructor(
    private _workoutService: WorkoutsService,
    private _activatedRoute: ActivatedRoute,
    private _dialogRef: MatDialog,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.workouts = this._activatedRoute.snapshot.data.workouts;
  }

  addWorkout(): void {
    this._dialogRef
      .open(WorkoutFormComponent)
      .afterClosed()
      .pipe(
        filter((r) => !!r),
        concatMap((s) => this._workoutService.addWorkout(s))
      )
      .subscribe((id: string) => {
        this._router.navigate([id], { relativeTo: this._activatedRoute });
      });
  }
}
