const processNumpadInput = (e) => {

  // force user to restart calculator
  if (isError) {
    return;
  }

  // when user has defined operation it means it's time to write into second register
  if (operation !== undefined) {
    curReg = 1;
  }

  let btnValue = e.currentTarget.textContent;

  // when inputting zero when only zero is registered, do nothing except update the screen
  if (inputRegister[curReg].length === 1 && btnValue === '0' && inputRegister[curReg][0] === 0) {
    updateScreen();
    return;
  }

  // allow to set only one decimal point
  if (btnValue === '.') {
    if (isFloat[curReg]) {
      return;
    } else {
      isFloat[curReg] = true;
    }
  }

  // replace zero in register with num > 0, when there's only zero in register
  if (inputRegister[curReg].length === 1 && (btnValue !== '0' && btnValue !== '.') && inputRegister[curReg][0] === 0) {
    inputRegister[curReg][0] = btnValue;
    // Otherwise just push the number to register
  } else if (inputRegister[curReg].length < screenNumLim) {
    inputRegister[curReg].push(btnValue);
  }

  updateScreen();

}
const processFuncpadInput = (e) => {

    if (isError) {
      return;
    }

    operation = e.currentTarget.dataset['func'];

  // operate on inputs when switched to second register
  if (curReg === 1) {

    // make numbers to operate on
    let num1 = parseFloat(inputRegister[0].join(''));
    let num2 = parseFloat(inputRegister[1].join(''));
    let result = undefined;

    // prevent division by zero
    if (num2 === 0 && operation === 'div') {
      result = "2spooky4me"
      isError = true;
    } else {
      result = ops[operation](num1, num2);
    }

    // prevent displaying result that is too large
    if (Math.abs(result) > 99999999) {
      result = "2dum4dat"
      isError = true;
    }

    inputRegister[0] = [];

    // push result to first register for it be displayed
    inputRegister[0].push(result)

    // reset for next operation
    inputRegister[1] = [0];

    isFloat[1] = false;
    operation = undefined;
    curReg = 0
    // Display the result
    updateScreen();
  }
}
const clearEntry = () => {
  if (isError) {
    return;
  }
  inputRegister[curReg] = [0];
  isFloat[curReg] = false;
  updateScreen();
}
const updateScreen = () => {
  screen.textContent = inputRegister[curReg].join('');
}
const clearAll = function onACPressResetEverything() {
    inputRegister = [[0],[0]]
    isFloat = [false, false];
    curReg = 0;
    operation = undefined;
    calcMem = 0;
    updateScreen();
    isError = false;
}
const shrinkRow = function onButtonClickShrinkButtonRow () {

}

ops = {
  'sum' : (num1, num2) => num1 + num2,
  'sub' : (num1, num2) => num1 - num2,
  'div' : (num1, num2) => num1 / num2,
  'mult' : (num1, num2) => num1 * num2,
  'perc' : (num1, num2) => num1 * (num2/100),
}

/*
memOps = {
  'madd' : ()=>,
  'msub' : ()=>,
  'mrc' : ()=>,
  'mrc' : ()=>,
}
*/

let inputRegister = [[0],[0]]
// tracks which register to display and write in
let curReg = 0;
let operation = undefined;
let isFloat = [false, false];

// When calculator must be reset - aesthetic
let isError = false;

// holds calculator's memory
let calcMem = 0;

// limits how many numbers can be displayed on the screen
const screenNumLim = 8;
const screen = document.querySelector('#screen')

const numPad = document.querySelectorAll('.num-btn');
numPad.forEach(numBtn => numBtn.addEventListener('click', processNumpadInput))

const acBtn = document.querySelector("#ac")
acBtn.addEventListener('click', clearAll);

const ceBtn = document.querySelector('.ce-btn');
ceBtn.addEventListener('click', clearEntry);

const funcPad = document.querySelectorAll('.func-btn');
funcPad.forEach(funcBtn => funcBtn.addEventListener('click', processFuncpadInput));

updateScreen();
