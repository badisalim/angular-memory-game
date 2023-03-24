import { Component, Input, Output, EventEmitter } from '@angular/core';

import { ICard } from './models';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})

export class CardComponent {
  @Input() card: ICard;    
  @Output() clicked = new EventEmitter();

  constructor() { }  

  cardClick() {        
    this.clicked.emit([this.card.id, this.card.imageId]);
  }
  
}