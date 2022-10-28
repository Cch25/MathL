import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { BaseCanvas } from 'src/app/shared/canvas/base-canvas';

@Component({
  templateUrl: './following-eyes.component.html',
})
export class FollowingEyesComponent
  extends BaseCanvas
  implements AfterViewInit, OnDestroy
{
  @ViewChild('canvas', { static: false })
  canvas!: ElementRef<HTMLCanvasElement>;

  ngAfterViewInit(): void {
    this.setupCanvas();
    this.loadGoopher();
  }

  protected draw(): void {
    this.eyes(120, 120, 20);
  }

  private eyes(x: number, y: number, size: number): void {
    var rect = this.canvas.nativeElement.getBoundingClientRect();
    this.drawEyes(rect, size);
  }

  private drawEyes(rect: DOMRect, size: number): void {
    var x = this.mouseX - rect.left,
      y = this.mouseY - rect.top;
    this.context.clearRect(0, 0, size * 2 + 10, size + 10);
    this.drawEye(x, y, size / 2 + 5, size / 2 + 5, size);
    this.drawEye(x, y, size * 1.5 + 5, size / 2 + 5, size);
  }

  private drawEye(
    x: number,
    y: number,
    cx: number,
    cy: number,
    size: number
  ): void {
    var dx = x - cx,
      dy = y - cy,
      angle = Math.atan2(dy, dx);

    this.context.save();
    this.context.translate(cx, cy);
    this.context.rotate(angle);
    this.context.beginPath();
    this.context.arc(0, 0, size / 2, 0, Math.PI * 2);
    this.context.stroke();
    this.context.beginPath();
    this.context.arc(size * 0.4, 0, size * 0.1, 0, Math.PI * 2);
    this.context.fill();
    this.context.restore();
  }

  private loadGoopher(): void {
    const image = new Image();
    image.onload = () => {
      this.context.drawImage(
        image,
        this.WIDTH / 2 - image.width / 2,
        this.HEIGHT / 2 - image.height / 2
      );
    };
    image.src = 'assets/goopher.png';
  }

  ngOnDestroy(): void {
    this.disposeCanvas();
    this.subscriptions.unsubscribe();
  }
}

export class Vector {
  public x!: number;
  public y!: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}
