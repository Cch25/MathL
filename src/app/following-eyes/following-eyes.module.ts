import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FollowingEyesComponent } from './following-eyes/following-eyes.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [FollowingEyesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: FollowingEyesComponent }]),
  ],
})
export class FollowingEyesModule {}
