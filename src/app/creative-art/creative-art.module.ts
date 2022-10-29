import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MouseDotsComponent } from './components/mouse-dots/mouse-dots.component';
import { RouterModule } from '@angular/router';
import { FlowFieldEffectComponent } from './components/flowfields/flowfields.component';

@NgModule({
  declarations: [MouseDotsComponent, FlowFieldEffectComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: MouseDotsComponent },
      { path: 'flowfields', component: FlowFieldEffectComponent },
    ]),
  ],
})
export class CreativeArtModule {}
