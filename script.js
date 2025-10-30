function roundTo(num, decimals) {
  let factor = 10 ** decimals;
  return Math.round(num * factor) / factor;
}

function add(a, b) {
  return roundTo(a + b, 4);
}

function subtract(a, b) {
  return roundTo(a - b, 4);
}

function multiply(a, b) {
  return roundTo(a * b, 4);
}

function divide(a, b) {
  try {
    if (b === 0) {
      throw new Error("Division by zero is not allowed.");
    }
    return roundTo(a / b, 4);
  } catch (error) {
    return null;
  }
}

function operate(operator, a, b) {
  if (operator === "+") {
    return add(a, b);
  }

  if (operator === "-") {
    return subtract(a, b);
  }

  if (operator === "x") {
    return multiply(a, b);
  }

  if (operator === "÷") {
    return divide(a, b);
  }
}

let operatorClicked = false;
let dotOn = false;
let equalTo = false;

function populateDisplay(value) {
  const displayBox = document.querySelector(".display");
  displayBox.innerText += value;
}

function clearDisplay() {
  dotOn = false;
  const displayBox = document.querySelector(".display");
  displayBox.innerText = "";
}

function error() {
  populateDisplay("Math Error");
  expression.length = 0;
  operatorClicked = false;
  return;
}

// Event listener
function addEvent(type, selector, callback, parent = document) {
  parent.addEventListener(type, (e) => {
    if (e.target.matches(selector)) {
      callback(e);
    }
  });
}

const expression = [];

// storage
function store(value) {
  const lastItem = expression[expression.length - 1];

  if (lastItem !== undefined && !isNaN(lastItem)) {
    if (value == "+" || value == "-" || value == "x" || value == "÷") {
      expression.push(value);
    } else if (value == ".") {
      expression[expression.length - 1] = lastItem + value;
    } else {
      expression[expression.length - 1] = lastItem + value;
    }
  } else {
    expression.push(value);
  }
}

function accessStorage() {
  const a = parseFloat(expression[0]);
  const b = parseFloat(expression[2]);
  const operator = expression[1];
  return { a, b, operator };
}

addEvent("click", ".digit", (e) => {
  if (equalTo) {
    clearDisplay();
  }
  equalTo = false;
  afterError();
  const value = e.target.innerText;
  populateDisplay(value);
  store(value);
  operatorClicked = false;
  if (value.includes(".")) {
    dotOn = true;
  }
});

addEvent("click", ".operator", (e) => {
  afterError();
  const value = e.target.innerText;
  if (operatorClicked === false) {
    if (expression.length == 3) {
      const values = accessStorage();
      const operator = values.operator;
      const a = parseFloat(values.a);
      const b = parseFloat(values.b);
      const ans = operate(operator, a, b);

      clearDisplay();

      if (ans === null || isNaN(ans)) {
        error();
      }

      populateDisplay(ans);
      populateDisplay(value);
      expression.length = 0;
      store(ans);
      store(value);
      operatorClicked = true;
    } else {
      populateDisplay(value);
      store(value);
      operatorClicked = true;
    }
  }
  dotOn = false;
});

addEvent("click", ".operation", (e) => {
  if (expression.length == 3) {
    afterError();
    const values = accessStorage();
    const operator = values.operator;
    const a = parseFloat(values.a);
    const b = parseFloat(values.b);
    const ans = operate(operator, a, b);

    clearDisplay();

    if (ans === null || isNaN(ans)) {
      error();
    }

    populateDisplay(ans);
    store(ans);
    expression.length = 0;
    operatorClicked = false;
    equalTo = true;
  }
});

addEvent("click", ".dot", (e) => {
  afterError();
  const value = e.target.innerText;
  if (dotOn == false) {
    if (expression.length == 0) {
      populateDisplay(`0${value}`);
      store(`0${value}`);
    } else {
      populateDisplay(value);
      store(value);
    }
    operatorClicked = true;
    dotOn = true;
  } else {
    return;
  }
});

addEvent("click", ".clear", (e) => {
  operatorClicked = false;
  dotOn = false;
  equalTo = false;
  clearDisplay();
  expression.length = 0;
});

addEvent("click", ".backspace", () => {
  if (expression.length === 0) return;

  let lastItem = expression[expression.length - 1];

  if (!isNaN(lastItem)) {
    lastItem = lastItem.slice(0, -1);

    if (lastItem === "") {
      expression.pop();
    } else {
      expression[expression.length - 1] = lastItem;
    }
  } else {
    expression.pop();
  }

  clearDisplay();
  expression.forEach((item) => populateDisplay(item));
});

function afterError() {
  const displayBox = document.querySelector(".display");
  if (displayBox.innerText == "Math Error") {
    displayBox.innerText = "";
  }
}
