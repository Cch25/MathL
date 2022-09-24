import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';

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
type MouseEvents = {
  mouseX: number;
  mouseY: number;
};

@Component({
  templateUrl: './linear-interpolation.component.html',
})
export class LinearInterpolationComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvas', { static: false })
  canvas!: ElementRef<HTMLCanvasElement>;

  private context!: CanvasRenderingContext2D;

  private audioContext: AudioContext | null = null;
  private oscilator: OscillatorNode | null = null;

  private mouse!: MouseEvents;

  private pink: Color = { r: 255, g: 105, b: 180 };
  private purple: Color = { r: 148, g: 0, b: 211 };

  private subscriptions: Subscription = new Subscription();
  constructor() {
    this.subscriptions.add(
      fromEvent(document, 'mousemove').subscribe((e: any) => {
        this.mouse = {
          mouseX: e.clientX,
          mouseY: e.clientY,
        };
      })
    );
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
    this.canvas.nativeElement.remove();
    this.subscriptions.unsubscribe();
    this.audioContext?.close();
    this.oscilator?.disconnect();
  }

  ngAfterViewInit(): void {
    this.context = this.canvas.nativeElement.getContext('2d')!;
    this.resizeCanvas();
    this.mouse = {
      mouseX: this.canvas.nativeElement.width / 2,
      mouseY: this.canvas.nativeElement.height / 2,
    };
    this.subscriptions.add(
      fromEvent(window, 'resize').subscribe((e) => {
        this.resizeCanvas();
        this.drawLerp();
      })
    );

    this.drawLerp();
  }

  private resizeCanvas(): void {
    this.canvas.nativeElement.width = window.innerWidth;
    this.canvas.nativeElement.height = window.innerHeight;
  }

  private drawLerp(): void {
    this.context.clearRect(
      0,
      0,
      this.canvas.nativeElement.width,
      this.canvas.nativeElement.height
    );
    // const sec = new Date().getTime() / 1000;
    // const step = sec - Math.floor(sec);
    //https://easings.net/
    const sec = new Date().getTime() / 1000;
    const step = (Math.sin(sec * Math.PI) + 1) / 2;

    const pointA = { x: 100, y: 500 } as vPoint;
    const pointB = { x: this.mouse.mouseX, y: this.mouse.mouseY } as vPoint;

    this.drawPoint(pointA, 16, 'A');
    this.drawPoint(pointB, 16, 'B');

    const vPoint = this.vLerp(pointA, pointB, step);
    this.drawPoint(vPoint, 8);

    const { r, g, b } = this.vLerp(this.pink, this.purple, step);
    this.canvas.nativeElement.style.backgroundColor = `rgb(${r},${g},${b})`;

    if (this.oscilator) {
      this.oscilator.frequency.value = this.lerp(
        this.mouse.mouseX,
        this.mouse.mouseY,
        step
      );
    }

    requestAnimationFrame(this.drawLerp.bind(this));
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

  private vLerp(a: any, b: any, t: number): any {
    let result: any = {};
    for (const attr in a) {
      result[attr] = this.lerp(a[attr], b[attr], t);
    }
    return result;
  }

  private lerp(a: number, b: number, t: number): number {
    return a + (b - a) * t;
  }
}
