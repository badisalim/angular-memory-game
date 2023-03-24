The board dimension is configured in settings.ts. You can change these values to increase/decrease the difficulty level of the game.

The card model is as below:

id: id value of the card   
imageId: the image ID from picsum.photos
revealed: regulates if this card is facing upward or downward

getImageList() in CardService will return a list of images to be used as card faces. There is a helper function in /helpers which is used to shuffle the card deck. 

To keep it simple, I have decided not to use state management in this game. All game logic and state are maintained in app.component.ts. 

