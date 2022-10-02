import { Point } from '../models/point';
import { Lerp } from './lerp';

export class MathL {
  public static normalize(value: number, min: number, max: number): number {
    return (value - min) / (max - min);
  }

  public static map(
    value: number,
    srcMin: number,
    srcMax: number,
    destMin: number,
    destMax: number
  ): number {
    var n = this.normalize(value, srcMin, srcMax);
    return Lerp.lerp(destMin, destMax, n);
  }

  public static clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max);
  }

  public static distance(pointA: Point, pointB: Point): number {
    var x = pointA.x - pointB.x;
    var y = pointA.y - pointB.y;
    return Math.sqrt(x * x + y * y);
  }

  public static roundToNearest(value: number, size: number): number {
    return Math.round(value / size) * size;
  }

  public static roundToPlaces(value: number, places: number): number {
    // var multiplier = Math.pow(value, places);
    return Math.round(value * places) / places;
  }
}
