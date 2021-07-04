/* 

Write your guess-game code here! Don't forget to look at the test specs as a guide. You can run the specs
by running "npm test".

In this file, you will also include the event listeners that are needed to interact with your HTML file when
a user clicks a button or adds a guess to the input field.
 x A number between 1-100 will be randomly generated and is the winning number.
xThe player inputs their guess in a text input field and then submits their guess.
If the number submitted is the winning number, the player wins! Otherwise, they are allowed to try again.
The game should give the player a hint after each guess, helping them know whether to guess lower or higher and how close they are.
After five unsuccessful guesses, the game is over, and the player loses
*/

document.getElementById('');

class Game {
    constructor() {
        this.playersGuess = null;
        this.winningNumber = generateWinningNumber();
        this.pastGuesses = [];
    }
    // The difference will be the input subtracted by the randomly generated winning number
    difference() {
        return Math.abs(this.playersGuess - this.winningNumber);
    }

    isLower() {
        // If the input is lower than the generated number
        if (this.playersGuess < this.winningNumber) {
            return true;
        } else {
            return false;
        }
    }

    playersGuessSubmission(num) {
        // If the input is valid, then checkGuess it, otherwise return invalid message
        if (num > 100 || num < 1 || isNaN(num)) {
            document.getElementById('message').innerHTML = `Sorry, ${num} isn't a valid input.`;
            throw `That is an invalid guess.`;
        } else {
            this.playersGuess = num;
        }
        return this.checkGuess();
    }

    checkGuess() {
        // This is where we decide what message is outputted when an input is accepted

        let messageDisplay = '';

        if (parseInt(this.playersGuess) === this.winningNumber) {
            messageDisplay = 'You guessed it! Ok psychic I see you!';
            document.getElementById('submit').disabled = true;
        }
        else if(this.pastGuesses.includes(this.playersGuess)) {
            messageDisplay = 'You already picked this one!';
        }
        else {
            this.pastGuesses.push(this.playersGuess);
            if (this.pastGuesses.length === 5) {
                messageDisplay =`Good game.. the answer was ${this.winningNumber}!`;
            } else {
                let diffNum = this.difference();
                if(diffNum < 10) {
                    messageDisplay = "As hot as Lebron in the playoffs";
                }
                else if(diffNum < 25) {
                    messageDisplay = "Heating up";
                }
                else if(diffNum < 50) {
                    messageDisplay = "60 degrees type weather..chilly";
                }
                else {
                    messageDisplay = "BRRRRRRRRR";
                }
            }
        }
        document.getElementById('message').innerHTML = messageDisplay;
        document.querySelector(`#guess-list li:nth-child(${this.pastGuesses.length})`).innerHTML = this.playersGuess;
    }
}
// This is how we are generating a random number between 1-100
function generateWinningNumber() {
    let correctGuess = Math.floor(Math.random() * 100) + 1;
    return correctGuess;
}
// Shuffles the array
function shuffle(array) {
    for (i = array.length - 1; i > 0; i--) {
        let random = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[random];
        array[random] = temp;
    }
    return array;
}

function newGame() {
    return new Game();
}
// Initializing 
function playGame() {
    const game = newGame();

    const button = document.getElementById('submit');
    const inputEnter = document.getElementById('player-input');

    button.addEventListener('click', function() {
        const playersGuess = document.getElementById('player-input').value;
        document.querySelector('input').value = '';

        game.playersGuessSubmission(playersGuess);
    });

}
// Refreshing the page will load a new game
function refreshPage() {
    window.location.reload();
}

playGame();



