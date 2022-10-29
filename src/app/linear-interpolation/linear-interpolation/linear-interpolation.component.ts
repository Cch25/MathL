import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { fromEvent } from 'rxjs';
import { BaseCanvas } from 'src/app/shared/canvas/base-canvas';
import { Lerp } from 'src/app/shared/math-formulas/lerp';

type vPoint = {
  x: number;
  y: number;
  [key: number]: number;
};
type Color = {
  r: number;
  g: number;
  b: number;
};

@Component({
  template: '<canvas #canvas></canvas>',
})
export class LinearInterpolationComponent
  extends BaseCanvas
  implements AfterViewInit, OnDestroy
{
  @ViewChild('canvas', { static: false })
  canvas!: ElementRef<HTMLCanvasElement>;

  private audioContext: AudioContext | null = null;
  private oscilator: OscillatorNode | null = null;

  private pink: Color = { r: 255, g: 105, b: 180 };
  private purple: Color = { r: 148, g: 0, b: 211 };

  constructor() {
    super();
    this.initializeAudioOnClick();
  }

  ngAfterViewInit(): void {
    this.setupCanvas();
  }

  protected draw(): void {
    this.context.clearRect(0, 0, this.WIDTH, this.HEIGHT);
    // const sec = new Date().getTime() / 1000;
    // const step = sec - Math.floor(sec);
    //https://easings.net/
    //https://www.desmos.com/calculator
    const sec = new Date().getTime() / 1000;
    const step = (Math.sin(sec * Math.PI) + 1) / 2;

    const pointA = { x: 100, y: 500 } as vPoint;
    const pointB = { x: this.mouseX, y: this.mouseY } as vPoint;

    this.drawPoint(pointA, 16, 'A');
    this.drawPoint(pointB, 16, 'B');

    const vPoint = Lerp.vLerp(pointA, pointB, step);
    this.drawPoint(vPoint, 8);

    const { r, g, b } = Lerp.vLerp(this.pink, this.purple, step);
    this.canvas.nativeElement.style.backgroundColor = `rgb(${r},${g},${b})`;

    if (this.oscilator) {
      this.oscilator.frequency.value = Lerp.lerp(
        this.mouseX,
        this.mouseY,
        step
      );
    }
  }

  private drawPoint(point: vPoint, size: number, label?: string) {
    this.context.beginPath();
    this.context.fillStyle = 'white';
    this.context.strokeStyle = 'black';
    this.context.arc(point.x, point.y, size, 0, 2 * Math.PI);
    this.context.fill();
    this.context.stroke();
    if (label) {
      this.context.fillStyle = 'black';
      this.context.textAlign = 'center';
      this.context.textBaseline = 'middle';
      this.context.fillText(label, point.x, point.y);
    }
  }

  private initializeAudioOnClick(): void {
    this.subscriptions.add(
      fromEvent(document, 'click').subscribe((e) => {
        if (this.audioContext == null) {
          this.audioContext = new AudioContext();
          this.oscilator = this.audioContext.createOscillator();
          this.oscilator.frequency.value = 321;
          this.oscilator.start();
          const node = this.audioContext.createGain();
          node.gain.value = 0.1;
          this.oscilator.connect(node);
          node.connect(this.audioContext.destination);
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.disposeCanvas();
    this.subscriptions.unsubscribe();
    this.audioContext?.close();
    this.oscilator?.disconnect();
  }
}
