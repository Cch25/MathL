import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SnapToGridComponent } from './snap-to-grid/snap-to-grid.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [SnapToGridComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: SnapToGridComponent }]),
  ],
})
export class SnapToGridModule {}
