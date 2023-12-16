import Game from './Game.js';
import domUpdates from './DOM.js';
import data from './data.js';

let buzzer = new Audio('./audio/Buzzer.mp3');
let chooseSound = new Audio('./audio/choose.mp3');
let ding = new Audio('./audio/Ding.mp3');
let theme = new Audio('./audio/theme.mp3');
let solveSound = new Audio('./audio/solve.mp3');
let spinSound = new Audio('./audio/spin.mp3');
let bankrupt = new Audio('./audio/bankr.mp3');

let game = new Game();
let round;
let puzzle;
let wheel;

$('.file-upload-button').on('click', function () {
  console.log('Upload Button Click');
  const fileInput = document.getElementById('csv-upload');
  fileInput.click(); // Trigger the hidden file input
});
$('#csv-upload').on('change', handleCSVUpload);
$('.start-button').on('click', init);
$('.quit').on('click', quitHandler);
$('.spin-button').on('click', game.setUpWheel);
$('.solve-button').on('click', domUpdates.displaySolvePopup);
$('.solve-input-button').on('click', solveHandler);
$('.spin-text').on('click', () => spinHandler("random"));
$('.vowel-button').on('click', vowelPurchaseHandler);
$('.start-bonus-round').on('click', startBonusHandler);
$('.bonus-round-intro').on('click', newGameHandler);
$('.keyboard-section').on('click', keyboardHandler);
$('header').on('click', () => {
  theme.volume = 0.7;
});
$('.wheel-option.option1').on('click', () => spinHandler(1));
$('.wheel-option.option2').on('click', () => spinHandler(2));
$('.wheel-option.option3').on('click', () => spinHandler(3));
$('.wheel-option.option4').on('click', () => spinHandler(4));
$('.wheel-option.option5').on('click', () => spinHandler(5));
$('.wheel-option.option6').on('click', () => spinHandler(6));
$('.wheel-option.option7').on('click', () => spinHandler(7));
$('.wheel-option.option8').on('click', () => spinHandler(8));
$('.wheel-option.option9').on('click', () => spinHandler(9));
$('.wheel-option.option10').on('click', () => spinHandler(10));
$('.wheel-option.option11').on('click', () => spinHandler(11));
$('.wheel-option.option12').on('click', () => spinHandler(12));
$('.wheel-option.option13').on('click', () => spinHandler(13));
$('.wheel-option.option14').on('click', () => spinHandler(14));
$('.wheel-option.option15').on('click', () => spinHandler(15));
$('.wheel-option.option16').on('click', () => spinHandler(16));

function playLoopingAudio(audioObject)  {
  audioObject.play();
  audioObject.addEventListener('ended', () => {
    audioObject.play();
  });
}

function init() {
  //console.log('Running init...');
  game.getPlayers();
  newRoundHandler();
  
  setTimeout(() => {
    playLoopingAudio(theme);
  }, 1000);
}

function newRoundHandler() {

  // Hide feedback label
  const feedbackLabel = document.getElementById('csv-upload-feedback');
  feedbackLabel.style.display = 'none';

  round = game.startRound();
  domUpdates.displayNames(game.players, game.playerIndex);
  if (game.bonusRound) {
    round.bonusPlayer = game.endGame();
    puzzle = round.generateBonusPuzzle(game.lastPuzzle);
    wheel = round.generateBonusWheel();
    domUpdates.highlightVowels();
  } else {
    puzzle = round.generatePuzzle();
    game.lastPuzzle = puzzle;
    wheel = round.generateWheelValue();
  }
  setUpRound();

  if (game.bonusRound) {
      $('.keyboard-letters:contains("E")').removeClass('active-vowel');
      $('.keyboard-letters:contains("E")').addClass('vowel-disabled');
    
      $('.keyboard-letters:contains("R")').addClass('disabled');
      $('.keyboard-letters:contains("S")').addClass('disabled');
      $('.keyboard-letters:contains("T")').addClass('disabled');
      $('.keyboard-letters:contains("L")').addClass('disabled');
      $('.keyboard-letters:contains("N")').addClass('disabled');
    }
}

function handleCSVUpload(event) {
  //console.log('Handling CSV upload...');

  const file = event.target.files[0];

  if (file) {
    console.log('File selected:', file);

    const reader = new FileReader();

    reader.onload = function (e) {
      console.log('File loaded successfully!');
      const csvContent = e.target.result;
      const puzzles = parseCSV(csvContent);

      // Log the parsed puzzles to check if they are correctly loaded
      //console.log('Parsed Puzzles:', puzzles);

      // Update the puzzle bank in data with the new puzzles
      data.puzzles.puzzle_bank = puzzles;

      // Log the updated puzzle bank
      //console.log('Updated Puzzle Bank:', data.puzzles.puzzle_bank);

      // Show feedback label
      const feedbackLabel = document.getElementById('csv-upload-feedback');
      feedbackLabel.style.display = 'block';
    };

    reader.readAsText(file);
  } else {
    console.log('No file selected.');
  }
}

function parseCSV(csvContent) {
    const lines = csvContent.split('\n');
    console.log('CSV Content after split by newline: ', lines);
    const puzzles = [];

    const headers = lines[0].replace('\r', '').split(',');
    //console.log('Found headers: ', headers);
  
    for (let i = 1; i < lines.length; i++) {
        // Remove any '\r' characters from the line
        const currentLine = lines[i].replace('\r', '').split(',');
        //console.log('currentLine: ', currentLine);

        // Trim each value to remove leading and trailing whitespaces
        const trimmedLine = currentLine.map(value => {
            const trimmedValue = value.trim();
            return trimmedValue;
        });
        //console.log('trimmedLine: ', trimmedLine);
        //console.log('trimmedLine.length: ', trimmedLine.length);
        //console.log('headers.length: ', headers.length);

        // Check if the trimmed line has the expected number of columns
        if (trimmedLine.length === headers.length) {
            const correctAnswer = trimmedLine[headers.indexOf('CorrectAnswer')];
            //console.log('correctAnswer: ', correctAnswer);

            const numWords = correctAnswer.split(' ').length;
            const totalLetters = correctAnswer.length;
            const firstWord = correctAnswer.split(' ')[0].length;

            //console.log('NumWords:', numWords);
            //console.log('TotalLetters:', totalLetters);
            //console.log('FirstWord:', firstWord);

            const puzzle = {
                category: trimmedLine[headers.indexOf('Category')],
                number_of_words: numWords,
                total_number_of_letters: totalLetters,
                first_word: firstWord,
                correct_answer: correctAnswer,
                description: '', // You can set it to an empty string if not used
            };

          //console.log('Puzzle: ', puzzle);

            /* Puzzle board currently only supports the 2nd and 3rd lines which are 14 characters each, and it's
             not smart enough to wrap words without splitting them across lines. Therefore max puzzle length is 28
             In the future, need to update this logic once we have better word wrapping logic so that it discards
             puzzles that don't fit on the board */
            if (totalLetters <= 28) {
              //console.log('Pushing Puzzle: ', puzzle);
                puzzles.push(puzzle);
            } else {
                console.warn(`Puzzle at line ${i + 1} has correct_answer length greater than 28 characters and will be skipped.`);
            }

        } else {
            console.error(`Line ${i + 1} does not have the expected number of columns after trimming.`);
        }
    }
    return puzzles;
}


function setUpRound() {
  domUpdates.resetPuzzleSquares();
  game.bonusRound ? puzzle.populateBonus(puzzle.puzzleLength) : 
    puzzle.populateBoard();
  domUpdates.updateCategory(puzzle);
  domUpdates.displayWheelValues(wheel);
  domUpdates.newRoundKeyboard();
}

function quitHandler() {
  domUpdates.resetOnQuit();
  game.quitGame();
}

function checkIfPuzzleSolved() {
  if (puzzle.completed) {
    game.endRound();
    domUpdates.yellCurrentSpin('CORRECT');
    chooseSound.pause();
    playLoopingAudio(theme);
    solveSound.play();
    setTimeout(domUpdates.yellCurrentSpin, 2000);
    setTimeout(newRoundHandler, 2500);
  }
}

function vowelPurchaseHandler() {
  if (game.players[game.playerIndex].wallet < 100) {
    return $('.vowel-error').css('display', 'unset');
  }
  domUpdates.highlightVowels();
}

function startBonusHandler() {
  domUpdates.startBonusRound();
  domUpdates.displayWheel();
  domUpdates.highlightVowels();
}

function newGameHandler(e) {
  if ($(e.target).hasClass('new-game')) {
    domUpdates.resetGameDisplay();
    
    $('.spin-button').on('click', game.setUpWheel);
    $('.solve-button').on('click', domUpdates.displaySolvePopup);
    $('.vowel-button').on('click', vowelPurchaseHandler);

    //Need to reset placement of wheel labels so they align properly for regular wheel values
    const mark1Element = document.querySelector('.mark1');
    const mark2Element = document.querySelector('.mark2');
    const mark3Element = document.querySelector('.mark3');
    const mark4Element = document.querySelector('.mark4');
    const mark5Element = document.querySelector('.mark5');
    const mark6Element = document.querySelector('.mark6');
    const mark7Element = document.querySelector('.mark7');
    const mark8Element = document.querySelector('.mark8');
    const mark9Element = document.querySelector('.mark9');
    const mark10Element = document.querySelector('.mark10');
    const mark11Element = document.querySelector('.mark11');
    const mark12Element = document.querySelector('.mark12');
    const mark13Element = document.querySelector('.mark13');
    const mark14Element = document.querySelector('.mark14');
    const mark15Element = document.querySelector('.mark15');
    const mark16Element = document.querySelector('.mark16');
    const option5Element = document.querySelector('.option5');
    const option14Element = document.querySelector('.option14');    
    mark1Element.style.top = '8%';
    mark2Element.style.top = '10%';
    mark3Element.style.top = '10%';
    mark4Element.style.top = '8%';
    mark5Element.style.top = '8%';
    mark5Element.style.fontSize = '1.2rem';
    mark5Element.style.left = '30.5%';
    mark5Element.style.color = 'white';
    mark6Element.style.top = '10%';
    mark7Element.style.top = '10%';
    mark8Element.style.top = '10%';
    mark9Element.style.top = '8%';
    mark10Element.style.top = '10%';
    mark11Element.style.top = '10%';
    mark12Element.style.top = '8%';
    mark13Element.style.top = '10%';
    mark14Element.style.top = '6%';
    mark14Element.style.left = '30.5%';
    mark15Element.style.top = '10%';
    mark16Element.style.top = '10%';
    option5Element.style.background = '#000000';
    option14Element.style.background = '#ffffff';

    game.quitGame();
  }
}

function solveHandler() {
  let guess = $('.solve-input').val().toLowerCase();
  $('.solve-input').val('');
  let result = puzzle.solvePuzzle(guess);
  if (result) {
    chooseSound.pause();
    playLoopingAudio(theme);
    solveSound.play();
    game.bonusRound ? solveBonusHandler(result) : null;
    game.endRound();
    setTimeout(newRoundHandler, 2500);
  } else {
    buzzer.play();
    game.bonusRound ? solveBonusHandler(result) : null;
    game.endTurn();
  }
};

function solveBonusHandler(result) {
  if (result) {
    round.didWinBonus = true;
    round.postBonusResult();
  } else {
    round.didWinBonus = false;
    round.postBonusResult();
  }
}

function spinHandler(optionNumber) {

  if(optionNumber != "random")
  {
    domUpdates.spinWheel(); // Need to call this so that it toggles spin state correctly but shouldn't be visible without timeout
    game.tearDownWheel(wheel, round, wheel.spinValues[optionNumber-1]);
    domUpdates.yellCurrentSpin(wheel.currentValue);
    setTimeout(domUpdates.yellCurrentSpin, 2000);
    badSpinHandler();
  }
  else{
    spinSound.play();
    domUpdates.spinWheel();
    setTimeout(() => {
      game.tearDownWheel(wheel, round, "random");
      domUpdates.yellCurrentSpin(wheel.currentValue);
      setTimeout(domUpdates.yellCurrentSpin, 2000);
      badSpinHandler();
    }, 2000);
  }
}

function badSpinHandler() {
  if (wheel.currentValue === 'LOSE TURN') {
    game.endTurn();
    buzzer.play();
  } else if (wheel.currentValue === 'BANKRUPT') {
    bankrupt.play();
    game.players[game.playerIndex].wallet = 0;
    game.endTurn();
  } else {
    theme.pause()
    playLoopingAudio(chooseSound);
    chooseSound.volume = 0.8;
  }
}

function keyboardHandler(e) {
  chooseSound.volume = 0.7;
  $('.vowel-error').css('display', 'none');
  let currentTurn = game.players[game.playerIndex];
  let currentGuess = $(e.target).text();
  if (['A', 'E', 'I', 'O', 'U'].includes(currentGuess)) {
    vowelGuessHandler(currentGuess, currentTurn, e);
  } else {
    consonantGuessHandler(currentGuess, currentTurn, e);
  }
}

function vowelGuessHandler(currentGuess, currentTurn, e) {
  if (!$(e.target).hasClass('active-vowel')) {
    return;
  } else {
    guessActiveVowel(currentGuess, currentTurn, e); 
  }
}

function guessActiveVowel(currentGuess, currentTurn, e) {
  let isGuessCorrect = puzzle.checkGuess(currentGuess);
  puzzle.checkIfVowelAvailable(currentGuess, currentTurn, e);
  game.bonusRound ? domUpdates.enableLetters() : null;
  if (isGuessCorrect) {
    checkIfPuzzleSolved();
    ding.play();
  } else {
    game.endTurn();
    domUpdates.disableKeyboard();
    buzzer.play();
  }
}

function consonantGuessHandler(currentGuess, currentTurn, e) {
  let isGuessCorrect = puzzle.checkGuess(currentGuess);
  let isEnabled = puzzle.checkIfConsonantEnabled(e);
  game.bonusRound ? game.clickCounter(round) : null;
  if (isEnabled && isGuessCorrect) {
    puzzle.countCorrectLetters(currentGuess);
    currentTurn.guessCorrectLetter(puzzle.numberCorrect, wheel.currentValue);
    checkIfPuzzleSolved();
    ding.play();
  } else if (isEnabled && !isGuessCorrect) {
    game.endTurn();
    buzzer.play();
  }
}
