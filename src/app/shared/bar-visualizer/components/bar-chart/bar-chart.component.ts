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
  styleUrls: ['./bar-chart.component.scss'],
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
    const options = this.ensureOptionsAreInitialized(this.details!.options);
    cRef1.instance.options = options;
    cRef1.changeDetectorRef.detectChanges();
    this.insertPoint.insert(cRef1.hostView);
  }

  private ensureOptionsAreInitialized(options?: ChartOptions): ChartOptions {
    if (options == null) {
      return {
        barSpaceInPx: 0,
        barWidthInPx: 8,
        mode: 'inline',
      };
    }
    return {
      barSpaceInPx: this.checkAndInitializeProperty('barSpaceInPx', 0),
      barWidthInPx: this.checkAndInitializeProperty('barWidthInPx', 8),
      mode: this.checkAndInitializeProperty('mode', 'inline'),
    };
  }

  private checkAndInitializeProperty(
    prop: keyof ChartOptions,
    withValue: any
  ): any {
    return this.details!.options![prop] == null
      ? withValue
      : this.details!.options![prop];
  }

  ngOnDestroy() {
    this.insertPoint.clear();
  }
}
