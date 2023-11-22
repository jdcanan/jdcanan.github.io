import domUpdates from './DOM.js';

class Wheel {
  constructor(spinValues) {
    this.spinValues = spinValues;
    this.currentValue = null;
  }

  grabSpinValue() {
    let randomIndex = Math.floor(Math.random() * this.spinValues.length);
    this.currentValue = this.spinValues[randomIndex];
    domUpdates.updateCurrentSpin(this.currentValue);
  }

  /* If user selects a wheel value manually, this function should look up and return that wheel value.
     For development purposes, hardcoding the returned value to 25 for now */
  getManualSpinValue() {
    this.currentValue = 25;
    domUpdates.updateCurrentSpin(this.currentValue);
  }
  
}


export default Wheel;
