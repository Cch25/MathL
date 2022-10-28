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
  {
    path: 'visualizers',
    loadChildren: () =>
      import('./visualizers/visualizers.module').then(
        (m) => m.VisualizerModule
      ),
  },
  {
    path: 'vectors',
    loadChildren: () =>
      import('./vectors/vectors.module').then((m) => m.VectorsModule),
  },
  {
    path: 'creative-art',
    loadChildren: () =>
      import('./creative-art/creative-art.module').then(
        (m) => m.CreativeArtModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
