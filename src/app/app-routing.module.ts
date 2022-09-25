import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'linear-interpolation',
    loadChildren: () =>
      import('./linear-interpolation/linear-interpolation.module').then(
        (m) => m.LinearInterpolationModule
      ),
  },
  {
    path: 'following-eyes',
    loadChildren: () =>
      import('./following-eyes/following-eyes.module').then(
        (m) => m.FollowingEyesModule
      ),
  },
  {
    path: 'bezier-curves',
    loadChildren: () =>
      import('./bezier-curves/bezier-curves.module').then(
        (m) => m.BezierCurvesModule
      ),
  },
  {
    path: 'snap-to-grid',
    loadChildren: () =>
      import('./snap-to-grid/snap-to-grid.module').then(
        (m) => m.SnapToGridModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
