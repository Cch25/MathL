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
    const angle = this.getAngle();
    this.makeEyesFollow(angle);
  }

  private makeEyesFollow(angle: number): void {
    this.context.clearRect(this.WIDTH / 2 - 25, this.HEIGHT / 2 - 55, 15, 15);
    this.context.clearRect(this.WIDTH / 2 + 6, this.HEIGHT / 2 - 55, 14, 14);

    this.drawEye(this.WIDTH / 2 - 16, this.HEIGHT / 2 - 50);
    this.drawEye(this.WIDTH / 2 + 16, this.HEIGHT / 2 - 50);
  }

  private drawEye(dx: number, dy: number) {
    this.context.beginPath();
    this.context.arc(dx, dy, 2, 0, Math.PI * 2);
    this.context.fill();
    this.context.stroke();
    this.context.closePath();
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

  private getAngle(): number {
    const dx = this.mouseX - this.WIDTH / 2;
    const dy = this.mouseY - this.HEIGHT / 2;
    const radianDegrees = Math.atan2(dy, dx);
    return radianDegrees * (180 / Math.PI);
  }

  private getDistance(a: Vector, b: Vector): number {
    return Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2));
  }

  ngOnDestroy(): void {
    this.dispose();
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
