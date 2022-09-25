import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BezierCurveComponent } from './bezier-curve/bezier-curve.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [BezierCurveComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: BezierCurveComponent }]),
  ],
})
export class BezierCurvesModule {}
