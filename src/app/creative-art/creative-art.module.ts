import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MouseDotsComponent } from './components/mouse-dots/mouse-dots.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [MouseDotsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: MouseDotsComponent }]),
  ],
})
export class CreativeArtModule {}
