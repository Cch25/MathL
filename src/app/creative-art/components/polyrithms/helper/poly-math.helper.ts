import { Pos, Settings } from '../types/poly-type';

export class PolyMath {
  constructor(
    private readonly settings: Settings,
    private readonly colors: Array<string>,
    private readonly context: CanvasRenderingContext2D
  ) {}

  public playKey(index: number) {
    this.keys[index].play();
  }

  public calculateVelocity(index: number): number {
    const numberOfCycles = this.settings.maxCycles - index;
    const distancePerCycle = 2 * Math.PI;
    return (numberOfCycles * distancePerCycle) / this.settings.duration;
  }

  public calculateNextImpactTime(currentImpactTime: number, velocity: number) {
    return currentImpactTime + (Math.PI / velocity) * 1000;
  }

  public determineOpacity(
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

  public drawArc(
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

  public drawPointOnArc(
    center: Pos,
    arcRadius: number,
    pointRadius: number,
    angle: number
  ) {
    const position = this.calculatePositionOnArc(center, arcRadius, angle);

    this.drawArc(position.x, position.y, pointRadius, 0, 2 * Math.PI, 'fill');
  }

  private getFileName(index: number): string {
    if (this.settings.instrument === 'default') return `key-${index}`;

    return `${this.settings.instrument}-key-${index}`;
  }

  private getUrl(index: number): string {
    return `https://assets.codepen.io/1468070/${this.getFileName(index)}.wav`;
  }

  private keys: HTMLAudioElement[] = this.colors.map((_, index) => {
    const audio = new Audio(this.getUrl(index));
    audio.volume = 0.15;
    return audio;
  });

  private calculatePositionOnArc(center: Pos, radius: number, angle: number) {
    return {
      x: center.x + radius * Math.cos(angle),
      y: center.y + radius * Math.sin(angle),
    };
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
}
