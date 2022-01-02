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

    operation = e.currentTarget.dataset['func'];
    // saves user input into second array now

  if (curInput === 1 && input[1].length > 0) {

    let num1 = parseFloat(input[0].join(''));
    let num2 = parseFloat(input[1].join(''));

    input[0] = [];
    input[0].push(operations[operation](num1, num2));
    curInput = 0;
    input[1] = [];

    updateScreen();
  }

    curInput = 1;

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
    operation = "";
    calcMem = 0;
    updateScreen();
}
const shrinkRow = function onButtonClickShrinkButtonRow () {

}

operations = {
  'sum' : (num1, num2) => num1 + num2,
  'sub' : (num1, num2) => num1 - num2,
}

let input = [[],[]]

// tracks which in
let curInput = 0;
let operation = undefined;

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
