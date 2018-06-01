// global

var wordDiv = document.querySelector("#div-word");
var guessedDiv = document.querySelector("#div-guessed");
var winsCount = 0;
var lossesCount = 0;

// game object

var game = {
    word: [],
    displayWord: [],
    guessed: [],
    guessedWrong: ["a", "b", "c", "d"],
    lifeLeft: 5,
    gameWon: false,
    wrongGuess: true,

    // this function runs when the user guess a letter
    
    guess: function(letterGuess) {

        // check if each letter in word matches the guess.
        // wrongGuess starts true, changes to false if letter matches

        wrongGuess = true;

        for(i = 0; i < this.word.length; i++) {
            if(this.word[i] == letterGuess) {
                this.displayWord[i] = this.word[i];
                wrongGuess = false;
            }
        }

        if (wrongGuess) {
            this.guessedWrong.push(letterGuess);
            this.lifeLeft -= 1;
        }

        console.log(this.lifeLeft);

        this.guessed.push(letterGuess);

        // if no guesses left, new round

        if (this.lifeLeft == 0) {
            alert("You lose!");
            lossesCount += 1;
            newRound("blue");
        }

        // if word guessed, new round

        if (this.displayWord.indexOf("_") == "-1") {
            alert("You win!");
            winsCount += 1;
            newRound("yellow");
        }


        this.updateScreen();
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

 var wordIn = "orange";
 newRound(wordIn);

// listen for user pressing a letter
 
 document.onkeyup = function(event) {

    var userGuess = event.key.toLowerCase();
    game.guess(userGuess);

 }

 
 // this function starts a new round of the game

 function newRound(wordIn) {

    // reset values in game object
    
    game.word = [];
    game.displayWord = [];
    game.guessed = [];
    game.guessedWrong = [];
    game.lifeLeft = 5;
    game.gameWon = false;
    game.wrongGuess = true;

    // fill arrays for word and displayWord
    
    for(i=0; i < wordIn.length; i++) {
        game.word.push(wordIn[i]);
    }

    console.log(game.word);

    for(i=0; i < wordIn.length; i++) {
        game.displayWord.push("_");
    }

    console.log(game.displayWord);

    game.updateScreen();
 }

