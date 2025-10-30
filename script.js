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
  try {
    if (b === 0) {
      throw new Error("Division by zero is not allowed.");
    }
    return a / b;
  } catch (error) {
    expression.length = 0;
    return populateDisplay("Math Error");
  }
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

function populateDisplay(value) {
  const displayBox = document.querySelector(".display");
  displayBox.innerText += value;
}

function clearDisplay() {
  const displayBox = document.querySelector(".display");
  displayBox.innerText = "";
}

function addEvent(type, selector, callback, parent = document) {
  parent.addEventListener(type, (e) => {
    if (e.target.matches(selector)) {
      callback(e);
    }
  });
}

const expression = [];
let operatorClicked = false;

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

function accessStorage() {
  const a = parseFloat(expression[0]);
  const b = parseFloat(expression[2]);
  const operator = expression[1];
  return { a, b, operator };
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
    if (expression.length == 3) {
      const values = accessStorage();
      const operator = values.operator;
      const a = parseFloat(values.a);
      const b = parseFloat(values.b);
      const ans = operate(operator, a, b);
      clearDisplay();
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
});

addEvent("click", ".operation", (e) => {
  const values = accessStorage();
  const operator = values.operator;
  const a = parseFloat(values.a);
  const b = parseFloat(values.b);

  const ans = operate(operator, a, b);
  clearDisplay();
  populateDisplay(ans);
  expression.length = 0;
  store(ans);
  operatorClicked = false;
});
