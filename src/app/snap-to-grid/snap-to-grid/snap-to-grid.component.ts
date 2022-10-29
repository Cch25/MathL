import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { BaseCanvas } from 'src/app/shared/canvas/base-canvas';
import { MathL } from 'src/app/shared/math-formulas/utilities';

@Component({
  template: '<canvas #canvas></canvas>',
})
export class SnapToGridComponent
  extends BaseCanvas
  implements AfterViewInit, OnDestroy
{
  @ViewChild('canvas') canvas!: ElementRef<HTMLCanvasElement>;

  private GRID_SIZE = 40;

  constructor() {
    super();
  }

  ngAfterViewInit(): void {
    this.setupCanvas();
    this.initializeGrid();
  }

  protected draw(): void {
    this.initializeGrid();
    this.snapToGrid();
  }

  private snapToGrid(): void {
    const x = this.roundToNearest(this.mouseX);
    const y = this.roundToNearest(this.mouseY);
    this.createCircle(x, y);
  }

  private roundToNearest(mousePos: number): number {
    return MathL.roundToNearest(mousePos, this.GRID_SIZE);
  }

  private createCircle(x: number, y: number): void {
    this.context.beginPath();
    this.context.arc(x, y, this.GRID_SIZE / 2 - 5, 0, Math.PI * 2);
    this.context.fill();
    this.context.fillStyle = '#ca2c92';
    this.context.strokeStyle = '#ca2c92';
  }

  private initializeGrid(): void {
    this.context.clearRect(0, 0, this.WIDTH, this.HEIGHT);
    this.context.beginPath();
    for (var x = 0; x <= this.WIDTH; x += this.GRID_SIZE) {
      this.context.moveTo(x, 0);
      this.context.lineTo(x, this.HEIGHT);
    }
    this.context.lineWidth = 1;
    // the stroke will actually paint the current path
    this.context.stroke();

    this.context.beginPath();
    for (var y = 0; y <= this.HEIGHT; y += this.GRID_SIZE) {
      this.context.moveTo(0, y);
      this.context.lineTo(this.WIDTH - 5, y);
    }
    this.context.stroke();
  }

  ngOnDestroy(): void {
    this.disposeCanvas();
  }
}
