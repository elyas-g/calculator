function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function operate(operator, a, b) {
  if (operator === "+") {
    return add(a, b);
  }

  if (operator === "-") {
    return subtract(a, b);
  }

  if (operator === "*") {
    return multiply(a, b);
  }

  if (operator === "/") {
    return divide(a, b);
  }
}
let operatorClicked = false;

const expression = [];

function store(value) {
  const lastItem = expression[expression.length - 1];

  if (lastItem !== undefined && !isNaN(lastItem)) {
    if (value == "+" || value == "-" || value == "*" || value == "/") {
      expression.push(value);
    } else {
      expression[expression.length - 1] = lastItem + value;
    }
  } else {
    expression.push(value);
  }
}

function populateDisplay(value) {
  const displayBox = document.querySelector(".display");
  displayBox.innerText += value;
}

function addEvent(type, selector, callback, parent = document) {
  parent.addEventListener(type, (e) => {
    if (e.target.matches(selector)) {
      callback(e);
    }
  });
}

addEvent("click", ".digit", (e) => {
  const value = e.target.innerText;
  populateDisplay(value);
  store(value);
  operatorClicked = false;
});

addEvent("click", ".operator", (e) => {
  const value = e.target.innerText;
  if (operatorClicked === false) {
    populateDisplay(value);
    store(value);
    operatorClicked = true;
  }
});

addEvent("click", ".operation", (e) => {
  const a = parseFloat(expression[0]);
  const b = parseFloat(expression[2]);
  const operator = expression[1];

  const ans = operate(operator, a, b);

  populateDisplay(` = ${ans}`);
  expression.length = 0;
  operatorClicked = false;
});
