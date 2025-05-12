import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CardColor } from './card.types';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  @Input('title') title: string = '';
  @Input('content') content: string = '';
  @Input('color') color: CardColor = 'gray';
}
