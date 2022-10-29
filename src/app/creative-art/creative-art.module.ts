import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MouseDotsComponent } from './components/mouse-dots/mouse-dots.component';
import { RouterModule } from '@angular/router';
import { FlowFieldEffectComponent } from './components/flowfields/flowfields.component';
import { MenuComponent } from './components/menu/menu.component';

@NgModule({
  declarations: [MouseDotsComponent, FlowFieldEffectComponent, MenuComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: MenuComponent, 
        children: [
          { path: '', redirectTo: 'colorful-dots' },
          { path: 'colorful-dots', component: MouseDotsComponent },
          { path: 'flowfields', component: FlowFieldEffectComponent },
        ],
      },
    ]),
  ],
})
export class CreativeArtModule {}
