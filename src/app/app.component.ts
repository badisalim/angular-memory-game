import { Component, OnInit } from '@angular/core';
import { takeUntil, filter } from 'rxjs/operators';

import { BOARD_HEIGHT, BOARD_WIDTH } from './settings';
import { CardService } from './services/card.service';
import { Card } from './components/card/models'
import { shuffle } from './helpers/array';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit {
  cards;
  boardW = new Array(BOARD_WIDTH);
  boardH = new Array(BOARD_HEIGHT);
  unsolved;
  lastClicked;  
  revealedCards;
  cardIndex;
  waiting;
  clicks;

  constructor(private cardService: CardService) {}

  ngOnInit() {
    this.initGame();    
  }

  initGame() {
    this.clicks = 0;
    this.waiting = false;
    this.cards = [];
    this.lastClicked = null;  
    this.revealedCards = 0;
    this.cardIndex = 0;
    this.unsolved = Math.floor(BOARD_WIDTH * BOARD_HEIGHT / 2);
    this.cardService.getImageList().subscribe(data => {      
      data.map(item => {        
        this.cards.push(new Card(this.cardIndex, item.id));
        this.cards.push(new Card(this.cardIndex + 1, item.id));
        this.cardIndex +=2;
      });      
      this.cards = shuffle(this.cards);
    });  
  }

  handleCardClick([id, imageId]) { 
    if (!this.waiting) {
      this.clicks++;      
      if (!this.isCardShown(id)) {
        this.showCard(id);
        if (this.lastClicked != null && this.lastClicked === imageId) {
          this.unsolved--;              
          this.lastClicked = null;      
          this.revealedCards = 0;       
        } else {                 
          this.revealedCards++;
          if (this.revealedCards == 2) {
            this.waiting = true;
            setTimeout(() => {
              this.hideCard(id);          
              this.hideCardByImageId(this.lastClicked);
              this.revealedCards = 0;       
              this.lastClicked = null;      
              this.waiting = false;     
            }, 1000);
          } else {       
            this.lastClicked = imageId;  
          }                   
        }              
      }   
    }        
  }

  showCard(id: number): void {
    this.cards.map(card => card.id === id ? card.revealed = true : true)
  }

  hideCard(id: number): void {
    this.cards.map(card => card.id === id ? card.revealed = false : true)
  }

  hideCardByImageId(imageId: string): void {
    this.cards.map(card => card.imageId === imageId ? card.revealed = false : true)
  }

  isCardShown(id): boolean {
    return this.cards.find(card => card.id === id).revealed;
  } 
}
