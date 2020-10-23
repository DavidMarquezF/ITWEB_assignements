import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkoutsListComponent } from './workouts-list/workouts-list.component';
import { RouterModule, Routes } from '@angular/router';
import { WorkoutsResolverService } from './workouts-list/workouts-resolver.service';
import { WorkoutDetailComponent } from './workout-detail/workout-detail.component';
import { WorkoutDetailResolverService } from './workout-detail/workout-detail-resolver.service';

const routes: Routes = [
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
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  declarations: [WorkoutsListComponent, WorkoutDetailComponent],
  imports: [RouterModule.forChild(routes), CommonModule],
  providers: [WorkoutsResolverService, WorkoutDetailResolverService],
})
export class WorkoutModule {}
