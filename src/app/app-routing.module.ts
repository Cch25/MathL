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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
