// holds number input by user as seperate chars
// adds pressed number to input1 or input2 according to calculator logic
const processNumInput = (e) => {

  let btnNum = e.currentTarget.textContent;

  if (input[curInput].length < screenNumLim) {
    input[curInput].push(btnNum);
  }

  updateScreen();
}
const processFuncInput = (e) => {

    operand = e.currentTarget.dataset['func'];

  switch (operand) {
    case 'add':
      break;
    case 'sub':
      break;
    case 'div':
      break;
    case 'mult':
      break;
    case 'perc':
      break;
    case 'eq':
      break;
    case 'madd':
      break;
    case 'msub':
      break;
    case 'mrc':
      break;
    case 'ce':
      eraseNum();
      break;
    default:
      break;

  }

}
const eraseNum = () => {
  input[curInput].pop();
  updateScreen();
}
const updateScreen = () => {
  screen.textContent = input[curInput].join('');
}
const clearAll = function onACPressResetEverything() {
    input = [[],[]]
    curInput = 0;
    operand = "";
    calcMem = 0;
    updateScreen();
}
const shrinkRow = function onButtonClickShrinkButtonRow () {

}

let input = [[],[]]

// tracks which in
let curInput = 0;
let operand = "";

// holds calculator's memory
let calcMem = 0;

// limits how many numbers can be displayed on the screen
const screenNumLim = 10;
const screen = document.querySelector('#screen')

const numPad = document.querySelectorAll('.num-btn');
numPad.forEach(numBtn => numBtn.addEventListener('click', processNumInput))

const acBtn = document.querySelector("#ac")
acBtn.addEventListener('click', clearAll);

const funcPad = document.querySelectorAll('.func-btn');
funcPad.forEach(funcBtn => funcBtn.addEventListener('click', processFuncInput));
