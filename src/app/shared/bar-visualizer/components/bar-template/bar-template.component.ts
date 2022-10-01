import {
  AfterViewInit,
  Component, 
} from '@angular/core';

type Segment = {
  percentage: number;
  color: string;
  width: string;
  height: string;
  marginTop: string;
  marginRight: string;
};

export type ChartData = {
  values: number[];
  colors: string[];
};

export type ChartOptions = {
  barWidthInPx?: number;
  barSpaceInPx?: number;
  mode?: 'inline' | 'stack' | 'clustered';
  align?: 'left' | 'center' | 'right';
};

@Component({
  selector: 'mathL-bar-template',
  styleUrls: ['./bar-template.component.scss'],
  templateUrl: './bar-template.component.html',
})
export class BarTemplateComponent implements AfterViewInit {
  public data!: ChartData | Array<number>;
  public options!: ChartOptions;

  public segments: Segment[] = [];
 

  ngAfterViewInit(): void {
    //for now just replace stacked, but refactor to clustered after
    // const total = this.data.values.reduce((acc, val) => acc + val, 0);
    // for (let i = 0; i < this.data.values.length; i++) {
    //   const percentage = (this.data.values[i] / total) * 100;
    //   this.segments.push(
    //     this.buildSegment(this.data.colors[i], percentage)
    //   );
    // }
    const total = 14;
    const data = this.data as Array<number>;
    for (let i = 0; i < data.length; i++) {
      const percentage = (data[i] / total) * 100;
      this.segments.push(this.buildSegment('black', percentage));
    }
  }

  //todo refactor
  private buildSegment(color: string, percentage: number): Segment {
    if (this.options.mode === 'stack') {
      return {
        color: color ?? 'black',
        height: `${this.options!.barWidthInPx}px`,
        marginTop: `0px`,
        percentage: percentage,
        width: `${percentage}%`,
        marginRight: `${this.options!.barSpaceInPx}px`,
      };
    }
    return {
      color: color ?? 'black',
      height: `${percentage}%`,
      percentage: percentage,
      width: `${this.options!.barWidthInPx}px`,
      marginTop: `${this.options!.barSpaceInPx}px`,
      marginRight: `0px`,
    };
  }

  private get randomColor(): string {
    return '#' + (((1 << 24) * Math.random()) | 0).toString(16);
  }
}
