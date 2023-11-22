import data from './data.js';
import Puzzle from './Puzzle.js';
import Wheel from './Wheel.js';

class Round {
  constructor(puzzleBank, wheelValue) {
    this.puzzleBank = puzzleBank;
    this.wheelValue = wheelValue;
  }

  generatePuzzle() {
    let randomIndex = Math.floor(Math.random() * this.puzzleBank.length);
    return new Puzzle(this.puzzleBank[randomIndex]);
  }

  generateWheelValue() {
    let wheelVals = [];
    for (var i = 0; i < data.wheel.length; i++) {
      //let randomIndex = Math.floor(Math.random() * data.wheel.length);
      //wheelVals.push(data.wheel[randomIndex]);
      //We don't want a randomly generated wheel, we want the full wheel to be the same every time
      wheelVals.push(data.wheel[i]);
    }
    return new Wheel(wheelVals);
  }
}


export default Round;
