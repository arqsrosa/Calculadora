const previsaoResultadoText = document.querySelector("#previsaoResultado");
const resultadoText = document.querySelector("#resultado");
const button = document.querySelectorAll("#buttonsConjunto button");

class Calculator{
    constructor(previsaoResultadoText, resultadoText) {
        this.previsaoResultadoText = resultadoText;
        this.resultadoText = previsaoResultadoText;
        this.resultadoText = "";
}

  
  addDigit(digit) {
    console.log(digit);
    if (digit === "." && this.resultadoText.innerText.includes(".")) {
      return;
    }

    this.resultadoText = digit;
    this.updateScreen();
  }

  
  processOperation(operation) {
    if (this.resultadoText.innerText === "" && operation !== "C") {
      if (this.previsaoResultadoText.innerText !== "") {
        this.changeOperation(operation);
      }
      return;
    }

    let operationValue;
    let previous = +this.previsaoResultadoText.innerText.split(" ")[0];
    let current = +this.resultadoText.innerText;

    switch (operation) {
      case "+":
        operationValue = previous + current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "-":
        operationValue = previous - current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "X":
        operationValue = previous * current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "/":
        operationValue = previous / current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
        case "()":
        operationValue = previous * (previous+current);
        this.updateScreen(operationValue, operation, current, previous);
        break;
        case "+/-":
        operationValue = previous * (previous+current);
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "C":
        this.processClearOperator();
        break;
      case "%":
        operationValue = previous + current/100;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "=":
        this.processEqualOperator();
        break;
      default:
        return;
    }
  }


  updateScreen(
    operationValue = null,
    operation = null,
    current = null,
    previous = null
  ) {
    if (operationValue === null) {
      this.currentOperationText.innerText += this.currentOperation;
    } else {
      if (previous === 0) {
        operationValue = current;
      }
      
      this.previsaoResultadoText.innerText = `${operationValue} ${operation}`;
      this.resultadoText.innerText = "";
    }
  }

 
  changeOperation(operation) {
    const mathOperations = ["*", "-", "+", "/"];

    if (!mathOperations.includes(operation)) {
      return;
    }

    this.previsaoResultadoText.innerText =
      this.previsaoResultadoText.innerText.slice(0, -1) + operation;
  }

  
  processDelOperator() {
    this.resultadoText.innerText =
      this.resultadoText.innerText.slice(0, -1);
  }

  processClearCurrentOperator() {
    this.resultadoText.innerText = "";
  }

  processClearOperator() {
    this.resultadoText.innerText = "";
    this.previsaoResultadoText.innerText = "";
  }

  processEqualOperator() {
    let operation = this.previsaoResultadoText.innerText.split(" ")[1];

    this.processOperation(operation);
  }
}

const calc = new Calculator(previsaoResultadoText, resultadoText);

buttons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const value = e.target.innerText;

    if (+value >= 0 || value === ".") {
      console.log(value);
      calc.addDigit(value);
    } else {
      calc.processOperation(value);
    }
  });
});