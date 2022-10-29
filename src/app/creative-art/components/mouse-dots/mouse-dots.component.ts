import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { fromEvent, interval, Subscription, throttle, timer } from 'rxjs';
import { BaseCanvas } from 'src/app/shared/canvas/base-canvas';
import { MathL } from 'src/app/shared/math-formulas/utilities';

@Component({
  template: '<canvas #canvas></canvas>',
})
export class MouseDotsComponent
  extends BaseCanvas
  implements AfterViewInit, OnDestroy
{
  @ViewChild('canvas', { static: false })
  canvas!: ElementRef<HTMLCanvasElement>;

  private particles: Particle[] = [];
  constructor() {
    super();
  }

  ngAfterViewInit(): void {
    this.setupCanvas();
    for (let i = 0; i < 20; i++) {
      this.particles.push(
        new Particle(this.context, this.WIDTH / 2, this.HEIGHT / 2)
      );
    }

    this.subscriptions.add(
      fromEvent(window, 'mousemove')
        .pipe(throttle(() => interval(60)))
        .subscribe((data) => {
          for (let i = 0; i < 10; i++) {
            this.particles.push(
              new Particle(this.context, this.mouseX, this.mouseY)
            );
          }
        })
    );
  }

  protected draw(): void {
    this.context.fillStyle = 'black';
    this.context.fillRect(0, 0, this.WIDTH, this.HEIGHT);
    for (let i = 0; i < this.particles.length; i++) {
      this.particles[i].update();
      this.particles[i].draw();

      for (let j = i; j < this.particles.length; j++) {
        this.calculateDistance(i, j, this.particles[i].particle.color);
      }
      if (this.particles[i].particle.size < 0.3) {
        this.particles.splice(i, 1);
        i--;
      }
    }
  }

  private calculateDistance(i: number, j: number, color?: string) {
    const dist = MathL.distance(
      {
        x: this.particles[i].particle.x,
        y: this.particles[i].particle.y,
      },
      {
        x: this.particles[j].particle.x,
        y: this.particles[j].particle.y,
      }
    );
    if (dist < 20) {
      this.context.beginPath();
      this.context.strokeStyle = color || 'white';
      this.context.lineWidth = 1;
      this.context.moveTo(
        this.particles[i].particle.x,
        this.particles[i].particle.y
      );
      this.context.lineTo(
        this.particles[j].particle.x,
        this.particles[j].particle.y
      );
      this.context.stroke();
    }
  }

  ngOnDestroy(): void {
    this.disposeCanvas();
    this.subscriptions.unsubscribe();
  }
}
type ParticlePos = {
  x: number;
  y: number;
  speedX: number;
  speedY: number;
  size: number;
  color?: string;
};

class Particle {
  public particle: ParticlePos;
  private hue: number = Math.random() * 180;
  constructor(
    private readonly context: CanvasRenderingContext2D,
    mouseX: number,
    mouseY: number
  ) {
    this.particle = {
      x: mouseX,
      y: mouseY,
      size: Math.random() * 15 + 1,
      speedX: Math.random() * 3 - 1.5,
      speedY: Math.random() * 3 - 1.5,
    };
    interval(2).subscribe((data) => {
      this.hue += 10;
    });
  }

  update() {
    this.particle.x += this.particle.speedX;
    this.particle.y += this.particle.speedY;
    if (this.particle.size > 0.2) {
      this.particle.size -= 0.1;
    }
  }

  draw() {
    this.drawCircle();
  }

  private drawCircle(): void {
    this.context.beginPath();
    this.context.fillStyle = `hsl(${this.hue},100%,50%)`;
    this.particle.color = `hsl(${this.hue},100%,50%)`;
    this.context.arc(
      this.particle.x,
      this.particle.y,
      this.particle.size,
      0,
      Math.PI * 2
    );
    this.context.fill();
  }
}
