// global

var wordDiv = document.querySelector("#div-word");
var guessedDiv = document.querySelector("#div-guessed");
var winsCount = 0;
var lossesCount = 0;
var winSpan = document.querySelector("#span-wins");
var loseSpan = document.querySelector("#span-losses");
var manParts = ['hangman-legR', 'hangman-legL', 'hangman-armR', 'hangman-armL', 'hangman-body', 'hangman-head'];
var noRepeat = [];

var guessable = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
                'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

// game object

var game = {
    color: "",
    word: [],
    displayWord: [],
    guessed: [],
    guessedWrong: [],
    lifeLeft: 5,
    gameWon: false,
    wrongGuess: true,

    // this function runs when the user guess a letter
    
    guess: function(letterGuess) {

        // check if each letter in word matches the guess.
        // wrongGuess starts true, changes to false if letter matches

        wrongGuess = true;
        var checkGuessed = this.guessed.indexOf(letterGuess);
        var checkGuessable = guessable.indexOf(letterGuess);
        if (checkGuessed == "-1" && checkGuessable != "-1") {

            //code only runs if letter has not already been guessed
            //find matching letters, change from "_" in the display word

            for(i = 0; i < this.word.length; i++) {
                if(this.word[i] == letterGuess) {
                    this.displayWord[i] = this.word[i];
                    wrongGuess = false;
                }
            }
    
            if (wrongGuess) {
                this.guessedWrong.push(letterGuess);
    
                // make next body part appear
                var nextPart = document.getElementById(manParts[this.lifeLeft -1]);
                nextPart.style.opacity = 1;
    
                this.lifeLeft -= 1;
            }
    
            this.guessed.push(letterGuess);
    
            // if no guesses left, new round
    
            if (this.lifeLeft == 0) {
                alert("You lose!");
                newRound(chooseColor());
    
                //update score 
                lossesCount += 1;
                loseSpan.innerHTML = "";
                var newSpan = document.createElement("span");
                newSpan.className = "letter tally";
                newSpan.innerHTML = lossesCount;
                loseSpan.appendChild(newSpan);
            }
    
            // if word guessed, new round
    
            if (this.displayWord.indexOf("_") == "-1") {
                alert("You win!");
    
                // change colors
                document.getElementById("section-game").style.borderColor = this.color;
                document.getElementById("section-hangman").style.borderColor = this.color;
                document.getElementById("title").style.borderColor = this.color;
                document.getElementById("score").style.borderColor = this.color;
    
                //update score
                winsCount += 1;
                winSpan.innerHTML = "";
                var newSpan = document.createElement("span");
                newSpan.className = "letter tally";
                newSpan.innerHTML = winsCount;
                winSpan.appendChild(newSpan);

                newRound(chooseColor());
            }
    
            this.updateScreen();
        }

        
    },

    // this function updates the screen after each user guess
    
    updateScreen: function() {

        // empty the "word" and "guessed" areas

        wordDiv.innerHTML = "";
        guessedDiv.innerHTML = "";

        // create divs for each letter in the word array

        for(i=0; i < this.word.length; i++) {
            var newDiv = document.createElement("div");
            newDiv.innerHTML = this.displayWord[i];
            newDiv.className = "letter l" + i;
            wordDiv.appendChild(newDiv);
        }

        // create divs for each letter in the guessedWrong array

        for(i=0; i < this.guessedWrong.length; i++) {
            var newDiv = document.createElement("div");
            newDiv.innerHTML = this.guessedWrong[i];
            newDiv.className = "letter no-bounce";
            guessedDiv.appendChild(newDiv);
        }
    },
} 
 
 // start a new round

 newRound(chooseColor());

// listen for user pressing a letter
 
 document.onkeyup = function(event) {

    var userGuess = event.key.toLowerCase();
    game.guess(userGuess);

 }

 
 // this function starts a new round of the game

 function newRound(wordIn) {

    // reset values in game object
    
    game.color = wordIn;
    game.word = [];
    game.displayWord = [];
    game.guessed = [];
    game.guessedWrong = [];
    game.lifeLeft = 6;
    game.gameWon = false;
    game.wrongGuess = true;

    // reset hanging man

    for(i=0; i < manParts.length; i++) {
        var nextPart = document.getElementById(manParts[i]);
        nextPart.style.opacity = "0";
    }

    // fill arrays for word and displayWord
    
    for(i=0; i < wordIn.length; i++) {
        game.word.push(wordIn[i]);
    }

    for(i=0; i < wordIn.length; i++) {
        game.displayWord.push("_");
    }

    game.updateScreen();
 }

 // this function chooses a random color from the word bank
 
 function chooseColor() {
    var wordBank = ['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'pink'];

    do {
        var j = Math.floor(Math.random() * wordBank.length);
    } while (noRepeat.indexOf(wordBank[j]) != "-1");

    var word = wordBank[j];
    noRepeat.push(word);
    if(noRepeat.length == wordBank.length) {
        noRepeat.shift();
    }

    console.log(noRepeat);
    return word; 
 }

