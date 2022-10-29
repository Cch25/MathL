import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core'; 
import { BaseCanvas } from 'src/app/shared/canvas/base-canvas';

@Component({
  template: '<canvas #canvas></canvas>',
})
export class FlowFieldEffectComponent
  extends BaseCanvas
  implements AfterViewInit, OnDestroy
{
  @ViewChild('canvas', { static: false })
  canvas!: ElementRef<HTMLCanvasElement>;

  private flowField!: FlowFieldEffect;

  constructor() {
    super();
  }

  ngAfterViewInit(): void {
    this.setupCanvas();

    this.flowField = new FlowFieldEffect(this.context, this.WIDTH, this.HEIGHT);
  }

  protected draw(): void {
    console.log('running');
    this.context.fillStyle = 'black';
    this.context.fillRect(0, 0, this.WIDTH, this.HEIGHT);
    this.flowField.update(this.mouseX, this.mouseY); 
  }

  ngOnDestroy(): void {
    this.disposeCanvas();
    this.subscriptions.unsubscribe();
  }
}

class FlowFieldEffect {
  private cellSize: number = 8;
  private radius: number = 0;
  private vr: number = 0.03;

  constructor(
    private context: CanvasRenderingContext2D,
    private readonly width: number,
    private readonly height: number
  ) {
    this.context.lineWidth = 0.3;
    this.context.strokeStyle = this.createGradient();
  }

  public update(mouseX: number, mouseY: number) {
    this.radius += this.vr;
    if (this.radius > 5 || this.radius < -5) {
      this.vr *= -1;
    }
    for (let y = 0; y < this.height; y += this.cellSize) {
      for (let x = 0; x < this.width; x += this.cellSize) {
        const angle =
          (Math.sin(x * mouseX * 0.00005) + Math.cos(y * mouseY * 0.00003)) *
          this.radius;
        this.drawLine(angle, x, y, mouseX, mouseY);
      }
    }
  }

  public drawLine(
    angle: number,
    x: number,
    y: number,
    mouseX: number,
    mouseY: number
  ) {
    // let dist = (mouseX - x) * (mouseX - x) + (mouseY - y) * (mouseY - y);
    // if (dist > 600000) {
    //   dist = 600000;
    // } else if (dist < 50000) {
    //   dist = 50000;
    // }
    let length = 250;

    this.context.beginPath();
    this.context.moveTo(x, y);
    this.context.lineTo(
      x + Math.cos(angle) * length,
      y + Math.sin(angle) * length
    );
    this.context.stroke();
  }

  private createGradient(): CanvasGradient {
    const gradient = this.context.createLinearGradient(
      0,
      0,
      this.width,
      this.height
    );
    gradient.addColorStop(0.1, '#ff5c33');
    gradient.addColorStop(0.2, '#ff66b3');
    gradient.addColorStop(0.4, '#ccccff');
    gradient.addColorStop(0.6, '#b3ffff');
    gradient.addColorStop(0.8, '#80ff80');
    gradient.addColorStop(0.9, '#ffff33');
    return gradient;
  }
}
