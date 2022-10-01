import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ChartDetails } from 'src/app/shared/bar-visualizer/components/bar-chart/bar-chart.component';

@Component({
  selector: 'mathL-buble-sort',
  templateUrl: './buble-sort.component.html',
  styleUrls: ['./buble-sort.component.scss'],
})
export class BubleSortComponent implements OnInit {
  chartDetails: ChartDetails = {
    data: [
      3, 3, 3, 8, 5, 5, 7, 9, 9, 10, 2, 10, 10, 5, 10, 2, 7, 10, 5, 9, 9, 9, 3,
      8, 6, 10, 5, 4, 7, 4, 4, 3, 7, 5, 6, 10, 3, 2, 8, 9, 5, 6, 9, 7, 3, 5, 3,
      2, 10, 3,
    ],
    options: {
      barSpaceInPx: 1,
      mode: 'stack',
      align: 'center',
    },
  };
  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    const swaps = this.bubbleSort([
      ...(this.chartDetails.data as Array<number>),
    ]);
    this.animate(this.chartDetails, swaps);
    this.cdr.detectChanges();
  }

  private animate(data: any, swaps: any): void {
    if (swaps.length == 0) {
      return;
    }
    const [i, j]: any = swaps.shift(0);
    [data.data[i], data.data[j]] = [data.data[j], data.data[i]];
    this.chartDetails.data = [...data.data];
    this.chartDetails = Object.assign({}, this.chartDetails);

    setTimeout(() => {
      this.animate(data, swaps);
    }, 10);
  }

  private bubbleSort(array: Array<number>): any {
    const swaps: any = [];
    do {
      var swapped = false;
      for (let i = 1; i < array.length; i++) {
        if (array[i - 1] > array[i]) {
          swaps.push([i - 1, i]);
          swapped = true;
          [array[i - 1], array[i]] = [array[i], array[i - 1]];
        }
      }
    } while (swapped);
    return swaps;
  }
}
