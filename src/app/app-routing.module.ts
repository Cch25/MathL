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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
