const defaultResult = 0;
let currentResult = defaultResult;
let logEntries = [];
// Gets input from input field
function getUserNum() {
  return parseInt(userInput.value);
}

// Generates and writes calculation log
function createAndWriteOutput(operator, resultBeforeCalc, newNum) {
  const description = `${resultBeforeCalc} ${operator} ${newNum}`;
  outputResult(currentResult, description);
}

function writeToLog(operator, prevResult, enteredNum, result) {
  const logEntry = {
    operator,
    prevResult,
    enteredNum,
    result,
  };
  logEntries.push(logEntry);
  console.log(logEntries)
}

function calculateResult (calcType){
  const enteredNum = getUserNum();
  const initialResult = currentResult;
  let operator;
  if(calcType === 'ADD'){
    currentResult += enteredNum;
    operator = '+';
  } else if (calcType === 'SUBTRACT'){
    currentResult -= enteredNum;
    operator = '-';
  } else if (calcType === 'MULTYPLY'){
    currentResult *= enteredNum;
    operator = '*';
  } else if (calcType === 'DIVIDE') {
    currentResult /= enteredNum;
    operator = '/';
  } else {
    return
  }
  createAndWriteOutput(operator, initialResult, enteredNum);
  writeToLog(calcType, initialResult, enteredNum, currentResult);
}
addBtn.addEventListener('click', () => calculateResult('ADD'));
subtractBtn.addEventListener('click', () => calculateResult('SUBTRACT'));
multiplyBtn.addEventListener('click', () => calculateResult('MULTIPLY'));
divideBtn.addEventListener('click', () => calculateResult('DIVIDE'));