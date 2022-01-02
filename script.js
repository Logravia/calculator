// holds number input by user as seperate chars
input = [[],[]]

// tracks which in
let curInput = 0;
let operand = "";

// holds calculator's memory
let calcMem = 0;

// limits how many numbers can be displayed on the screen
const screenNumLim = 10;
const screen = document.querySelector('#screen')


// adds pressed number to input1 or input2 according to calculator logic
const processNumInput = (e) => {
  let btnNum = e.currentTarget.textContent;

  if (input[curInput].length < screenNumLim) {
    input[curInput].push(btnNum);
  }
  updateScreen();
}

const updateScreen = () => {
  screen.textContent = input[curInput].join('');
}



const numPad = document.querySelectorAll('.num-btn');
numPad.forEach(numBtn => numBtn.addEventListener('click', processNumInput))

const shrinkRow = function onButtonClickShrinkButtonRow () {

}
