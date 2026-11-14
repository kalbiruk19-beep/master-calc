// Wait for the HTML to fully load before running
document.addEventListener('DOMContentLoaded', () => {
    const menuButtons = document.querySelectorAll('.menu-btn');
    const views = document.querySelectorAll('.view');
    
    // 1. Add a "Back" button to every section except the main menu
    views.forEach(view => {
        if (view.id !== 'main-menu') {
            const backBtn = document.createElement('button');
            backBtn.className = 'back-btn';
            backBtn.textContent = '← Back to Menu';
            view.prepend(backBtn); // Puts the button at the top of the section
            
            // Make the back button return to the main menu
            backBtn.addEventListener('click', () => {
                showView('main-menu');
            });
        }
    });

    // 2. Add tap events to all main menu buttons
    menuButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.getAttribute('data-target');
            showView(targetId);
        });
    });

    // 3. Function to handle switching screens
    function showView(viewId) {
        // Hide all views first
        views.forEach(view => {
            view.classList.remove('active');
        });
        
        // Show the specific view we want
        const targetView = document.getElementById(viewId);
        if (targetView) {
            targetView.classList.add('active');
        }
    }
      // --- UNIT CONVERTER LOGIC ---
    const unitData = {
        length: { meter: 1, kilometer: 1000, centimeter: 0.01, mile: 1609.34, foot: 0.3048, inch: 0.0254 },
        weight: { kilogram: 1, gram: 0.001, pound: 0.453592, ounce: 0.0283495 },
        temperature: { celsius: 'C', fahrenheit: 'F', kelvin: 'K' }
    };

    const categorySelect = document.getElementById('unit-category');
    const fromSelect = document.getElementById('unit-from');
    const toSelect = document.getElementById('unit-to');
    const unitInput = document.getElementById('unit-input');
    const convertBtn = document.getElementById('convert-btn');
    const unitResult = document.getElementById('unit-result');

    // Function to populate the From/To dropdowns
    function populateUnits() {
        const category = categorySelect.value;
        const units = Object.keys(unitData[category]);
        
        fromSelect.innerHTML = '';
        toSelect.innerHTML = '';
        
        units.forEach(unit => {
            fromSelect.innerHTML += `<option value="${unit}">${unit}</option>`;
            toSelect.innerHTML += `<option value="${unit}">${unit}</option>`;
        });
        // Set default "To" to the second unit so it doesn't match "From"
        if (units.length > 1) toSelect.value = units[1]; 
    }

    // Listen for category change and run on initial load
    categorySelect.addEventListener('change', populateUnits);
    populateUnits(); 

    // Convert button logic
    convertBtn.addEventListener('click', () => {
        const val = parseFloat(unitInput.value);
        if (isNaN(val)) {
            unitResult.textContent = 'Please enter a valid number';
            return;
        }

        const category = categorySelect.value;
        const from = fromSelect.value;
        const to = toSelect.value;
        let result;

        if (category === 'temperature') {
            result = convertTemp(val, from, to);
        } else {
            // Standard conversion formula
            const fromFactor = unitData[category][from];
            const toFactor = unitData[category][to];
            result = (val * fromFactor) / toFactor;
        }

        unitResult.textContent = `${val} ${from} = ${result.toFixed(4)} ${to}`;
    });

    // Special helper function for Temperature
    function convertTemp(val, from, to) {
        let celsius;
        if (from === 'celsius') celsius = val;
        else if (from === 'fahrenheit') celsius = (val - 32) * 5/9;
        else celsius = val - 273.15; // kelvin

        if (to === 'celsius') return celsius.toFixed(2);
        if (to === 'fahrenheit') return ((celsius * 9/5) + 32).toFixed(2);
        return (celsius + 273.15).toFixed(2); // kelvin
    }
      // --- ALGEBRA & GEOMETRY LOGIC ---

    // 1. Pythagorean Theorem (a^2 + b^2 = c^2)
    document.getElementById('pyth-btn').addEventListener('click', () => {
        const a = parseFloat(document.getElementById('pyth-a').value);
        const b = parseFloat(document.getElementById('pyth-b').value);
        const resultBox = document.getElementById('pyth-result');

        if (isNaN(a) || isNaN(b)) {
            resultBox.textContent = 'Please enter both Side A and Side B';
            return;
        }
        const c = Math.sqrt(a * a + b * b);
        resultBox.textContent = `Hypotenuse (C) = ${c.toFixed(4)}`;
    });

    // 2. Solve for X (ax + b = c  =>  x = (c - b) / a)
    document.getElementById('eq-btn').addEventListener('click', () => {
        const a = parseFloat(document.getElementById('eq-a').value);
        const b = parseFloat(document.getElementById('eq-b').value);
        const c = parseFloat(document.getElementById('eq-c').value);
        const resultBox = document.getElementById('eq-result');

        if (isNaN(a) || isNaN(b) || isNaN(c)) {
            resultBox.textContent = 'Please enter values for a, b, and c';
            return;
        }
        if (a === 0) {
            resultBox.textContent = '"a" cannot be zero';
            return;
        }
        const x = (c - b) / a;
        resultBox.textContent = `x = ${x.toFixed(4)}`;
    });

    // 3. Area of a Circle (π * r^2)
    document.getElementById('circle-btn').addEventListener('click', () => {
        const r = parseFloat(document.getElementById('circle-r').value);
        const resultBox = document.getElementById('circle-result');

        if (isNaN(r) || r < 0) {
            resultBox.textContent = 'Please enter a valid radius';
            return;
        }
        const area = Math.PI * r * r;
        resultBox.textContent = `Area = ${area.toFixed(4)}`;
    });

    // 4. Area of a Rectangle (width * height)
    document.getElementById('rect-btn').addEventListener('click', () => {
        const w = parseFloat(document.getElementById('rect-w').value);
        const h = parseFloat(document.getElementById('rect-h').value);
        const resultBox = document.getElementById('rect-result');

        if (isNaN(w) || isNaN(h) || w < 0 || h < 0) {
            resultBox.textContent = 'Please enter valid dimensions';
            return;
        }
        const area = w * h;
        resultBox.textContent = `Area = ${area.toFixed(4)}`;
    });
      // --- FINANCE & HEALTH LOGIC ---

    // 1. Monthly Loan Payment
    document.getElementById('loan-btn').addEventListener('click', () => {
        const amount = parseFloat(document.getElementById('loan-amount').value);
        const annualRate = parseFloat(document.getElementById('loan-rate').value);
        const months = parseFloat(document.getElementById('loan-months').value);
        const resultBox = document.getElementById('loan-result');

        if (isNaN(amount) || isNaN(annualRate) || isNaN(months) || months <= 0) {
            resultBox.textContent = 'Please fill in all fields correctly';
            return;
        }

        let monthlyPayment;
        
        if (annualRate === 0) {
            // Special case for 0% interest to avoid dividing by zero
            monthlyPayment = amount / months;
        } else {
            const r = annualRate / 100 / 12; // Monthly interest rate
            const n = months;
            // Standard loan payment formula
            monthlyPayment = amount * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
        }

        resultBox.textContent = `Monthly Payment: $${monthlyPayment.toFixed(2)}`;
    });

    // 2. BMI Calculator
    document.getElementById('bmi-btn').addEventListener('click', () => {
        const weightKg = parseFloat(document.getElementById('bmi-weight').value);
        const heightCm = parseFloat(document.getElementById('bmi-height').value);
        const resultBox = document.getElementById('bmi-result');

        if (isNaN(weightKg) || isNaN(heightCm) || weightKg <= 0 || heightCm <= 0) {
            resultBox.textContent = 'Please enter valid weight and height';
            return;
        }

        // Convert cm to meters
        const heightM = heightCm / 100;
        const bmi = weightKg / (heightM * heightM);
        
        // Determine category
        let category = '';
        if (bmi < 18.5) category = '(Underweight)';
        else if (bmi < 25) category = '(Normal weight)';
        else if (bmi < 30) category = '(Overweight)';
        else category = '(Obese)';

        resultBox.textContent = `BMI: ${bmi.toFixed(1)} ${category}`;
    });
      // --- DATE & TIME LOGIC ---

    // 1. Age Calculator
    document.getElementById('age-btn').addEventListener('click', () => {
        const dobStr = document.getElementById('age-dob').value;
        const resultBox = document.getElementById('age-result');

        if (!dobStr) {
            resultBox.textContent = 'Please select your Date of Birth';
            return;
        }

        const dob = new Date(dobStr);
        const today = new Date();
        
        let years = today.getFullYear() - dob.getFullYear();
        let months = today.getMonth() - dob.getMonth();
        
        // Adjust if the birthday hasn't happened yet this year
        if (months < 0 || (months === 0 && today.getDate() < dob.getDate())) {
            years--;
            months += 12;
        }

        resultBox.textContent = `You are ${years} years and ${months} months old`;
    });

    // 2. Days Between Dates
    document.getElementById('days-btn').addEventListener('click', () => {
        const startStr = document.getElementById('days-start').value;
        const endStr = document.getElementById('days-end').value;
        const resultBox = document.getElementById('days-result');

        if (!startStr || !endStr) {
            resultBox.textContent = 'Please select both Start and End dates';
            return;
        }

        const startDate = new Date(startStr);
        const endDate = new Date(endStr);
        
        // Calculate difference in milliseconds and convert to days
        const diffTime = Math.abs(endDate - startDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        resultBox.textContent = `There are ${diffDays} days between these dates`;
    });
      // --- BMR & CALORIE LOGIC ---

    // 1. BMR Calculator (Mifflin-St Jeor Equation)
    document.getElementById('bmr-btn').addEventListener('click', () => {
        const gender = document.getElementById('bmr-gender').value;
        const weight = parseFloat(document.getElementById('bmr-weight').value);
        const height = parseFloat(document.getElementById('bmr-height').value);
        const age = parseFloat(document.getElementById('bmr-age').value);
        const resultBox = document.getElementById('bmr-result');

        if (isNaN(weight) || isNaN(height) || isNaN(age)) {
            resultBox.textContent = 'Please fill in all fields';
            return;
        }

        let bmr;
        if (gender === 'male') {
            bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
        } else {
            bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161;
        }

        resultBox.textContent = `BMR: ${Math.round(bmr)} calories/day`;
    });

    // 2. Daily Calorie Needs (TDEE)
    document.getElementById('tdee-btn').addEventListener('click', () => {
        const gender = document.getElementById('bmr-gender').value;
        const weight = parseFloat(document.getElementById('bmr-weight').value);
        const height = parseFloat(document.getElementById('bmr-height').value);
        const age = parseFloat(document.getElementById('bmr-age').value);
        const activity = parseFloat(document.getElementById('tdee-activity').value);
        const resultBox = document.getElementById('tdee-result');

        if (isNaN(weight) || isNaN(height) || isNaN(age)) {
            resultBox.textContent = 'Please fill in Weight, Height, and Age above first';
            return;
        }

        // Calculate BMR first internally
        let bmr;
        if (gender === 'male') {
            bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
        } else {
            bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161;
        }

        // Multiply by activity level
        const tdee = bmr * activity;
        resultBox.textContent = `Daily Calories: ${Math.round(tdee)} kcal`;
    });
      // --- MORE GEOMETRY LOGIC ---

    // 5. Area of a Triangle (0.5 * base * height)
    document.getElementById('tri-btn').addEventListener('click', () => {
        const b = parseFloat(document.getElementById('tri-b').value);
        const h = parseFloat(document.getElementById('tri-h').value);
        const resultBox = document.getElementById('tri-result');

        if (isNaN(b) || isNaN(h) || b < 0 || h < 0) {
            resultBox.textContent = 'Please enter valid base and height';
            return;
        }
        const area = 0.5 * b * h;
        resultBox.textContent = `Area = ${area.toFixed(4)}`;
    });

    // 6. Volume of a Sphere (4/3 * π * r^3)
    document.getElementById('sphere-btn').addEventListener('click', () => {
        const r = parseFloat(document.getElementById('sphere-r').value);
        const resultBox = document.getElementById('sphere-result');

        if (isNaN(r) || r < 0) {
            resultBox.textContent = 'Please enter a valid radius';
            return;
        }
        const volume = (4/3) * Math.PI * Math.pow(r, 3);
        resultBox.textContent = `Volume = ${volume.toFixed(4)}`;
    });
      // --- COMPOUND INTEREST LOGIC ---
    document.getElementById('ci-btn').addEventListener('click', () => {
        const principal = parseFloat(document.getElementById('ci-principal').value);
        const rate = parseFloat(document.getElementById('ci-rate').value) / 100;
        const years = parseFloat(document.getElementById('ci-years').value);
        const frequency = parseFloat(document.getElementById('ci-frequency').value);
        const resultBox = document.getElementById('ci-result');

        if (isNaN(principal) || isNaN(rate) || isNaN(years) || principal <= 0) {
            resultBox.textContent = 'Please enter valid amounts';
            return;
        }

        // Compound Interest Formula: A = P(1 + r/n)^(nt)
        const total = principal * Math.pow((1 + rate / frequency), frequency * years);
        const interest = total - principal;

        resultBox.textContent = `Total: $${total.toFixed(2)} (Interest: $${interest.toFixed(2)})`;
    });
      // --- STANDARD CALCULATOR LOGIC ---
    const calcDisplay = document.getElementById('calc-display');
    const calcButtons = document.querySelectorAll('.calc-btn');

    calcButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const val = btn.getAttribute('data-val');

            if (val === 'C') {
                calcDisplay.value = '';
            } else if (val === 'DEL') {
                calcDisplay.value = calcDisplay.value.slice(0, -1);
            } else if (val === '=') {
                try {
                    // eval() runs the math string (e.g., "12+7*2")
                    calcDisplay.value = eval(calcDisplay.value);
                } catch (e) {
                    calcDisplay.value = 'Error';
                    setTimeout(() => { calcDisplay.value = ''; }, 1500);
                }
            } else {
                calcDisplay.value += val;
            }
        });
    });
      // --- TIP CALCULATOR LOGIC ---
    document.getElementById('tip-btn').addEventListener('click', () => {
        const bill = parseFloat(document.getElementById('tip-bill').value);
        const percent = parseFloat(document.getElementById('tip-percent').value);
        let people = parseFloat(document.getElementById('tip-people').value);
        const resultBox = document.getElementById('tip-result');

        if (isNaN(bill) || isNaN(percent)) {
            resultBox.textContent = 'Please enter bill and tip %';
            return;
        }

        // If people is empty or 0, default to 1
        if (isNaN(people) || people <= 0) {
            people = 1;
        }

        const tipAmount = bill * (percent / 100);
        const total = bill + tipAmount;
        const perPerson = total / people;

        if (people === 1) {
            resultBox.textContent = `Tip: $${tipAmount.toFixed(2)} | Total: $${total.toFixed(2)}`;
        } else {
            resultBox.textContent = `Per Person: $${perPerson.toFixed(2)} (Tip: $${(tipAmount/people).toFixed(2)})`;
        }
    });
});
