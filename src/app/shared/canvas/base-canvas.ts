import { ElementRef } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';

export class BaseCanvas {
  protected context!: CanvasRenderingContext2D;

  protected subscriptions: Subscription = new Subscription();

  protected baseCanvas!: HTMLCanvasElement;

  protected WIDTH: number = 0;
  protected HEIGHT: number = 0;

  protected mouseX: number = 0;
  protected mouseY: number = 0;

  protected initializeCanvas(
    baseCanvas: ElementRef<HTMLCanvasElement>,
    draw: () => void
  ): void {
    this.baseCanvas = baseCanvas.nativeElement;
    this.context = this.baseCanvas.getContext('2d')!;

    this.getMousePosition();
    this.resizeCanvas();

    this.subscriptions.add(
      fromEvent(window, 'resize').subscribe((e) => {
        this.resizeCanvas();
        draw();
      })
    );
    draw();
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

  protected dispose(): void {
    this.baseCanvas.remove();
    this.subscriptions.unsubscribe();
  }

  private resizeCanvas(): void {
    this.baseCanvas.width = window.innerWidth;
    this.baseCanvas.height = window.innerHeight;
    this.WIDTH = window.innerWidth;
    this.HEIGHT = window.innerHeight;
  }
}
