export class Lerp {
  public static vLerp(a: any, b: any, t: number): any {
    let result: any = {};
    for (const attr in a) {
      result[attr] = this.lerp(a[attr], b[attr], t);
    }
    return result;
  }

  public static lerp(min: number, max: number, norm: number): number {
    return (max - min) * norm + min;
  }
}
