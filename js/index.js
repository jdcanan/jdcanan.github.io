import Game from './Game.js';
import domUpdates from './DOM.js';

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
  game.getPlayers();
  newRoundHandler();
  setTimeout(() => {
    playLoopingAudio(theme);
  }, 1000);
}

function newRoundHandler() {
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
    buzz.play();
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
