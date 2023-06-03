import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MouseDotsComponent } from './components/mouse-dots/mouse-dots.component';
import { RouterModule } from '@angular/router';
import { FlowFieldEffectComponent } from './components/flowfields/flowfields.component';
import { MenuComponent } from './components/menu/menu.component';
import { FractalsComponent } from './components/fractals/fractals.component';
import { PolyrithmsComponent } from './components/polyrithms/polyrithms.component';

@NgModule({
  declarations: [
    MouseDotsComponent,
    FlowFieldEffectComponent,
    MenuComponent,
    FractalsComponent,
    PolyrithmsComponent,
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
          { path: 'polyrithms', component: PolyrithmsComponent },
        ],
      },
    ]),
  ],
})
export class CreativeArtModule {}
