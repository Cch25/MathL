import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MouseDotsComponent } from './components/mouse-dots/mouse-dots.component';
import { RouterModule } from '@angular/router';
import { FlowFieldEffectComponent } from './components/flowfields/flowfields.component';
import { MenuComponent } from './components/menu/menu.component';
import { FractalsComponent } from './components/fractals/fractals.component';

@NgModule({
  declarations: [
    MouseDotsComponent,
    FlowFieldEffectComponent,
    MenuComponent,
    FractalsComponent,
  ],
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
          { path: 'fractals', component: FractalsComponent },
        ],
      },
    ]),
  ],
})
export class CreativeArtModule {}
