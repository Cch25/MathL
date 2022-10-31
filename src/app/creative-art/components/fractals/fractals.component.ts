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
  selector: 'mathL-fractals',
  templateUrl: './fractals.component.html',
  styleUrls: ['./fractals.component.scss'],
})
export class FractalsComponent
  extends BaseCanvas
  implements AfterViewInit, OnDestroy
{
  @ViewChild('canvas', { static: false })
  canvas!: ElementRef<HTMLCanvasElement>;
  constructor() {
    super();
  }

  ngAfterViewInit(): void {
    this.setupCanvas();
    const hue = `hsl(${Math.random() * 360},100%,50%)`;
    this.context.fillStyle = 'black';
    this.context.strokeStyle = hue;
    this.context.lineWidth = 10;
    this.context.shadowColor = 'rgba(0,0,0,0.7)';
    this.context.shadowOffsetX = 10;
    this.context.shadowOffsetY = 5;
    this.context.shadowBlur = 10;
    this.context.lineCap = 'round';
    const centerX = this.WIDTH / 2;
    const centerY = this.HEIGHT / 2;
    this.context.fillRect(0, 0, this.WIDTH, this.HEIGHT);

    this.context.translate(centerX, centerY);
    const size = 120;
    const maxLevel = 5;
    const ctx = this.context;
    const scale = 0.7;
    const sides = 6;
    const branches = 5;
    const spread = 0.2;
    this.context.save();
    drawFractal();
    this.context.restore();

    function drawFractal() {
      ctx.save();
      ctx.fillStyle= hue;
      for (let i = 0; i < sides; i++) {
        ctx.rotate((Math.PI * 2) / sides);
        drawBranch(0);
      }
      ctx.restore();
    }

    function drawBranch(level: number) {
      if (level === maxLevel) {
        return;
      }
 
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(size, 0);
      ctx.stroke();
      for (let i = 0; i < branches; i++) {
        ctx.save();
        ctx.translate(size - (size / branches) * i, 0);
        ctx.scale(scale, scale);

        ctx.save();
        ctx.rotate(spread);
        drawBranch(level + 1);
        ctx.restore();

        ctx.restore();
      }
      ctx.beginPath();
      ctx.arc(0, size, size * 0.1, 0, Math.PI * 2); 
      ctx.fill();
    }
  }

  protected draw(): void {}

  ngOnDestroy(): void {
    this.disposeCanvas();
    this.subscriptions.unsubscribe();
  }
}
