// Card class to represent a single card
class Card {
    constructor(suit, value) {
        this.suit = suit;
        this.value = value;
    }
}

// Deck class to represent a deck of cards
class Deck {
    constructor() {
        this.cards = [];
        this.createDeck();
        this.shuffle();
    }

    // Create a standard deck of 52 cards
    createDeck() {
        let suits = ["Spades 🗡️", "Hearts ❤️", "Diamonds 💎", "Clubs 🍀"];
        let values = [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"];
        
        for (let suit of suits) {
            for (let value of values) {
                this.cards.push(new Card(suit, value));
            }
        }
    }

    // Shuffle the deck
    shuffle() {
        for (let i = this.cards.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
    }

    // Deal cards to players
    deal() {
        return this.cards.splice(0, 26); // Deal 26 cards
    }
}

// Player class to represent each player
class Player {
    constructor(name) {
        this.name = name;
        this.hand = [];
        this.points = 0;
    }

    // Play a card from the player's hand
    playCard() {
        return this.hand.shift();
    }
}

// Game class to manage the game logic
class Game {
    constructor(player1Name, player2Name) {
        this.player1 = new Player(player1Name);
        this.player2 = new Player(player2Name);
        this.deck = new Deck();
        this.startGame();
    }

    // Start the game by dealing cards to players
    startGame() {
        this.player1.hand = this.deck.deal();
        this.player2.hand = this.deck.deal();
        this.playGame();
    }

    // Play the game
    playGame() {
        for (let i = 0; i < 26; i++) {
            let card1 = this.player1.playCard();
            let card2 = this.player2.playCard();

            console.log(`${this.player1.name} plays ${card1.value} of ${card1.suit}`);
            console.log(`${this.player2.name} plays ${card2.value} of ${card2.suit}`);

            if (this.getCardValue(card1.value) > this.getCardValue(card2.value)) {
                this.player1.points++;
                console.log(`${this.player1.name} wins this round!`);
            } else if (this.getCardValue(card1.value) < this.getCardValue(card2.value)) {
                this.player2.points++;
                console.log(`${this.player2.name} wins this round!`);
            } else {
                console.log("It's a tie!");
            }

            console.log(`${this.player1.name} points: ${this.player1.points}, ${this.player2.name} points: ${this.player2.points}`);
            console.log("------------------------------------------------");
        }
        this.determineWinner();
    }

    // Determine the numeric value of a card
    getCardValue(value) {
        if (typeof value === 'number') {
            return value;
        } else if (value === 'J') {
            return 11;
        } else if (value === 'Q') {
            return 12;
        } else if (value === 'K') {
            return 13;
        } else if (value === 'A') {
            return 14;
        }
    }

    // Determine and display the winner
    determineWinner() {
        console.log("Game Over!");
        console.log(`${this.player1.name} points: ${this.player1.points}, ${this.player2.name} points: ${this.player2.points}`);

        if (this.player1.points > this.player2.points) {
            console.log(`${this.player1.name} wins the game!`);
        } else if (this.player1.points < this.player2.points) {
            console.log(`${this.player2.name} wins the game!`);
        } else {
            console.log("The game is a tie!");
        }
    }
}

// Run the game
let game = new Game("Player 1", "Player 2");

