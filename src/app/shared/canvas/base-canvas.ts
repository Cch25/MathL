import { ElementRef } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';

export abstract class BaseCanvas {
  private lastTime: number = 0;
  private interval: number = 1000 / 60;
  private timer: number = 0;
  private animationFrame!: number;

  protected context!: CanvasRenderingContext2D;
  protected subscriptions: Subscription = new Subscription();
  protected WIDTH: number = 0;
  protected HEIGHT: number = 0;
  protected mouseX: number = 0;
  protected mouseY: number = 0;

  protected abstract canvas: ElementRef<HTMLCanvasElement>;

  protected abstract draw(): void;

  protected get canvasEl() {
    return this.canvas.nativeElement;
  }

  protected setupCanvas(): void {
    this.context = this.canvas.nativeElement.getContext('2d')!;

    this.getMousePosition();
    this.resizeCanvas();
    this.subscriptions.add(
      fromEvent(window, 'resize').subscribe((e) => {
        cancelAnimationFrame(this.animationFrame);
        this.resizeCanvas();
        this.requestFrame(0);
      })
    );
    cancelAnimationFrame(this.animationFrame);
    this.requestFrame(0);
  }

  public frameRate(fps: number) {
    this.interval = 1000 / fps;
  }

  private requestFrame(timestamp: number): void {
    const deltaTime = timestamp - this.lastTime;
    this.lastTime = timestamp;
    if (this.timer >= this.interval) {
      this.draw();
      this.timer = 0;
    } else {
      this.timer += deltaTime;
    }
    this.animationFrame = requestAnimationFrame(this.requestFrame.bind(this));
  }

  private getMousePosition(): void {
    this.subscriptions.add(
      fromEvent(document, 'mousemove').subscribe({
        next: (e: any) => {
          this.mouseX = e.clientX;
          this.mouseY = e.clientY;
        },
        error: () => {
          this.mouseX = this.WIDTH / 2;
          this.mouseY = this.HEIGHT / 2;
        },
      })
    );
  }

  protected disposeCanvas(): void {
    cancelAnimationFrame(this.animationFrame);
    this.canvas.nativeElement.remove();
    this.subscriptions.unsubscribe();
  }

  private resizeCanvas(): void {
    this.canvas.nativeElement.width = window.innerWidth;
    this.canvas.nativeElement.height = window.innerHeight;
    this.WIDTH = window.innerWidth;
    this.HEIGHT = window.innerHeight;
  }
}
