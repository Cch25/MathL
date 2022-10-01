import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarChartComponent } from './components/bar-chart/bar-chart.component';
import { BarTemplateComponent } from './components/bar-template/bar-template.component';
import { BarHoverDirective } from './directives/bar-hover.directive';

@NgModule({
  declarations: [BarChartComponent, BarTemplateComponent, BarHoverDirective],
  imports: [
    CommonModule
  ],
  exports:[BarChartComponent]
})
export class BarVisualizerModule {}
