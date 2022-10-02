import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VectorsStartComponent } from './components/vectors-start/vectors-start.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [VectorsStartComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: VectorsStartComponent }]),
  ],
})
export class VectorsModule {}
