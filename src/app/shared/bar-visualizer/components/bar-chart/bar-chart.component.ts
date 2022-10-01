import {
  AfterViewInit,
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  ElementRef,
  Injector,
  Input,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import {
  BarTemplateComponent,
  ChartData,
  ChartOptions,
} from '../bar-template/bar-template.component';

export type ChartDetails = {
  data: ChartData[];
  options?: ChartOptions;
};

@Component({
  selector: 'mathL-bar-chart',
  styleUrls:['./bar-chart.component.scss'],
  templateUrl: './bar-chart.component.html',
})
export class BarChartComponent implements AfterViewInit {
  @Input() details: ChartDetails | undefined;
  @ViewChild('barChart')
  barChart!: ElementRef;
  @ViewChild('insertPoint', { read: ViewContainerRef })
  insertPoint!: ViewContainerRef;

  constructor(
    private cfr: ComponentFactoryResolver,
    private injector: Injector
  ) {}

  ngAfterViewInit(): void {
    if (this.details) {
      for (const data of this.details.data) {
        this.drawBar(data);
      }
    }
  }

  //Maybe not needed, mostly made as an experiment
  private drawBar(data: ChartData): void {
    const cf = this.cfr.resolveComponentFactory(BarTemplateComponent);
    const cRef1: ComponentRef<BarTemplateComponent> = cf.create(this.injector);
    cRef1.instance.data = data;
    if (!this.details!.options) {
      this.details!.options = {
        barHeightInPx: 8,
        barMarginTopInPx: 2,
      };
    }
    cRef1.instance.options = this.details!.options;
    cRef1.changeDetectorRef.detectChanges();
    this.insertPoint.insert(cRef1.hostView);
  }

  ngOnDestroy() {
    this.insertPoint.clear();
  }
}
