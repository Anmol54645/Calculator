let display = document.getElementById('result');

function appendToDisplay(value) {
    display.value += value;
}

function clearDisplay() {
    display.value = '';
}

function backspace() {
    display.value = display.value.slice(0, -1);
}

function calculate() {
    try {
        // Replace × with * for evaluation
        let expression = display.value.replace(/×/g, '*');
        
        // Basic validation to prevent harmful code execution
        if (!/^[0-9+\-*/.()\s]+$/.test(expression)) {
            throw new Error('Invalid expression');
        }
        
        // Evaluate the expression
        let result = eval(expression);
        
        // Handle division by zero and other mathematical errors
        if (!isFinite(result)) {
            throw new Error('Math error');
        }
        
        display.value = result;
    } catch (error) {
        display.value = 'Error';
        
        // Clear the error after 1.5 seconds
        setTimeout(() => {
            clearDisplay();
        }, 1500);
    }
}

// Keyboard support
document.addEventListener('keydown', function(event) {
    const key = event.key;
    
    // Numbers
    if (key >= '0' && key <= '9') {
        appendToDisplay(key);
    }
    // Operators
    else if (key === '+' || key === '-' || key === '*') {
        appendToDisplay(key);
    }
    // Division
    else if (key === '/') {
        event.preventDefault();
        appendToDisplay('/');
    }
    // Decimal point
    else if (key === '.') {
        appendToDisplay('.');
    }
    // Equals or Enter
    else if (key === '=' || key === 'Enter') {
        event.preventDefault();
        calculate();
    }
    // Backspace
    else if (key === 'Backspace') {
        event.preventDefault();
        backspace();
    }
    // Escape or Delete for clear
    else if (key === 'Escape' || key === 'Delete') {
        event.preventDefault();
        clearDisplay();
    }
});