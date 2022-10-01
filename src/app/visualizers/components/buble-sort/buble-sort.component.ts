import { Component, OnInit } from '@angular/core';
import { ChartDetails } from 'src/app/shared/bar-visualizer/components/bar-chart/bar-chart.component';

@Component({
  selector: 'mathL-buble-sort',
  templateUrl: './buble-sort.component.html',
  styleUrls: ['./buble-sort.component.scss'],
})
export class BubleSortComponent implements OnInit {
  chartDetails: ChartDetails = {
    data: [
      {
        values: [1, 2],
        colors: ['orange'],
      },
      {
        values: [3, 1],
        colors: ['darkblue'],
      },
      {
        values: [6, 4],
        colors: ['fuchsia','darkgreen'],
      },
      {
        values: [5, 2],
        colors: ['darkred','blue'],
      },
    ],
    options: {
      barMarginTopInPx: 2,
      barHeightInPx: 10,
    },
  };
  constructor() {}

  ngOnInit(): void {}
}
