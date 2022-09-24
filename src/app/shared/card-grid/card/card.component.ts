import { Component, Input } from '@angular/core';

@Component({
  selector: 'mathL-card',
  templateUrl: './card.component.html',
  styleUrls:['./card.component.scss']
})
export class CardComponent {
  @Input('icon') icon: string | undefined;
  @Input('title') title!: string;
  @Input('subtitle') subtitle: string | undefined;
  @Input('description') description: string | undefined;
}
