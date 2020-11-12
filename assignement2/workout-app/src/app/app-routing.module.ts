import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LandingPageComponent} from "./navigation/landing-page/landing-page.component";
import {LandingResolverService} from "./navigation/landing-page/landing-resolver.service";
import {MyWorkoutsComponent} from "./navigation/my-workouts/my-workouts.component";
import {MyWorkoutsResolverService} from "./navigation/my-workouts/my-workouts-resolver.service";

const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
    resolve: { workouts: LandingResolverService }
  },
  {
    path: 'my-workouts',
    component: MyWorkoutsComponent,
    resolve: { workouts: MyWorkoutsResolverService }
  },
  {
    path: 'workouts',
    loadChildren: () =>
      import('./workout/workout.module').then((m) => m.WorkoutModule)
  },
  {
    path: "auth",
    loadChildren: () =>
      import("./auth/auth.module").then(m => m.AuthModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
