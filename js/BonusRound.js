import data from './data.js';
import Puzzle from './Puzzle.js';
import Wheel from './Wheel.js';
import Round from './Round.js';

class BonusRound extends Round {
  constructor(puzzleBank, bonusWheel) {
    super(puzzleBank);
    this.bonusWheel = data.bonusWheel;
    this.keyBoardClickCount = 0;
    this.didWinBonus = null;
    this.bonusWheelValue = null;
    this.bonusPlayer = null;
  }

  /*
  generateBonusWheel() {
    let wheelVals = [];
    for (var i = 0; i < data.bonusWheel.length; i++) {
      wheelVals.push(data.bonusWheel[i]);
    }
    
    return new Wheel(wheelVals);
  }
  */

  generateBonusWheel() {
    let wheelVals = [];
    for (var i = 0; i < data.bonusWheel.length; i++) {
        wheelVals.push(data.bonusWheel[i]);
    }

    //Need to modify placement of wheel labels so they align properly for bonus wheel values
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
    mark1Element.style.top = '5%';
    mark2Element.style.top = '5%';
    mark3Element.style.top = '5%';
    mark4Element.style.top = '5%';
    mark5Element.style.top = '5%';
    mark5Element.style.fontSize = '1.5rem';
    mark5Element.style.left = '28.5%';
    mark5Element.style.color = 'black';
    mark6Element.style.top = '5%';
    mark7Element.style.top = '5%';
    mark8Element.style.top = '5%';
    mark9Element.style.top = '5%';
    mark10Element.style.top = '5%';
    mark11Element.style.top = '5%';
    mark12Element.style.top = '5%';
    mark13Element.style.top = '5%';
    mark14Element.style.top = '5%';
    mark14Element.style.left = '29.5%';
    mark15Element.style.top = '5%';
    mark16Element.style.top = '5%';
    option5Element.style.background = '#FF33DA';
    option14Element.style.background = '#39FF33';
    
    return new Wheel(wheelVals);
}


  generateBonusPuzzle(lastPuzzle) {
    let randomIndex = Math.floor(Math.random() * this.puzzleBank.length);
    if (this.puzzleBank[randomIndex] === lastPuzzle) {
      this.generateBonusPuzzle(lastPuzzle);
    } else {
      return new Puzzle(this.puzzleBank[randomIndex]);
    }
  }

postBonusResult() {
    $('.popup-cover').css('display', 'unset');
    $('.bonus-round-intro').css('display', 'flex');
    if (this.didWinBonus) {
        $('.win-message').text(` WINS THE BONUS!`);
        var winnings;

        // Check if the bonus wheel value is "1 Million"
        if (this.bonusWheelValue === "1 Million") {
            winnings = this.bonusPlayer.bankAcct + 1000000;
        } else {
            var winnings = this.bonusPlayer.bankAcct + this.bonusWheelValue;
        }
    } else {
        $('.win-message').text(` MISSED THE BONUS!`);
        var winnings = this.bonusPlayer.bankAcct;
    }
    $('.winner-money-pre-bonus').text(winnings)
    $('.start-bonus-round').remove();
    $('.bonus-round-intro').append('<button class="new-game">NEW GAME</button>')
}
}

export default BonusRound;
