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
    const qmarkElement = document.querySelector('q-mark');
    
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

    const mark14char1Element = document.querySelector('.mark5 .char5-1');
    const mark14char2Element = document.querySelector('.mark5 .char5-2');
    const mark14char3Element = document.querySelector('.mark5 .char5-3');
    const mark14char4Element = document.querySelector('.mark5 .char5-4');
    const mark14char5Element = document.querySelector('.mark5 .char5-5');
    const mark14char6Element = document.querySelector('.mark5 .char5-6');
    const mark14char7Element = document.querySelector('.mark5 .char5-7');
    const mark14char8Element = document.querySelector('.mark5 .char5-8');
    const mark14char9Element = document.querySelector('.mark5 .char5-9');
    
    qmarkElement.style.letterSpacing = '-5px';
    
    mark1Element.style.top = '6%';
    mark1Element.style.left = '29%';
    mark2Element.style.top = '6%';
    mark2Element.style.left = '29%';
    mark3Element.style.top = '6%';
    mark3Element.style.left = '29%';
    mark4Element.style.top = '6%';
    mark4Element.style.left = '29%';
    
    mark5Element.style.top = '5%';
    mark5Element.style.fontSize = '1.6rem';
    mark5Element.style.left = '28.5%';
    mark5Element.style.color = 'black';
    mark5Element.style.textShadow = '1px 1px 0 white, -1px -1px 0 white, 1px -1px 0 white, -1px 1px 0 white';
    
    mark6Element.style.top = '6%';
    mark6Element.style.left = '29%';
    mark7Element.style.top = '6%';
    mark7Element.style.left = '29%';
    mark8Element.style.top = '6%';
    mark8Element.style.left = '29%';
    mark9Element.style.top = '6%';
    mark9Element.style.left = '29%';
    mark10Element.style.top = '6%';
    mark10Element.style.left = '29%';
    mark11Element.style.top = '6%';
    mark11Element.style.left = '29%';
    mark12Element.style.top = '6%';
    mark12Element.style.left = '29%';
    mark13Element.style.top = '6%';
    mark13Element.style.left = '29%';
    
    mark14Element.style.top = '5%';
    mark14Element.style.left = '27.5%';
    mark14Element.style.textShadow = '1px 1px 0 white, -1px -1px 0 white, 1px -1px 0 white, -1px 1px 0 white';
    
    mark15Element.style.top = '6%';
    mark15Element.style.left = '29%';
    mark16Element.style.top = '6%';
    mark16Element.style.left = '29%';
    
    option5Element.style.background = '#FF33DA';
    option14Element.style.background = '#39FF33';

    mark14char1Element.style.fontSize = '2.5rem';
    mark14char2Element.style.fontSize = '0.7rem';
    mark14char3Element.style.fontSize = '1.6rem';
    mark14char4Element.style.fontSize = '1.5rem';
    mark14char5Element.style.fontSize = '1.4rem';
    mark14char6Element.style.fontSize = '1.3rem';
    mark14char7Element.style.fontSize = '1.2rem';
    mark14char8Element.style.fontSize = '1.1rem';
    mark14char9Element.style.fontSize = '1.0rem';
    
    return new Wheel(wheelVals);
}


  generateBonusPuzzle(lastPuzzle) {
    let puzzle;
    let attempts = 0; //Failsafe so that it doesn't go into an infinite loop if there are no valid puzzles in the puzzle bank
      
    while (!puzzle && attempts < 1000) {
      let randomIndex = Math.floor(Math.random() * this.puzzleBank.length);
      if (this.puzzleBank[randomIndex] === lastPuzzle) {
          //this.generateBonusPuzzle(lastPuzzle);
          Console.log("Chose same bonus puzzle as last puzzle, picking again");
          puzzle = null;
        } else {
            try {
              puzzle = new Puzzle(this.puzzleBank[randomIndex]);
            } catch (error) {
              console.error(error.message);
              puzzle = null; // Set puzzle to null to indicate an error
              attempts++;
            }
        }
      }

      if (!puzzle) {
        throw new Error("Unable to generate a valid puzzle.");
      }
    
      return puzzle;

    /* Previous function  
      let randomIndex = Math.floor(Math.random() * this.puzzleBank.length);
      if (this.puzzleBank[randomIndex] === lastPuzzle) {
        this.generateBonusPuzzle(lastPuzzle);
      } else {
        return new Puzzle(this.puzzleBank[randomIndex]);
      }
    */
    
    }

postBonusResult() {
    $('.popup-cover').css('display', 'unset');
    $('.bonus-round-intro').css('display', 'flex');

    if (this.didWinBonus) {
      $('.win-message').text(` WINS THE BONUS!`);
  
      // Check if the bonus wheel value is "1 Million"
      if (this.bonusWheelValue === "1 Million") {
          var winnings = parseFloat(this.bonusPlayer.bankAcct) + 1000000;
      } else {
          var winnings = parseFloat(this.bonusPlayer.bankAcct) + parseFloat(this.bonusWheelValue);
      }
    } else {
        $('.win-message').text(` MISSED THE BONUS!`);
        var winnings = parseFloat(this.bonusPlayer.bankAcct);
    }

    // Format the winnings as a dollar value with commas as thousands separators
    let formattedWinnings = winnings.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  
    $('.winner-money-pre-bonus').text(formattedWinnings);
  
    //$('.winner-money-pre-bonus').text(winnings);
    $('.start-bonus-round').remove();
    $('.bonus-round-intro').append('<h2 class="correct-bonus"><span class="bonus-answer">Bonus Answer</span></h2><button class="new-game">NEW GAME</button>');
}
}

export default BonusRound;
