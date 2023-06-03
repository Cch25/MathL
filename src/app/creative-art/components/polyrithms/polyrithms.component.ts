import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { BaseCanvas } from 'src/app/shared/canvas/base-canvas';

type Pos = {
  x: number;
  y: number;
};

type Settings = {
  startTime: number;
  duration: number;
  maxCycles: number;
  pulseEnabled: boolean;
  instrument: 'default' | 'wave' | 'vibraphone';
};

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

  @ViewChild('sound-toggle', { static: false })
  protected soundToggle!: any;

  toggles = {
    sound: this.soundToggle,
  };

  private readonly colors = Array(21).fill('#A6C48A');
  private arcs: any[] = [];
  private settings: Settings = {
    startTime: new Date().getTime(), // This can be in the future
    duration: 900, // Total time for all dots to realign at the starting point
    maxCycles: Math.max(this.colors.length, 100), // Must be above colors.length or else...
    pulseEnabled: true, // Pulse will only show if sound is enabled as well
    instrument: 'vibraphone',
  };

  constructor() {
    super();
  }

  ngAfterViewInit(): void {
    this.setupCanvas();
    this.init();
  }

  ngOnDestroy(): void {
    this.disposeCanvas();
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

    const base: any = {
      length: end.x - start.x,
      minAngle: 0,
      startAngle: 0,
      maxAngle: 2 * Math.PI,
    };

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
      this.context.globalAlpha = this.determineOpacity(
        currentTime,
        arc.lastImpactTime,
        0.15,
        0.65,
        1000
      );
      this.context.lineWidth = base.length * 0.002;
      this.context.strokeStyle = arc.color;

      const offset = (base.circleRadius * (5 / 3)) / radius;

      this.drawArc(
        center.x,
        center.y,
        radius,
        Math.PI + offset,
        2 * Math.PI - offset
      );

      this.drawArc(center.x, center.y, radius, offset, Math.PI - offset);

      // Draw impact points
      this.context.globalAlpha = this.determineOpacity(
        currentTime,
        arc.lastImpactTime,
        0.15,
        0.85,
        1000
      );
      this.context.fillStyle = arc.color;

      this.drawPointOnArc(center, radius, base.circleRadius * 0.75, Math.PI);

      this.drawPointOnArc(
        center,
        radius,
        base.circleRadius * 0.75,
        2 * Math.PI
      );

      // Draw moving circles
      this.context.globalAlpha = 1;
      this.context.fillStyle = arc.color;

      if (currentTime >= arc.nextImpactTime) {
        this.playKey(index);
        arc.lastImpactTime = arc.nextImpactTime;
        arc.nextImpactTime = this.calculateNextImpactTime(
          arc.nextImpactTime,
          arc.velocity
        );
      }

      const distance = elapsedTime >= 0 ? elapsedTime * arc.velocity : 0;
      const angle = (Math.PI + distance) % base.maxAngle;

      this.drawPointOnArc(center, radius, base.circleRadius, angle);
    });
  }

  private getFileName(index: number): string {
    if (this.settings.instrument === 'default') return `key-${index}`;

    return `${this.settings.instrument}-key-${index}`;
  }

  private getUrl(index: number): string {
    return `https://assets.codepen.io/1468070/${this.getFileName(index)}.wav`;
  }

  keys: any[] = this.colors.map((_, index) => {
    const audio = new Audio(this.getUrl(index));
    audio.volume = 0.15;
    return audio;
  });

  private playKey(index: number) {
    this.keys[index].play();
  }

  private calculateVelocity(index: number): number {
    const numberOfCycles = this.settings.maxCycles - index;
    const distancePerCycle = 2 * Math.PI;
    return (numberOfCycles * distancePerCycle) / this.settings.duration;
  }

  private calculateNextImpactTime(currentImpactTime: number, velocity: number) {
    return currentImpactTime + (Math.PI / velocity) * 1000;
  }

  private calculateDynamicOpacity(
    currentTime: number,
    lastImpactTime: number,
    baseOpacity: number,
    maxOpacity: number,
    duration: number
  ) {
    const timeSinceImpact = currentTime - lastImpactTime;
    const percentage = Math.min(timeSinceImpact / duration, 1);
    const opacityDelta = maxOpacity - baseOpacity;

    return maxOpacity - opacityDelta * percentage;
  }

  private determineOpacity(
    currentTime: number,
    lastImpactTime: number,
    baseOpacity: number,
    maxOpacity: number,
    duration: number
  ) {
    if (!this.settings.pulseEnabled) {
      return baseOpacity;
    }
    return this.calculateDynamicOpacity(
      currentTime,
      lastImpactTime,
      baseOpacity,
      maxOpacity,
      duration
    );
  }

  private calculatePositionOnArc(center: Pos, radius: number, angle: number) {
    return {
      x: center.x + radius * Math.cos(angle),
      y: center.y + radius * Math.sin(angle),
    };
  }

  private init() {
    this.context.lineCap = 'round';

    this.arcs = this.colors.map((color, index) => {
      const velocity = this.calculateVelocity(index);
      const lastImpactTime = 0;
      const nextImpactTime = this.calculateNextImpactTime(
        this.settings.startTime,
        velocity
      );

      return {
        color,
        velocity,
        lastImpactTime,
        nextImpactTime,
      };
    });
  }

  private drawArc(
    x: number,
    y: number,
    radius: number,
    start: number,
    end: number,
    action: string = 'stroke'
  ) {
    this.context.beginPath();

    this.context.arc(x, y, radius, start, end);
    if (action === 'stroke') {
      this.context.stroke();
    } else {
      this.context.fill();
    }
  }

  private drawPointOnArc(
    center: Pos,
    arcRadius: number,
    pointRadius: number,
    angle: number
  ) {
    const position = this.calculatePositionOnArc(center, arcRadius, angle);

    this.drawArc(position.x, position.y, pointRadius, 0, 2 * Math.PI, 'fill');
  }
}
