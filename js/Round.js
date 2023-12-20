import data from './data.js';
import Puzzle from './Puzzle.js';
import Wheel from './Wheel.js';

class Round {
  constructor(puzzleBank, wheelValue) {
    this.puzzleBank = puzzleBank;
    this.wheelValue = wheelValue;
  }

  /*
  generatePuzzle() {
    let randomIndex = Math.floor(Math.random() * this.puzzleBank.length);
    return new Puzzle(this.puzzleBank[randomIndex]);
  }
  */

  generatePuzzle() {
  let puzzle;
  let attempts = 0; //Failsafe so that it doesn't go into an infinite loop if there are no valid puzzles in the puzzle bank
    
  while (!puzzle && attempts < 1000) {
    let randomIndex = Math.floor(Math.random() * this.puzzleBank.length);
    
    try {
      puzzle = new Puzzle(this.puzzleBank[randomIndex]);
    } catch (error) {
      console.error(error.message);
      puzzle = null; // Set puzzle to null to indicate an error
      attempts++;
    }
  }

  if (!puzzle) {
    throw new Error("Unable to generate a valid puzzle.");
  }

  return puzzle;
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
