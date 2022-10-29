import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { from, fromEvent } from 'rxjs';
import { BaseCanvas } from 'src/app/shared/canvas/base-canvas';
import { MathL } from 'src/app/shared/math-formulas/utilities';

@Component({
  template: '<canvas #canvas></canvas>',
})
export class SnakeComponent
  extends BaseCanvas
  implements AfterViewInit, OnDestroy
{
  @ViewChild('canvas', { static: false })
  canvas!: ElementRef<HTMLCanvasElement>;

  private snake!: Snake;
  private keyDown: any = { keyCode: 39 };
  private foodPos!: Food;
  constructor() {
    super();
  }

  ngAfterViewInit(): void {
    this.setupCanvas();
    this.snake = new Snake(this.context, this.WIDTH, this.HEIGHT);
    this.foodPos = this.snake.randomizeFood();
    this.subscriptions.add(
      fromEvent(document, 'keydown').subscribe((data) => {
        this.keyDown = data;
      })
    );
  }

  protected draw(): void {
    this.frameRate(10);

    this.snake.keyControls(this.keyDown);
    if (this.snake.eat(this.foodPos)) {
      this.foodPos = this.snake.randomizeFood();
    }
    this.snake.death();
    this.snake.update();
    this.snake.show();
    this.snake.drawFood(this.foodPos);
  }

  ngOnDestroy(): void {
    this.disposeCanvas();
    this.subscriptions.unsubscribe();
  }
}

type SnakeModel = {
  x: number;
  y: number;
  speedX: number;
  speedY: number;
  total: number;
  tail: SnakeTail[];
};
type SnakeTail = {
  x: number;
  y: number;
};
type Food = {
  x: number;
  y: number;
};
class Snake {
  private cols: number;
  private rows: number;
  private scale: number = 20;
  private snake: SnakeModel;
  constructor(
    private readonly context: CanvasRenderingContext2D,
    private readonly width: number,
    private readonly height: number
  ) {
    this.cols = Math.floor(width / this.scale);
    this.rows = Math.floor(height / this.scale);
    this.context.strokeStyle = 'pink';
    this.context.fillStyle = 'pink';

    this.snake = {
      x: this.scale,
      y: 0,
      speedX: 1,
      speedY: 0,
      total: 1,
      tail: [],
    };
  }

  public randomizeFood(): Food {
    const x = Math.floor(this.cols * Math.random()) * this.scale;
    const y = Math.floor(this.rows * Math.random()) * this.scale;
    return { x: x, y: y };
  }

  public drawFood(foodPos: Food): void {
    this.context.beginPath();
    this.context.rect(foodPos.x, foodPos.y, this.scale, this.scale);
    this.context.stroke();
    this.context.fill();
    this.context.closePath();
  }

  update() {
    if (this.snake.total === this.snake.tail.length) {
      //update array to get data from the next segment
      for (let i = 0; i < this.snake.tail.length; i++) {
        this.snake.tail[i] = this.snake.tail[i + 1];
      }
    }
    //last segment body takes data from the head pos
    this.snake.tail[this.snake.total - 1] = {
      x: this.snake.x,
      y: this.snake.y,
    };

    this.snake.x = MathL.clamp(this.snake.x, 0, this.width - this.scale);
    this.snake.y = MathL.clamp(this.snake.y, 0, this.height - this.scale);
  }

  public eat(food: Food): boolean {
    const dist = MathL.dist(this.snake.x, this.snake.y, food.x, food.y);
    if (dist < 10) {
      this.snake.total += 1;
      return true;
    }
    return false;
  }

  public death() {
    for (const tail of this.snake.tail) {
      var d = MathL.dist(this.snake.x, this.snake.y, tail.x, tail.y);
      if (d < 1) {
        this.snake.total = 1;
        this.snake.tail = [];
      }
    }
  }

  public keyControls(event: any): void {
    if (event.keyCode === 40) {
      //down
      this.direction(0, 1);
    }
    if (event.keyCode === 38) {
      //up
      this.direction(0, -1);
    }
    if (event.keyCode === 37) {
      //left
      this.direction(-1, 0);
    }
    if (event.keyCode === 39) {
      //right
      this.direction(1, 0);
    }
  }

  public show() {
    this.context.clearRect(0, 0, this.width, this.height);
    for (const body of this.snake.tail) {
      this.context.beginPath();
      this.context.strokeStyle = 'pink';
      this.context.fillStyle = 'black';
      this.context.rect(body.x, body.y, this.scale, this.scale);
      this.context.stroke();
      this.context.fill();
      this.context.closePath();
    }
    this.context.beginPath();
    this.context.strokeStyle = 'red';
    this.context.fillStyle = 'red';
    this.context.rect(this.snake.x, this.snake.y, this.scale, this.scale);
    this.context.stroke();
    this.context.fill();
    this.context.closePath();
  }

  public direction(xspeed: number, yspeed: number): void {
    this.snake.x += xspeed * this.scale;
    this.snake.y += yspeed * this.scale;
  }
}
