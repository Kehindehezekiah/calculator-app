let expression = document.getElementById('expression');
let result = document.getElementById('result');

let currentInput = '';
let firstNumber = '';
let operator = '';
let justCalculated = false;

document.querySelectorAll('button').forEach(button => {
  button.addEventListener('click', () => {
    let value = button.textContent.trim();

    if (value === 'C') {
      currentInput = '';
      firstNumber = '';
      operator = '';
      expression.textContent = '';
      result.textContent = '0';
      justCalculated = false;

    } else if (value === '⌫') {
      if (justCalculated) return;
      currentInput = currentInput.slice(0, -1);
      result.textContent = currentInput || '0';
      if (operator) {
        expression.textContent = firstNumber + operator + currentInput;
      } else {
        expression.textContent = currentInput;
      }

    } else if (value === '+' || value === '-' || value === '×' || value === '÷') {
      if (currentInput === '' && firstNumber === '') return;
      if (currentInput !== '' && firstNumber !== '') {
        let n1 = parseFloat(firstNumber);
        let n2 = parseFloat(currentInput);
        let calc = 0;
        if (operator === '+') calc = n1 + n2;
        if (operator === '-') calc = n1 - n2;
        if (operator === '×') calc = n1 * n2;
        if (operator === '÷') calc = n1 / n2;
        firstNumber = calc.toString();
        result.textContent = firstNumber;
        currentInput = '';
      } else {
        firstNumber = currentInput;
        currentInput = '';
      }
      operator = value;
      expression.textContent = firstNumber + operator;
      justCalculated = false;

    } else if (value === '%') {
      if (currentInput !== '') {
        currentInput = (parseFloat(currentInput) / 100).toString();
        result.textContent = currentInput;
        expression.textContent = operator
          ? firstNumber + operator + currentInput
          : currentInput;
      }

    } else if (value === '=') {
      if (firstNumber === '' || currentInput === '') return;
      let n1 = parseFloat(firstNumber);
      let n2 = parseFloat(currentInput);
      let calc = 0;
      if (operator === '+') calc = n1 + n2;
      if (operator === '-') calc = n1 - n2;
      if (operator === '×') calc = n1 * n2;
      if (operator === '÷') calc = n1 / n2;

      expression.textContent = firstNumber + operator + currentInput;
      result.textContent = '=' + calc.toLocaleString();
      currentInput = calc.toString();
      firstNumber = '';
      operator = '';
      justCalculated = true;

    } else {
      if (justCalculated) {
        currentInput = '';
        expression.textContent = '';
        justCalculated = false;
      }
      if (value === '.' && currentInput.includes('.')) return;
      currentInput += value;
      result.textContent = currentInput;
      expression.textContent = operator
        ? firstNumber + operator + currentInput
        : currentInput;
    }
  });
});