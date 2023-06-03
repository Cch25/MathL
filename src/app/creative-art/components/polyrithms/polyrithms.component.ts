import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { BaseCanvas } from 'src/app/shared/canvas/base-canvas';
import { Arc, Base, Pos, Settings } from './types/poly-type';
import { PolyMath } from './helper/poly-math.helper';

@Component({
  selector: 'mathL-polyrithms',
  templateUrl: './polyrithms.component.html',
  styleUrls: ['./polyrithms.component.scss'],
})
export class PolyrithmsComponent
  extends BaseCanvas
  implements AfterViewInit, OnDestroy
{
  @ViewChild('canvas', { static: false })
  protected override canvas!: ElementRef<HTMLCanvasElement>;

  private readonly colors: string[] = Array(21).fill('#A6C48A');
  private arcs: Arc[] = [];
  private settings: Settings = {
    startTime: new Date().getTime(), // This can be in the future
    duration: 900, // Total time for all dots to realign at the starting point
    maxCycles: Math.max(this.colors.length, 100), // Must be above colors.length or else...
    pulseEnabled: true, // Pulse will only show if sound is enabled as well
    instrument: 'vibraphone',
  };

  private polyMath!: PolyMath;

  constructor() {
    super();
  }
  
  ngAfterViewInit(): void {
    this.setupCanvas();
    this.polyMath = new PolyMath(this.settings, this.colors, this.context);
    this.initArcs();
  }

  ngOnDestroy(): void {
    this.disposeCanvas();
  }

  private initArcs() {
    this.context.lineCap = 'round';

    this.arcs = this.colors.map((color, index) => {
      const velocity = this.polyMath.calculateVelocity(index);
      const lastImpactTime = 0;
      const nextImpactTime = this.polyMath.calculateNextImpactTime(
        this.settings.startTime,
        velocity
      );

      return {
        color,
        velocity,
        lastImpactTime,
        nextImpactTime,
      } as Arc;
    });
  }

  protected override draw(): void {
    this.canvas.nativeElement.width = this.canvas.nativeElement.clientWidth;
    this.canvas.nativeElement.height = this.canvas.nativeElement.clientHeight;

    const currentTime = new Date().getTime();
    const elapsedTime = (currentTime - this.settings.startTime) / 1000;

    const length =
      Math.min(
        this.canvas.nativeElement.width,
        this.canvas.nativeElement.height
      ) * 0.9;

    const offset = (this.canvas.nativeElement.width - length) / 2;

    const start: Pos = {
      x: offset,
      y: this.canvas.nativeElement.height / 2,
    };

    const end: Pos = {
      x: this.canvas.nativeElement.width - offset,
      y: this.canvas.nativeElement.height / 2,
    };

    const center: Pos = {
      x: this.canvas.nativeElement.width / 2,
      y: this.canvas.nativeElement.height / 2,
    };

    const base: Base = {
      length: end.x - start.x,
      minAngle: 0,
      startAngle: 0,
      maxAngle: 2 * Math.PI,
    } as Base;

    base.initialRadius = base.length * 0.05;
    base.circleRadius = base.length * 0.006;
    base.clearance = base.length * 0.03;
    base.spacing =
      (base.length - base.initialRadius - base.clearance) /
      2 /
      this.colors.length;

    this.arcs.forEach((arc, index) => {
      const radius = base.initialRadius + base.spacing * index;

      // Draw arcs
      this.context.globalAlpha = this.polyMath.determineOpacity(
        currentTime,
        arc.lastImpactTime,
        0.15,
        0.65,
        1000
      );
      this.context.lineWidth = base.length * 0.002;
      this.context.strokeStyle = arc.color;

      const offset = (base.circleRadius * (5 / 3)) / radius;

      this.polyMath.drawArc(
        center.x,
        center.y,
        radius,
        Math.PI + offset,
        2 * Math.PI - offset
      );

      this.polyMath.drawArc(
        center.x,
        center.y,
        radius,
        offset,
        Math.PI - offset
      );

      // Draw impact points
      this.context.globalAlpha = this.polyMath.determineOpacity(
        currentTime,
        arc.lastImpactTime,
        0.15,
        0.85,
        1000
      );
      this.context.fillStyle = arc.color;

      this.polyMath.drawPointOnArc(
        center,
        radius,
        base.circleRadius * 0.75,
        Math.PI
      );

      this.polyMath.drawPointOnArc(
        center,
        radius,
        base.circleRadius * 0.75,
        2 * Math.PI
      );

      // Draw moving circles
      this.context.globalAlpha = 1;
      this.context.fillStyle = arc.color;

      if (currentTime >= arc.nextImpactTime) {
        this.polyMath.playKey(index);
        arc.lastImpactTime = arc.nextImpactTime;
        arc.nextImpactTime = this.polyMath.calculateNextImpactTime(
          arc.nextImpactTime,
          arc.velocity
        );
      }

      const distance = elapsedTime >= 0 ? elapsedTime * arc.velocity : 0;
      const angle = (Math.PI + distance) % base.maxAngle;

      this.polyMath.drawPointOnArc(center, radius, base.circleRadius, angle);
    });
  }
}
