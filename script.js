// Student Names: [Add Group Members Here]
// Class: M.3 | Subject: Sci30113

// Array for storing calculation objects
let historyData = [];

// DOM Element References
const tempForm = document.getElementById('tempForm');
const tempInput = document.getElementById('temperature');
const unitFromSelect = document.getElementById('unitFrom');
const unitToSelect = document.getElementById('unitTo');
const resultText = document.getElementById('resultText');
const historyList = document.getElementById('historyList');
const clearBtn = document.getElementById('clearBtn');

// 1. Temperature Calculation Logic
function calculateTemperature(val, from, to) {
    let celsius;

    // Convert input to Celsius first
    if (from === 'C') {
        celsius = val;
    } else if (from === 'F') {
        celsius = (val - 32) * (5 / 9);
    } else if (from === 'K') {
        celsius = val - 273.15;
    }

    // Convert Celsius to Target Unit
    if (to === 'C') {
        return celsius;
    } else if (to === 'F') {
        return (celsius * (9 / 5)) + 32;
    } else if (to === 'K') {
        return celsius + 273.15;
    }
}

// 2. Render History List using For Loop
function renderHistory() {
    historyList.innerHTML = ''; // Clear current display

    if (historyData.length === 0) {
        historyList.innerHTML = '<li class="empty-msg">No history recorded yet.</li>';
        return;
    }

    // Loop through history array
    for (let i = 0; i < historyData.length; i++) {
        const item = historyData[i];
        const li = document.createElement('li');
        li.textContent = `${item.input}°${item.from} ➔ ${item.output}°${item.to}`;
        historyList.prepend(li); // Show newest first
    }
}

// 3. Event Handling for Form Submission
tempForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const inputValue = parseFloat(tempInput.value);
    const fromUnit = unitFromSelect.value;
    const toUnit = unitToSelect.value;

    if (isNaN(inputValue)) {
        resultText.textContent = "Please enter a valid number.";
        return;
    }

    // Execute Calculation
    const convertedVal = calculateTemperature(inputValue, fromUnit, toUnit);
    const formattedResult = convertedVal.toFixed(2);

    // Update Main Result Box
    const resultString = `${inputValue} °${fromUnit} = ${formattedResult} °${toUnit}`;
    resultText.textContent = resultString;

    // Add Object to History Array
    const logItem = {
        input: inputValue,
        from: fromUnit,
        output: formattedResult,
        to: toUnit
    };
    historyData.push(logItem);

    // Refresh History UI
    renderHistory();
});

// 4. Clear History Event
clearBtn.addEventListener('click', function () {
    historyData = [];
    renderHistory();
});