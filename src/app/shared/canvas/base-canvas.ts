import { ElementRef } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';

export abstract class BaseCanvas {
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
        this.resizeCanvas();
        this.requestFrame();
      })
    );
    this.requestFrame();
  }

  private requestFrame(): void {
    this.draw();
    requestAnimationFrame(this.requestFrame.bind(this));
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
