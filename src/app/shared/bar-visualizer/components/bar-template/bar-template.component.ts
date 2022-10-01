import { AfterViewInit, Component, Input } from '@angular/core';

type Segment = {
  percentage: number;
  color: string;
  width: string;
  height: string;
  marginTop: string;
};

export type ChartData = {
  values: number[];
  colors: string[];
};

export type ChartOptions = {
  barHeightInPx: number;
  barMarginTopInPx: number;
};

@Component({
  selector: 'mathL-bar-template',
  styleUrls:['./bar-template.component.scss'],
  templateUrl: './bar-template.component.html',
})
export class BarTemplateComponent implements AfterViewInit {
  public data!: ChartData;
  public options!: ChartOptions;

  public segments: Segment[] = [];

  ngAfterViewInit(): void {
    const total = this.data.values.reduce((acc, val) => acc + val, 0);
    for (let i = 0; i < this.data.values.length; i++) {
      const percentage = (this.data.values[i] / total) * 100;
      this.segments.push({
        color:
          this.data.colors[i] ?? 'black',
        height: `${this.options!.barHeightInPx}px`,
        marginTop: `${this.options!.barMarginTopInPx}px`,
        percentage: percentage,
        width: `${percentage}%`,
      });
    }
  }

  private get randomColor(): string {
    return '#' + (((1 << 24) * Math.random()) | 0).toString(16);
  }
}
