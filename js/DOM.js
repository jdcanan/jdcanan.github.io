import Player from './Player.js';

const domUpdates = {

  getPlayerNames() {
    let players = [];
    players.push(this.getPlayerOne());
    players.push(this.getPlayerTwo());
    players.push(this.getPlayerThree());
    return players;
  },

  getPlayerOne() {
    if ($('.player1-name').val()) {
      var playerOne = new Player($('.player1-name').val());
      $('.player1-ba').text(`${$('.player1-name').val()}: $`);
    } else {
      var playerOne = new Player('Player 1');
    }
    return playerOne;
  },
  
  getPlayerTwo() {
    if ($('.player2-name').val()) {
      var playerTwo = new Player($('.player2-name').val());
      $('.player2-ba').text(`${$('.player2-name').val()}: $`);
    } else {
      var playerTwo = new Player('Player 2');
    }
    return playerTwo;
  },
  
  getPlayerThree() {
    if ($('.player3-name').val()) {
      var playerThree = new Player($('.player3-name').val());
      $('.player3-ba').text(`${$('.player3-name').val()}: $`);
    } else {
      var playerThree = new Player('Player 3');
    }
    return playerThree;
  },

  clearInputs() {
    $('.player1-name').val('');
    $('.player2-name').val('');
    $('.player3-name').val('');
  },

  goToGameScreen() {
    $('.home-screen').css('display', 'none');
    $('.popup-cover').css('display', 'none');
  },

  displayNames(playerArray, index) {
    $('.game-winner').text(playerArray[index].name);
    
    //$('.winning-score').text(playerArray[index].wallet);
    $('.winning-score').text('$' + playerArray[index].wallet.toLocaleString('en-US', { maximumFractionDigits: 0 }));
    
    if (index === 2) {
      $('.on-deck-name').text(playerArray[0].name);
      //$('.on-deck-score').text(playerArray[0].wallet);
      $('.on-deck-score').text('$' + playerArray[0].wallet.toLocaleString('en-US', { maximumFractionDigits: 0 }));
      
      $('.in-the-hole-name').text(playerArray[1].name);
      //$('.in-the-hole-score').text(playerArray[1].wallet);
      $('.in-the-hole-score').text('$' + playerArray[1].wallet.toLocaleString('en-US', { maximumFractionDigits: 0 }));
    } else if (index === 1) {
      $('.on-deck-name').text(playerArray[2].name);      
      //$('.on-deck-score').text(playerArray[2].wallet);
      $('.on-deck-score').text('$' + playerArray[2].wallet.toLocaleString('en-US', { maximumFractionDigits: 0 }));
      
      $('.in-the-hole-name').text(playerArray[0].name);
      //$('.in-the-hole-score').text(playerArray[0].wallet);
      $('.in-the-hole-score').text('$' + playerArray[0].wallet.toLocaleString('en-US', { maximumFractionDigits: 0 }));
    } else {
      $('.on-deck-name').text(playerArray[1].name);      
      //$('.on-deck-score').text(playerArray[1].wallet);
      $('.on-deck-score').text('$' + playerArray[1].wallet.toLocaleString('en-US', { maximumFractionDigits: 0 }));
      
      $('.in-the-hole-name').text(playerArray[2].name);
      //$('.in-the-hole-score').text(playerArray[2].wallet);
      $('.in-the-hole-score').text('$' + playerArray[2].wallet.toLocaleString('en-US', { maximumFractionDigits: 0 }));
    }
    
      
  },

  displayWinner(winner, score) {
    $('.game-winner').text(`${winner} WINS!!`);
    //$('.winning-score').text(score);
    $('.winning-score').text('$' + score.toLocaleString('en-US', { maximumFractionDigits: 0 }));
  },

  goToHomeScreen() {
    $('.home-screen').css('display', 'flex');
    $('.popup-cover').css('display', 'unset');
  },

  displayWheel() {
    $('.popup-cover').css('display', 'unset');
    $('.wheel').toggleClass('slide-in');
  },

  spinWheel() {
    $('.vowel-error').css('display', 'none');
    $('.wheel-circle').toggleClass('wheel-spin');
  },

  hideWheel() {
    $('.popup-cover').css('display', 'none');
    $('.wheel').toggleClass('slide-in');
    $('.wheel-circle').toggleClass('wheel-spin');
  },

  /* old function without wrapping support
  populatePuzzleSquares(puzzle) {
    
    let letterBoxArray = Array.from($('.letter-content'));
    let revealSound = new Audio('./audio/reveal.mp3');
    revealSound.play();
    puzzle.forEach((letter, i) => {
      if (letter === '-' || letter === '&' || letter === '\'' || letter === '.' || letter === ':' || letter === '?' || letter === '!') {
        $(letterBoxArray[i]).text(letter);
        $(letterBoxArray[i]).parent().css('background', 'white');
      } else if (letter !== ' ') {
        $(letterBoxArray[i]).text(letter);
        $(letterBoxArray[i]).css('opacity', 0);
        $(letterBoxArray[i]).parent().css('background', 'white');
      } else if (letter === ' ') {
        $(letterBoxArray[i]).text(' ');
        $(letterBoxArray[i]).parent().css('background', '#1c7455')
      }
    });
  },
  */

  populatePuzzleSquares(puzzle) {
  let letterBoxArray = Array.from($('.letter-content'));
  let revealSound = new Audio('./audio/reveal.mp3');
  revealSound.play();

  for (let i = 0; i < puzzle.length; i++) {
    let line = puzzle[i];
    let lineArray = line.split(''); // Convert the line string to an array of characters
    let startIndex;

    if (i === 0) {
      startIndex = 0;
    } else if (i === 1) {
      startIndex = 12;
    } else if (i === 2) {
      startIndex = 26;
    } else if (i === 3) {
      startIndex = 40;
    }

    for (let j = 0; j < lineArray.length; j++) {
      let index = startIndex + j;
      // Now use the 'index' to update the corresponding element in letterBoxArray
      if (lineArray[j] === '-' || lineArray[j] === '&' || lineArray[j] === '\'' || lineArray[j] === '.' || lineArray[j] === ':' || lineArray[j] === '?' || lineArray[j] === '!') {
        $(letterBoxArray[index]).text(lineArray[j]);
        $(letterBoxArray[index]).parent().css('background', 'white');
      } else if (lineArray[j] !== ' ') {
        $(letterBoxArray[index]).text(lineArray[j]);
        $(letterBoxArray[index]).css('opacity', 0);
        $(letterBoxArray[index]).parent().css('background', 'white');
      } else if (lineArray[j] === ' ') {
        $(letterBoxArray[index]).text(' ');
        $(letterBoxArray[index]).parent().css('background', '#1c7455');
      }
    }
  }
},


/* Previous showBonusLetters() displayed 7 random characters 
  showBonusLetters(length) {
    let letterBoxArray = Array.from($('.letter-content'));
    for (let i = 0; i < 7; i++) {
      let rand = Math.floor(Math.random() * length);
      $(letterBoxArray[rand]).css('opacity', 1);
    }
  },
  */

  // Instead we want to show any character matching R, S, T, L, N, or E 
  showBonusLetters(length) {
    let letterBoxArray = Array.from($('.letter-content'));
    letterBoxArray.forEach(letterBox => {
      // Get the text content of the current element
      let letter = $(letterBox).text().trim().toUpperCase();
  
      // Check if the letter is 'R', 'S', 'T', 'L', 'N', or 'E'
      if (['R', 'S', 'T', 'L', 'N', 'E'].includes(letter)) {
        $(letterBox).css('opacity', 1);
      }
    });
  },


  newRoundKeyboard() {
    let keyboardLetters = Array.from($('.keyboard-letters'));
    keyboardLetters.forEach(letter => {
      if ($(letter).hasClass('disabled')) {
        $(letter).removeClass('disabled');
      } else if ($(letter).hasClass('vowel-disabled')) {
        $(letter).removeClass('vowel-disabled');
      }
    });
    this.resetVowels();
  },

  resetPuzzleSquares() {
    let letterBoxArray = Array.from($('.letter-content'));
    letterBoxArray.forEach(box => {
      $(box).text('');
      $(box).parent().css('background', '#1c7455')
    })
  },

  disableGuessedLetter(event) {
    if ($(event.target).hasClass('keyboard-letters')) {
      $(event.target).addClass('disabled')
    }
  },

  revealCorrectLetters(box) {
    $(box).css('opacity', 1);
  },

  resetVowels() {
    let keyboardLetters = Array.from($('.keyboard-letters'));
    keyboardLetters.forEach(letter => {
      if ($(letter).hasClass('vowel')) {
        $(letter).removeClass('vowel-disabled');
        $(letter).removeClass('active-vowel');
        $(letter).addClass('temp-disabled');
      }
    });
  },

  resetKeyboard() {
    let keyboardLetters = Array.from($('.keyboard-letters'));
    keyboardLetters.forEach(letter => {
      if (!['A', 'E', 'I', 'O', 'U'].includes($(letter).text())) {
        $(letter).removeClass('vowel');
      }
    });
  },

  newPlayerTurn(array, index) {
    $('.game-winner').text(array[index].name);
    //$('.winning-score').text(array[index].wallet);
    $('.winning-score').text('$' + array[index].wallet.toLocaleString('en-US', { maximumFractionDigits: 0 }));
    if (index === 2) {
      $('.on-deck-name').text(array[0].name);
      //$('.on-deck-score').text(array[0].wallet);
      $('.on-deck-score').text('$' + array[0].wallet.toLocaleString('en-US', { maximumFractionDigits: 0 }));      
      $('.in-the-hole-name').text(array[1].name)
      //$('.in-the-hole-score').text(array[1].wallet)
      $('.in-the-hole-score').text('$' + array[1].wallet.toLocaleString('en-US', { maximumFractionDigits: 0 }));
    } else if (index === 1) {
      $('.on-deck-name').text(array[2].name);
      //$('.on-deck-score').text(array[2].wallet);
      $('.on-deck-score').text('$' + array[2].wallet.toLocaleString('en-US', { maximumFractionDigits: 0 }));
      $('.in-the-hole-name').text(array[0].name)
      //$('.in-the-hole-score').text(array[0].wallet)
      $('.in-the-hole-score').text('$' + array[0].wallet.toLocaleString('en-US', { maximumFractionDigits: 0 }));
    } else {
      $('.on-deck-name').text(array[1].name);
      //$('.on-deck-score').text(array[1].wallet);
      $('.on-deck-score').text('$' + array[1].wallet.toLocaleString('en-US', { maximumFractionDigits: 0 }));
      $('.in-the-hole-name').text(array[2].name)
      //$('.in-the-hole-score').text(array[2].wallet)
      $('.in-the-hole-score').text('$' + array[2].wallet.toLocaleString('en-US', { maximumFractionDigits: 0 }));
    }
  },

  highlightVowels() {
    let keyboardLetters = Array.from($('.keyboard-letters'));
    keyboardLetters.forEach(letter => {
        if ($(letter).hasClass('vowel') &&
         !$(letter).hasClass('vowel-disabled')) {
          $(letter).toggleClass('active-vowel');
        } else {
          if (!$(letter).hasClass('disabled')) {
            $(letter).addClass('temp-disabled');
          }
        }
    });
  },

  disableGuessedVowel(event) {
    if ($(event.target).hasClass('vowel')) {
      $(event.target).toggleClass('vowel-disabled');
    }
  },

  updateWallet(player) {
    //$('.winning-score').text(player.wallet);
    $('.winning-score').text('$' + player.wallet.toLocaleString('en-US', { maximumFractionDigits: 0 }));
  },

  updateCurrentSpin(value) {
    const displayValue = (!isNaN(value)) ? ('$' + value) : value;
    $('.spin-number').text(displayValue)
  },

  /*
  yellCurrentSpin(value) {
    if (value) {
      //$('.yell-box').text(value);
      $('.yell-box').html(value);
    }
    $('.yell-box').toggleClass('yell-active');
  },
  */

  yellCurrentSpin(value) {
    if (value) {
      const stringValue = String(value);
      const formattedValue = stringValue.replace(/\n/g, '<br>');
      $('.yell-box').html(formattedValue);
    }
    $('.yell-box').toggleClass('yell-active');
  },

  updateCategory(puzzle) {
    $('.hint-value').text(puzzle.currentPuzzle.category)
  },

  //Replacing this part so that I can generate a wheel with 16 wedges to match the physical wheel I built
  //displayWheelValues(wheel) {
  //  for (var i = 0; i < 6; i++) {
  //    $(`.mark${i + 1}`).text(wheel.spinValues[i])
  //  }
  //},

  /* WORKS: COMMENTING TEMPORARILY TO MODIFY LOSE TURN WEDGE
  displayWheelValues(wheel) {
    for (let i = 0; i < wheel.spinValues.length; i++) {
      const value = wheel.spinValues[i];
  
      if (typeof value === 'number') {
        $(`.mark${i + 1}`).text('$' + value);
      } else {
        const chars = value.split('').map((char, index) => `<span class="char${i + 1}-${index + 1}">${char}</span>`);
        $(`.mark${i + 1}`).html(chars.join(''));
      }

      //If this is a special wedge, need to adjust the css styles for it here once the spans have been created
      if (value === "$1 Million"){
        const mark14char1Element = document.querySelector('.mark14 .char14-1');
        const mark14char2Element = document.querySelector('.mark14 .char14-2');
        const mark14char3Element = document.querySelector('.mark14 .char14-3');
        const mark14char4Element = document.querySelector('.mark14 .char14-4');
        const mark14char5Element = document.querySelector('.mark14 .char14-5');
        const mark14char6Element = document.querySelector('.mark14 .char14-6');
        const mark14char7Element = document.querySelector('.mark14 .char14-7');
        const mark14char8Element = document.querySelector('.mark14 .char14-8');
        const mark14char9Element = document.querySelector('.mark14 .char14-9');
        const mark14char10Element = document.querySelector('.mark14 .char14-10');
  
        mark14char1Element.style.fontSize = '1.7rem';
        mark14char2Element.style.fontSize = '1.6rem';
        mark14char3Element.style.fontSize = '0.7rem';
        mark14char4Element.style.fontSize = '1.5rem';
        mark14char5Element.style.fontSize = '1.4rem';
        mark14char6Element.style.fontSize = '1.3rem';
        mark14char7Element.style.fontSize = '1.2rem';
        mark14char8Element.style.fontSize = '1.1rem';
        mark14char9Element.style.fontSize = '1.0rem';
        mark14char10Element.style.fontSize = '0.9rem';
      }
      else if (value === 'BANKRUPT'){
        const mark5char1Element = document.querySelector('.mark5 .char5-1');
        const mark5char2Element = document.querySelector('.mark5 .char5-2');
        const mark5char3Element = document.querySelector('.mark5 .char5-3');
        const mark5char4Element = document.querySelector('.mark5 .char5-4');
        const mark5char5Element = document.querySelector('.mark5 .char5-5');
        const mark5char6Element = document.querySelector('.mark5 .char5-6');
        const mark5char7Element = document.querySelector('.mark5 .char5-7');
        const mark5char8Element = document.querySelector('.mark5 .char5-8');
  
        mark5char1Element.style.fontSize = '1.8rem';
        mark5char2Element.style.fontSize = '1.7rem';
        mark5char3Element.style.fontSize = '1.6rem';
        mark5char4Element.style.fontSize = '1.5rem';
        mark5char5Element.style.fontSize = '1.4rem';
        mark5char6Element.style.fontSize = '1.3rem';
        mark5char7Element.style.fontSize = '1.2rem';
        mark5char8Element.style.fontSize = '1.1rem';
      }
      else if (value === 'LOSE TURN'){
        const mark14char1Element = document.querySelector('.mark14 .char14-1');
        const mark14char2Element = document.querySelector('.mark14 .char14-2');
        const mark14char3Element = document.querySelector('.mark14 .char14-3');
        const mark14char4Element = document.querySelector('.mark14 .char14-4');
        const mark14char5Element = document.querySelector('.mark14 .char14-5');
        const mark14char6Element = document.querySelector('.mark14 .char14-6');
        const mark14char7Element = document.querySelector('.mark14 .char14-7');
        const mark14char8Element = document.querySelector('.mark14 .char14-8');
        const mark14char9Element = document.querySelector('.mark14 .char14-9');

        mark14char1Element.style.writingMode = 'horizontal-tb';
        mark14char1Element.style.fontSize = '1.8rem';
        mark14char2Element.style.fontSize = '1.7rem';
        mark14char3Element.style.fontSize = '1.6rem';
        mark14char4Element.style.fontSize = '1.5rem';
        mark14char5Element.style.fontSize = '0.7rem';
        mark14char6Element.style.fontSize = '1.3rem';
        mark14char7Element.style.fontSize = '1.2rem';
        mark14char8Element.style.fontSize = '1.1rem';
        mark14char9Element.style.fontSize = '1.0rem';
      }
    }
  },
  */

  displayWheelValues(wheel) {
    for (let i = 0; i < wheel.spinValues.length; i++) {
        const value = wheel.spinValues[i];

        if (value === 'LOSE TURN') {
            const chars = [
                `<span class="char${i + 1}-1">LOSE</span>`,
                ...value.split('').slice(5).map((char, index) => `<span class="char${i + 1}-${index + 2}">${char}</span>`)
            ];
            $(`.mark${i + 1}`).html(chars.join(''));
        } else if (typeof value === 'number') {
            $(`.mark${i + 1}`).text('$' + value);
        } else {
            const chars = value.split('').map((char, index) => `<span class="char${i + 1}-${index + 1}">${char}</span>`);
            $(`.mark${i + 1}`).html(chars.join(''));
        }

      //If this is a special wedge, need to adjust the css styles for it here once the spans have been created
      if (value === "$1 Million"){
        const mark14char1Element = document.querySelector('.mark14 .char14-1');
        const mark14char2Element = document.querySelector('.mark14 .char14-2');
        const mark14char3Element = document.querySelector('.mark14 .char14-3');
        const mark14char4Element = document.querySelector('.mark14 .char14-4');
        const mark14char5Element = document.querySelector('.mark14 .char14-5');
        const mark14char6Element = document.querySelector('.mark14 .char14-6');
        const mark14char7Element = document.querySelector('.mark14 .char14-7');
        const mark14char8Element = document.querySelector('.mark14 .char14-8');
        const mark14char9Element = document.querySelector('.mark14 .char14-9');
        const mark14char10Element = document.querySelector('.mark14 .char14-10');
  
        mark14char1Element.style.fontSize = '1.7rem';
        mark14char2Element.style.fontSize = '1.6rem';
        mark14char3Element.style.fontSize = '0.7rem';
        mark14char4Element.style.fontSize = '1.5rem';
        mark14char5Element.style.fontSize = '1.4rem';
        mark14char6Element.style.fontSize = '1.3rem';
        mark14char7Element.style.fontSize = '1.2rem';
        mark14char8Element.style.fontSize = '1.1rem';
        mark14char9Element.style.fontSize = '1.0rem';
        mark14char10Element.style.fontSize = '0.9rem';
      }
      else if (value === 'BANKRUPT'){
        const mark5char1Element = document.querySelector('.mark5 .char5-1');
        const mark5char2Element = document.querySelector('.mark5 .char5-2');
        const mark5char3Element = document.querySelector('.mark5 .char5-3');
        const mark5char4Element = document.querySelector('.mark5 .char5-4');
        const mark5char5Element = document.querySelector('.mark5 .char5-5');
        const mark5char6Element = document.querySelector('.mark5 .char5-6');
        const mark5char7Element = document.querySelector('.mark5 .char5-7');
        const mark5char8Element = document.querySelector('.mark5 .char5-8');
  
        mark5char1Element.style.fontSize = '1.8rem';
        mark5char2Element.style.fontSize = '1.7rem';
        mark5char3Element.style.fontSize = '1.6rem';
        mark5char4Element.style.fontSize = '1.5rem';
        mark5char5Element.style.fontSize = '1.4rem';
        mark5char6Element.style.fontSize = '1.3rem';
        mark5char7Element.style.fontSize = '1.2rem';
        mark5char8Element.style.fontSize = '1.1rem';
      }
      else if (value === 'LOSE TURN'){
        const mark14char1Element = document.querySelector('.mark14 .char14-1');
        const mark14char2Element = document.querySelector('.mark14 .char14-2');
        const mark14char3Element = document.querySelector('.mark14 .char14-3');
        const mark14char4Element = document.querySelector('.mark14 .char14-4');
        const mark14char5Element = document.querySelector('.mark14 .char14-5');
        const mark14char6Element = document.querySelector('.mark14 .char14-6');
        //const mark14char7Element = document.querySelector('.mark14 .char14-7');
        //const mark14char8Element = document.querySelector('.mark14 .char14-8');
        //const mark14char9Element = document.querySelector('.mark14 .char14-9');
  
        mark14char1Element.style.fontSize = '1.8rem';
        mark14char2Element.style.fontSize = '1.7rem';
        mark14char3Element.style.fontSize = '1.6rem';
        mark14char4Element.style.fontSize = '1.5rem';
        mark14char5Element.style.fontSize = '0.7rem';
        mark14char6Element.style.fontSize = '1.3rem';
        //mark14char7Element.style.fontSize = '1.2rem';
        //mark14char8Element.style.fontSize = '1.1rem';
        //mark14char9Element.style.fontSize = '1.0rem';
      }
    }
},


  enableLetters() {
    let keyboardLetters = Array.from($('.keyboard-letters'));
    keyboardLetters.forEach(letter => {
      if ($(letter).hasClass('temp-disabled')) {
        $(letter).toggleClass('temp-disabled');
      }
    });
  },

  disableKeyboard() {
    let keyboardLetters = Array.from($('.keyboard-letters'));
    keyboardLetters.forEach(letter => {
      if (!$(letter).hasClass('vowel')) {
        $(letter).toggleClass('temp-disabled');
      }
    })
  },

  displaySolvePopup() {
    $('.solve-popup').css('display', 'flex');
    $('.solve-input').focus();
  },

  hideSolvePopup() {
    $('.solve-popup').css('display', 'none');
  },

  updateBankAccts(winner, i) {
    $(`.player${i + 1}-ba-num`).text(winner.bankAcct.toLocaleString('en-US', { maximumFractionDigits: 0 }));
  },

  clearBankAccts() {
    $('.player1-ba-num').text('0');
    $('.player2-ba-num').text('0');
    $('.player3-ba-num').text('0');
    $('.player1-ba').text('P1: $');
    $('.player2-ba').text('P2: $');
    $('.player3-ba').text('P3: $')
  },

  displayBonusIntro(winner, score) {
    $('.popup-cover').css('display', 'unset');
    $('.bonus-round-intro').css('display', 'flex');
    $('.name-of-bonus-player').text(winner);

    // Format the winnings as a dollar value with commas as thousands separators
    let formattedScore = score.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
    $('.winner-money-pre-bonus').text(formattedScore);
    //$('.winner-money-pre-bonus').text(score);
  },

  startBonusRound() {
    $('.popup-cover').css('display', 'none');
    $('.bonus-round-intro').css('display', 'none');
    $('header').html(
      `<h1 class="bonus-round-header">BONUS RoUND</h1>
      <h2 class="bonus-instructions">Choose 1 vowel and 3 consonants</h2>`)
    $('header').css('display', 'block');
    $('.bank-accts').css('bottom', '35px');
  },

  resetGameDisplay() {
    $('.vowel-button').prop('disabled', false);
    $('.spin-button').prop('disabled', false);
    $('.spin-number').text('--');
    $('.bonus-round-intro').css('display', 'none');
    $('.popup-cover').css('display', 'none');
    $('header').css('display', 'unset');
    $('header').html(
      `<header>
        <div class="on-deck">
          <h2 class="on-deck-name">player 2</h2>
          <h2 class="on-deck-score">2,000</h2>
        </div>
        <div class="at-bat">
          <h2 class="game-winner">player 1</h2>
          <h2 class="winning-score">2,000</h2>
          <button class="spin-button top-buttons">SPIN</button>
          <button class="solve-button top-buttons">SOLVE</button>
          <button class="vowel-button top-buttons">VOWEL</button>
        </div>
        <div class="in-the-hole">
          <h2 class="in-the-hole-name">player 3</h2>
          <h2 class="in-the-hole-score">2,000</h2>
        </div>
      </header>`);
  },

  resetOnQuit() {
    $('.vowel-error').css('display', 'none');
    $('.solve-popup').css('display', 'none');
    $('.solve-input').val('');
    $('.spin-number').text('--');
    $('.vowel-button').prop('disabled', false);
    $('.spin-button').prop('disabled', false);
  }

}

export default domUpdates;
