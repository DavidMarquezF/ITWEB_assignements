import { LayoutModule } from '@angular/cdk/layout';
import {MatTableModule} from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from "@angular/material/toolbar";
import { RouterModule, Routes } from '@angular/router';
import { WorkoutDetailResolverService } from './workout-detail/workout-detail-resolver.service';
import { WorkoutDetailComponent } from './workout-detail/workout-detail.component';
import { WorkoutFormComponent } from './workout-form/workout-form.component';
import { WorkoutsListComponent } from './workouts-list/workouts-list.component';
import { WorkoutsResolverService } from './workouts-list/workouts-resolver.service';
import { BaseWorkoutsComponent } from './base-workouts/base-workouts.component';
import { MatRippleModule } from '@angular/material/core';

const routes: Routes = [
  {
    path: '',
    component: BaseWorkoutsComponent,
    children: [
      {
        path: '',
        component: WorkoutsListComponent,
        resolve: {
          workouts: WorkoutsResolverService,
        },
      },
      {
        path:":workoutId",
        component: WorkoutDetailComponent,
        resolve:{
          workout: WorkoutDetailResolverService
        }
      }
    ]
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  declarations: [WorkoutsListComponent, WorkoutDetailComponent, WorkoutFormComponent, BaseWorkoutsComponent],
  imports: [
    RouterModule.forChild(routes), 
    MatTableModule,
    MatToolbarModule,
    MatButtonModule,
    HttpClientModule,
    LayoutModule,
    MatSidenavModule,
    MatIconModule,
    MatRippleModule,
    MatInputModule,
    MatListModule,
    FlexLayoutModule,
    MatDialogModule,
    ReactiveFormsModule,
    CommonModule],
  providers: [WorkoutsResolverService, WorkoutDetailResolverService],
})
export class WorkoutModule {}
