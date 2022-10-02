export class MathL {
  public static normalize(value: number, min: number, max: number): number {
    return (value - min) / (max - min);
  }

  public static roundToNearest(value: number, size: number): number {
    return Math.round(value / size) * size;
  }
}
