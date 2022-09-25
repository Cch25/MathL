import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { BaseCanvas } from 'src/app/shared/canvas/base-canvas';
import { Lerp } from 'src/app/shared/math-formulas/lerp';
import { Point } from 'src/app/shared/models/point';

@Component({
  selector: 'mathL-bezier-curve',
  templateUrl: './bezier-curve.component.html',
  styleUrls: ['./bezier-curve.component.scss'],
})
export class BezierCurveComponent
  extends BaseCanvas
  implements AfterViewInit, OnDestroy
{
  @ViewChild('canvas') canvas!: ElementRef<HTMLCanvasElement>;

  constructor() {
    super();
  }

  ngAfterViewInit(): void {
    this.setupCanvas();
  }
  protected draw(): void {
    this.context.clearRect(0, 0, this.WIDTH, this.HEIGHT);
    const pointA = new Point(0, this.HEIGHT / 2);
    const firstMiddlePoint = new Point(this.WIDTH / 2, this.HEIGHT / 4);
    const secondMiddlePoint = new Point(this.mouseX, this.mouseY);
    const pointB = new Point(this.WIDTH, this.HEIGHT / 2);
    this.context.beginPath();
    for (let i = 0; i <= 1; i += 0.01) {
      // const point = this.quadratic(pointA, firstMiddlePoint, pointB, i);
      const point = this.cubic(
        pointA,
        firstMiddlePoint,
        secondMiddlePoint,
        pointB,
        i
      );
      this.context.lineTo(point.x, point.y);
      this.context.stroke();
    }
  }

  private cubic(
    pointA: Point<number>,
    firstMiddlePoint: Point<number>,
    secondMiddlePoint: Point<number>,
    pointB: Point<number>,
    t: number
  ): Point<number> {
    const firstPoint = this.quadratic(
      pointA,
      firstMiddlePoint,
      secondMiddlePoint,
      t
    );
    const secondPoint = this.quadratic(
      firstMiddlePoint,
      secondMiddlePoint,
      pointB,
      t
    );
    const pointX = Lerp.lerp(firstPoint.x, secondPoint.x, t);
    const pointY = Lerp.lerp(firstPoint.y, secondPoint.y, t);
    return new Point(pointX, pointY);
  }

  private quadratic(
    pointA: Point<number>,
    middlePoint: Point<number>,
    pointB: Point<number>,
    t: number
  ): Point<number> {
    const aToMiddle = Lerp.vLerp(pointA, middlePoint, t);
    const middleToB = Lerp.vLerp(middlePoint, pointB, t);
    const x = Lerp.lerp(aToMiddle.x, middleToB.x, t);
    const y = Lerp.lerp(aToMiddle.y, middleToB.y, t);
    return new Point(x, y);
  }

  ngOnDestroy(): void {
    this.disposeCanvas();
  }
}
