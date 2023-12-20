import domUpdates from './DOM.js';

class Puzzle {
  constructor(currentPuzzle) {
    this.currentPuzzle = currentPuzzle;
    this.puzzleLength = this.currentPuzzle.total_number_of_letters;
    this.correctCount = 0;
    this.numberCorrect = 0;
    this.completed = false;
    try {
      const puzzleLines = this.generatePuzzleGridLines(currentPuzzle.correct_answer);
      console.log(puzzleLines);
    } catch (error) {
      //console.error(error.message);
      throw error;
    }
  }

generatePuzzleGridLines(puzzleAnswer) {
  const words = puzzleAnswer.split(" ");
  const puzzleLines = ["", "", "", ""];
  console.log("Words Array: ", words);

  let currentLine = 1;
  let retry = false;

  for (let i = 0; i < words.length; i++) {
    const word = words[i];

    while (currentLine < 4) {
      const currentLineLength = puzzleLines[currentLine].length;

      if (currentLineLength + word.length <= (currentLine === 0 || currentLine === 3 ? 12 : 14)) {
        puzzleLines[currentLine] += word + (currentLineLength + word.length < (currentLine === 0 || currentLine === 3 ? 12 : 14) ? " " : "");
        console.log("First Pass adding word: ", word);
        break;
      } else {
        currentLine++;
        console.log("First Pass moving to line: ", currentLine);
      }
    }

    // If we reach line 4 (index 3) and still have words to add, start over at line 0
    if (currentLine === 3) {
      retry = true;
      currentLine = 0;
      puzzleLines.fill("");
      console.log("Reached 3rd line, starting over at line 0: ", puzzleLines);
      break;
    }
  }

  if (retry) {
    // If we still have words to add after completing line 3, start over at line 0
    for (let i = 0; i < words.length; i++) {
      const word = words[i];

      while (currentLine < 4) {
        const currentLineLength = puzzleLines[currentLine].length;

        if (currentLineLength + word.length <= (currentLine === 0 || currentLine === 3 ? 12 : 14)) {
          puzzleLines[currentLine] += word + (currentLineLength + word.length < (currentLine === 0 || currentLine === 3 ? 12 : 14) ? " " : "");
          console.log("2nd Pass adding word: ", word);
          break;
        } else {
          currentLine++;
          console.log("2nd Pass moving to line: ", currentLine);
        }
      }

      // If we reach line 5 (index 4) and still have words to add, return an error
      if (currentLine === 4) {
        throw new Error("Input too long for puzzle grid");
      }
    }
  }

  // Trim spaces at the beginning of each line
  puzzleLines.forEach((line, index) => {
    puzzleLines[index] = line.trimLeft();
  });

  return puzzleLines;
}

/* //Example usage:
const puzzleAnswer = "An eye for an eye and a tooth for a tooth";
try {
  const puzzleLines = generatePuzzleGridLines(puzzleAnswer);
  console.log(puzzleLines);
} catch (error) {
  console.error(error.message);
}
*/

  

  populateBoard() {
    console.log("Puzzle: ", this.currentPuzzle.correct_answer);
    let puzzleArray = this.currentPuzzle.correct_answer.split('');
    domUpdates.populatePuzzleSquares(puzzleArray);
  }

  populateBonus(puzzleLength) {
    let puzzleArray = this.currentPuzzle.correct_answer.split('');
    domUpdates.populatePuzzleSquares(puzzleArray);
    domUpdates.showBonusLetters(puzzleLength);
  }

  checkIfConsonantEnabled(e) {
    if ($(e.target).hasClass('disabled') ||
      $(e.target).hasClass('temp-disabled') ||
      $(e.target).hasClass('keyboard-section')) {
      return false;
    } else {
      domUpdates.disableGuessedLetter(e);
      return true;
    }
  }

  checkGuess(guess) {
    if (this.currentPuzzle.correct_answer.toUpperCase().includes(guess)) {
      return true;
    }
    return false;
  }

  checkIfVowelAvailable(vowel, player, e) {
    if ($(e.target).hasClass('active-vowel')) {
      player.buyVowel();
      domUpdates.disableGuessedVowel(e);
      this.countCorrectLetters(vowel);
    }
  }

  countCorrectLetters(guess) {
    let numLetters = 0;
    let letterBoxArray = Array.from($('.letter-content'));
    letterBoxArray.forEach(box => {
      if ($(box).text().toUpperCase() === guess) {
        numLetters++;
        this.correctCount++;
        domUpdates.revealCorrectLetters(box);
      }
    });
    this.numberCorrect = numLetters;
    this.checkCompletion();
  }

  checkCompletion() {
    if (this.correctCount === this.puzzleLength) {
      this.completed = true;
    }
  }

  solvePuzzle(guess) {
    if (guess === this.currentPuzzle.correct_answer.toLowerCase()) {
      domUpdates.hideSolvePopup();
      domUpdates.yellCurrentSpin('CORRECT');
      setTimeout(domUpdates.yellCurrentSpin, 2000);
      this.completed = true;
      let letterBoxArray = Array.from($('.letter-content'));
      letterBoxArray.forEach(box => domUpdates.revealCorrectLetters(box));
      return true;
    } else {
      domUpdates.hideSolvePopup();
      domUpdates.yellCurrentSpin('INCORRECT');
      setTimeout(domUpdates.yellCurrentSpin, 2000);
      return false;
    }
  }
}


export default Puzzle;
