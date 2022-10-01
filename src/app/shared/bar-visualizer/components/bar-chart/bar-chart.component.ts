import {
  AfterViewInit,
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  ElementRef,
  Injector,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import {
  BarTemplateComponent,
  ChartData,
  ChartOptions,
} from '../bar-template/bar-template.component';

export type ChartDetails = {
  data: ChartData[] | Array<number>;
  options?: ChartOptions;
};

@Component({
  selector: 'mathL-bar-chart',
  styleUrls: ['./bar-chart.component.scss'],
  templateUrl: './bar-chart.component.html',
})
export class BarChartComponent implements AfterViewInit, OnChanges {
  @Input() details: ChartDetails | undefined;
  @ViewChild('barChart')
  barChart!: ElementRef;
  @ViewChild('insertPoint', { read: ViewContainerRef })
  insertPoint!: ViewContainerRef;

  constructor(
    private cfr: ComponentFactoryResolver,
    private injector: Injector
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['details'].firstChange === false && this.details) {
      for (const data of this.details.data) {
        if (data instanceof CharacterData) {
          this.drawBar(data as ChartData);
        } else {
          this.drawBar(this.details.data as Array<number>);
          break;
        }
      }
    }
  }

  ngAfterViewInit(): void {
    if (this.details) {
      for (const data of this.details.data) {
        if (data instanceof CharacterData) {
          this.drawBar(data as ChartData);
        } else {
          this.drawBar(this.details.data as Array<number>);
          break;
        }
      }
    }
  }

  //Maybe not needed, mostly made as an experiment
  private drawBar(data: ChartData | Array<number>): void {
    this.insertPoint.clear();
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
        align: 'left',
      };
    }
    return {
      barSpaceInPx: this.checkAndInitializeProperty('barSpaceInPx', 0),
      barWidthInPx: this.checkAndInitializeProperty('barWidthInPx', 8),
      mode: this.checkAndInitializeProperty('mode', 'inline'),
      align: this.checkAndInitializeProperty('align', 'left'),
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
