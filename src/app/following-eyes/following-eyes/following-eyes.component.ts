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
    this.initializeCanvas(this.canvas, () => this.draw());
  }

  private draw(): void {
    const angle = this.getAngle();
    this.loadGoopher();
    this.addEyes();
    this.makeEyesFollow(angle);
    requestAnimationFrame(this.draw.bind(this));
  }

  private makeEyesFollow(angle: number): void {
    //to do.
  }

  private addEyes(): void {
    this.drawEye(this.WIDTH / 2 - 16, this.HEIGHT / 2 - 50);
    this.drawEye(this.WIDTH / 2 + 16, this.HEIGHT / 2 - 50);
  }

  private drawEye(dx: number, dy: number, offset: number = 0) {
    this.context.beginPath();
    this.context.arc(dx + offset, dy + offset, 2, 0, Math.PI * 2);
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
    const angle = Math.atan2(dy, dx);
    return angle;
  }

  ngOnDestroy(): void {
    this.dispose();
    this.subscriptions.unsubscribe();
  }
}
