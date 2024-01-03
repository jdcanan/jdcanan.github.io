import domUpdates from './DOM.js';

class Puzzle {
  constructor(currentPuzzle) {
    this.currentPuzzle = currentPuzzle;
    this.puzzleLength = this.currentPuzzle.total_number_of_letters;
    this.correctCount = 0;
    this.numberCorrect = 0;
    this.completed = false;
    this.puzzleLines = null;
    
    try {
      this.puzzleLines = this.generatePuzzleGridLines(currentPuzzle.correct_answer);
      console.log(this.puzzleLines);
    } catch (error) {
      //console.error(error.message);
      throw error;
    }
  }

generatePuzzleGridLines(puzzleAnswer) {
  const words = puzzleAnswer.split(" ");
  const puzzleGridLines = ["", "", "", ""];
  console.log("Splitting puzzle: ", puzzleAnswer);
  //console.log("Words Array: ", words);

  let currentLine = 1;
  let retry = false;

  for (let i = 0; i < words.length; i++) {
    const word = words[i];

    while (currentLine < 4) {
      const currentLineLength = puzzleGridLines[currentLine].length;

      if (currentLineLength + word.length <= (currentLine === 0 || currentLine === 3 ? 12 : 14)) {
        puzzleGridLines[currentLine] += word + (currentLineLength + word.length < (currentLine === 0 || currentLine === 3 ? 12 : 14) ? " " : "");
        //console.log("First Pass adding word: ", word);
        break;
      } else {
        currentLine++;
        //console.log("First Pass moving to line: ", currentLine);
      }
    }

    // If we reach line 4 (index 3) and still have words to add, start over at line 0
    if (currentLine === 3) {
      retry = true;
      currentLine = 0;
      puzzleGridLines.fill("");
      //console.log("Reached 3rd line, starting over at line 0: ", puzzleGridLines);
      break;
    }
  }

  if (retry) {
    // If we still have words to add after completing line 3, start over at line 0
    for (let i = 0; i < words.length; i++) {
      const word = words[i];

      while (currentLine < 4) {
        const currentLineLength = puzzleGridLines[currentLine].length;

        if (currentLineLength + word.length <= (currentLine === 0 || currentLine === 3 ? 12 : 14)) {
          puzzleGridLines[currentLine] += word + (currentLineLength + word.length < (currentLine === 0 || currentLine === 3 ? 12 : 14) ? " " : "");
          //console.log("2nd Pass adding word: ", word);
          break;
        } else {
          currentLine++;
          //console.log("2nd Pass moving to line: ", currentLine);
        }
      }

      // If we reach line 5 (index 4) and still have words to add, return an error
      if (currentLine === 4) {
        throw new Error("Input too long for puzzle grid");
      }
    }
  }

  // Trim spaces at the beginning and end of each line
  puzzleGridLines.forEach((line, index) => {
    puzzleGridLines[index] = line.trim();
  });

  // Center the remaining portions by inserting spaces at the beginning
  puzzleGridLines.forEach((line, index) => {
    const maxLength = (index === 0 || index === 3) ? 12 : 14;
    const padding = Math.max(0, Math.floor((maxLength - line.length) / 2));
    puzzleGridLines[index] = " ".repeat(padding) + line;
  });

  return puzzleGridLines;
}
  

  populateBoard() {
    console.log("Puzzle: ", this.currentPuzzle.correct_answer);
    //let puzzleArray = this.currentPuzzle.correct_answer.split('');
    //domUpdates.populatePuzzleSquares(puzzleArray);

    console.log("Populate PuzzleGrid: ", this.puzzleLines);
    domUpdates.populatePuzzleSquares(this.puzzleLines);
  }

  populateBonus(puzzleLength) {
    //let puzzleArray = this.currentPuzzle.correct_answer.split('');
    //domUpdates.populatePuzzleSquares(puzzleArray);
    console.log("Populate BonusPuzzleGrid: ", this.puzzleLines);
    domUpdates.populatePuzzleSquares(this.puzzleLines);
    
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

  checkRemainingVowels() {
    const vowels = ['A', 'E', 'I', 'O', 'U'];
    const guessedVowels = Array.from($('.vowel-disabled')).map(vowel => $(vowel).text());

    const remainingVowels = vowels.filter(vowel => !guessedVowels.includes(vowel) && this.checkGuess(vowel));

    //console.log('Remaining Vowels:', remainingVowels.join(', '));

    if (remainingVowels.length === 0) {
      //console.log('No more vowels');
      domUpdates.yellCurrentSpin('NO MORE\nVOWELS');
      setTimeout(domUpdates.yellCurrentSpin, 2000);
      $('.vowel-button').prop('disabled', true);
    }
  }

  checkRemainingConsonants() {
    const consonants = ['B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'V', 'W', 'X', 'Y', 'Z'];
    const guessedConsonants = Array.from($('.disabled')).map(consonant => $(consonant).text());

    const remainingConsonants = consonants.filter(consonant => !guessedConsonants.includes(consonant) && this.checkGuess(consonant));

    console.log('Remaining Consonants:', remainingConsonants.join(', '));

    if (remainingConsonants.length === 0) {
        console.log('No more consonants');
        domUpdates.yellCurrentSpin('NO MORE\nCONSONANTS');
        setTimeout(domUpdates.yellCurrentSpin, 2000);
        $('.spin-button').prop('disabled', true);
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

  /* Old function that had an issue with puzzles containing apostrophes on iPad
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
*/

solvePuzzle(guess) {
    const normalizedGuess = guess.toLowerCase().normalize('NFC');
    const normalizedAnswer = this.currentPuzzle.correct_answer.toLowerCase().normalize('NFC');

    if (normalizedGuess === normalizedAnswer) {
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



export default Puzzle;
