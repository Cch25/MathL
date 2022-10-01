import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  Renderer2,
} from '@angular/core';
import { ChartOptions } from '../components/bar-template/bar-template.component';

@Directive({
  selector: '[barhover]',
})
export class BarHoverDirective implements OnInit {
  @Input() barhover!: ChartOptions;

  constructor(private elRef: ElementRef, private renderer2: Renderer2) {}
  ngOnInit(): void {
    console.log(this.barhover);
  }
  @HostListener('mouseenter') onMouseEnter() {
    this.renderer2.setStyle(this.elRef.nativeElement, 'border', '1px dashed black');
     
  } 

  @HostListener('mouseout') onMouseOut() {
    this.renderer2.setStyle(this.elRef.nativeElement, 'border', 'none');
   
  }
}
