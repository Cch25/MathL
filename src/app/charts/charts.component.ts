import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { timer } from 'rxjs';

@Component({
  selector: 'mathL-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss'],
})
export class ChartsComponent implements OnInit {
  public chart!: Chart;

  constructor() {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.createChart();
    timer(1000,2500).subscribe((data) => {
      this.chart.data = this.shuffleData(this.chart.data);
      this.chart.update();
    });
  }

  private shuffleData(data: any) {
    // Shuffle the labels
    for (let i = data.labels.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [data.labels[i], data.labels[j]] = [data.labels[j], data.labels[i]];
    }

    // Shuffle the data values and background colors
    const shuffledData = data.datasets[0].data.slice(); // Create a copy of the data array
    const shuffledColors = data.datasets[0].backgroundColor.slice(); // Create a copy of the colors array
    for (let i = shuffledData.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledData[i], shuffledData[j]] = [shuffledData[j], shuffledData[i]];
      [shuffledColors[i], shuffledColors[j]] = [
        shuffledColors[j],
        shuffledColors[i],
      ];
    }
    data.datasets[0].data = shuffledData;
    data.datasets[0].backgroundColor = shuffledColors;

    return data;
  }

  createChart() {
    this.chart = new Chart('MyChart', {
      type: 'bar', //this denotes tha type of chart

      data: {
        // values on X-Axis
        labels: [
          'Enterprise Server',
          'Enterprise Central',
          'Server AS-P',
          'Server AS-B-24',
          'SmartX Controller',
          'Room Unit',
          'DI-UI',
          'AS-B-OnBoard',
          'Other',
        ],
        datasets: [
          {
            borderRadius: 5,
            data: [4, 1, 23, 12, 25, 2, 4, 6, 5, 72],
            barPercentage: 0.5,
            categoryPercentage: 1,
            backgroundColor: [
              'rgba(255, 99, 132, 0.88)',
              'rgba(255, 159, 64, 0.88)',
              'rgba(255, 205, 86, 0.89)',
              'rgba(75, 192, 192, 0.88)',
              'rgba(54, 162, 235, 0.88)',
              '#f2f2f2',
              '#ccc',
              '#005ac2',
            ],
          },
        ],
      },
      options: {
        events: [],
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            enabled: false,
          },
        },
        indexAxis: 'y',
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              display: false,
            },
          },
          x: {
            display: false,
            grid: {
              display: false,
            },
          },
        },
        animation: {
          onComplete: function (chart) {
            var chartInstance = chart;
            var ctx = chartInstance.chart.ctx;
            ctx.textAlign = 'end';
            ctx.textBaseline = 'middle';
            this.data.datasets.forEach(function (dataset, i) {
              const meta = chartInstance.chart.getDatasetMeta(i);
              meta.data.forEach(function (bar, index) {
                const data: any = dataset.data[index];
                ctx.fillText(data, bar.x + 25, bar.y);
              });
            });
          },
        },
      },
    });
  }
}
