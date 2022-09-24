import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LinearInterpolationComponent } from './linear-interpolation/linear-interpolation.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [LinearInterpolationComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: LinearInterpolationComponent,
      },
    ]),
  ],
})
export class LinearInterpolationModule {}
