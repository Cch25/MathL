export class Lerp {
  public static vLerp(a: any, b: any, t: number): any {
    let result: any = {};
    for (const attr in a) {
      result[attr] = this.lerp(a[attr], b[attr], t);
    }
    return result;
  }

  public static lerp(a: number, b: number, t: number): number {
    return a + (b - a) * t;
  }
}
