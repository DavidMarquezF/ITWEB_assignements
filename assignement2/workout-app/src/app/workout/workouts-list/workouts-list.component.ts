import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Workout } from '../workout.model';
import { WorkoutsService } from './workouts.service';
import { MatDialog } from '@angular/material/dialog';
import { filter, concatMap } from 'rxjs/operators';
import { WorkoutFormComponent } from '../workout-form/workout-form.component';
import { AuthService } from 'src/app/core/auth/auth.service';
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {Observable} from "rxjs";

@Component({
  selector: 'app-workouts-list',
  templateUrl: './workouts-list.component.html',
  styleUrls: ['./workouts-list.component.scss'],
  providers: [WorkoutsService],
})
export class WorkoutsListComponent implements OnInit, AfterViewInit {
  workouts: Workout[];
  workoutDataSource: MatTableDataSource<Workout>;
  displayedColumns: string[] = ['name', 'description'];
  currentUserId$: Observable<string>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.workoutDataSource.paginator = this.paginator;
  }

  constructor(
    private _workoutService: WorkoutsService,
    private _activatedRoute: ActivatedRoute,
    private _authService: AuthService,
    private _dialogRef: MatDialog,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.workouts = this._activatedRoute.snapshot.data.workouts;
    this.workoutDataSource = new MatTableDataSource<Workout>(this.workouts);
    this.currentUserId$ = this._authService.onCurrentUserId$;
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
