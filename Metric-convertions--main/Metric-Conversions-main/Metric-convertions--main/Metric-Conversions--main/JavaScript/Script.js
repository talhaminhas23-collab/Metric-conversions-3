// ======================= Units Data =======================

// Start Units Data Section

const conversionData = {
    length: {
        base: 'meter',
        units: {
            millimeter: { factor: 1000, display: 'Millimeters' },
            meter: { factor: 1, display: 'Meters' },
            kilometer: { factor: 0.001, display: 'Kilometers' },
            inch: { factor: 39.3701, display: 'Inches' },
            foot: { factor: 3.28084, display: 'Feet' },
            yard: { factor: 1.09361, display: 'Yards' },
            mile: { factor: 0.000621371, display: 'Miles' }
        },
        pairs: [
            ['inch', 'millimeter'],
            ['foot', 'meter'],
            ['yard', 'meter'],
            ['mile', 'kilometer']
        ]
    },
    area: {
        base: 'squareMeter',
        units: {
            squareMillimeter: { factor: 1000000, display: 'Square Millimeters' },
            squareMeter: { factor: 1, display: 'Square Meters' },
            hectare: { factor: 0.0001, display: 'Hectares' },
            squareKilometer: { factor: 0.000001, display: 'Square Kilometers' },
            squareInch: { factor: 1550.003, display: 'Square Inches' },
            squareFoot: { factor: 10.7639, display: 'Square Feet' },
            squareYard: { factor: 1.19599, display: 'Square Yards' },
            acre: { factor: 0.000247105, display: 'Acres' },
            squareMile: { factor: 0.000000386102, display: 'Square Miles' }
        },
        pairs: [
            ['squareInch', 'squareMillimeter'],
            ['squareFoot', 'squareMeter'],
            ['squareYard', 'squareMeter'],
            ['acre', 'hectare'],
            ['squareMile', 'squareKilometer']
        ]
    },
    volume: {
        base: 'liter',
        units: {
            milliliter: { factor: 1000, display: 'Milliliters' },
            liter: { factor: 1, display: 'Liters' },
            fluidOunceUS: { factor: 33.814, display: 'Fluid Ounces (US)' },
            gallonUS: { factor: 0.264172, display: 'Gallons (US)' },
            cubicMeter: { factor: 0.001, display: 'Cubic Meters' },
            cubicFoot: { factor: 0.0353147, display: 'Cubic Feet' },
            cubicYard: { factor: 0.00130795, display: 'Cubic Yards' }
        },
        pairs: [
            ['fluidOunceUS', 'milliliter'],
            ['gallonUS', 'liter'],
            ['cubicFoot', 'cubicMeter'],
            ['cubicYard', 'cubicMeter']
        ]
    },
    mass: {
        base: 'kilogram',
        units: {
            gram: { factor: 1000, display: 'Grams' },
            kilogram: { factor: 1, display: 'Kilograms' },
            tonne: { factor: 0.001, display: 'Metric Tonnes' },
            ounce: { factor: 35.274, display: 'Ounces' },
            pound: { factor: 2.20462, display: 'Pounds' },
            shortTon: { factor: 0.00110231, display: 'Short Tons (2000 lb)' }
        },
        pairs: [
            ['ounce', 'gram'],
            ['pound', 'kilogram'],
            ['shortTon', 'tonne']
        ]
    }
};
// End Units Data Section

// ======================= Currency Data =======================

// Start Currency Data Section

const currencies = [
    { code: "AED", name: "United Arab Emirates Dirham" },
    { code: "AFN", name: "Afghan Afghani" },
    { code: "ALL", name: "Albanian Lek" },
    { code: "AMD", name: "Armenian Dram" },
    { code: "INR", name: "Indian Rupee" },
    { code: "USD", name: "United States Dollar" },
    { code: "PKR", name: "Pakistani Rupee" },
    { code: "EUR", name: "Euro" },
    { code: "GBP", name: "British Pound" },
    { code: "JPY", name: "Japanese Yen" }

    // Add remaining currencies here...
];
// End Currency Data Section

// ======================= Populate Function =======================

// Start Populate Function Section

function populate(category) {
    if (category === 'temperature') return; // handled separately

    if (category === 'currency') {
        const from = document.getElementById('currencyFrom');
        const to = document.getElementById('currencyTo');

        // Sort currencies by name A→Z

        currencies.sort((a, b) => a.name.localeCompare(b.name));

        currencies.forEach(curr => {
            const opt1 = document.createElement('option');
            opt1.value = curr.code;
            opt1.textContent = curr.name;
            from.appendChild(opt1);

            const opt2 = document.createElement('option');
            opt2.value = curr.code;
            opt2.textContent = curr.name;
            to.appendChild(opt2);
        });

        // Show only 5 items visible, scrollable

        from.size = 5;
        to.size = 5;

        from.value = 'USD';
        to.value = 'INR';
        return;
    }

    const data = conversionData[category];
    const from = document.getElementById(category + 'From');
    const to = document.getElementById(category + 'To');
    const table = document.getElementById(category + 'Table');

    Object.keys(data.units).forEach(key => {
        const display = data.units[key].display;
        const opt1 = document.createElement('option');
        opt1.value = key;
        opt1.textContent = display;
        from.appendChild(opt1);

        const opt2 = opt1.cloneNode(true);
        to.appendChild(opt2);
    });

    // Populate table with pairs

    data.pairs.forEach(pair => {
        const [fromUnit, toUnit] = pair;
        const factor = (data.units[toUnit].factor / data.units[fromUnit].factor).toFixed(6);
        const row = document.createElement('tr');
        row.innerHTML = `<td>${data.units[fromUnit].display}</td><td>${data.units[toUnit].display}</td><td>${factor}</td>`;
        table.appendChild(row);
    });
}
// End Populate Function Section

// ======================= Convert Function =======================

// Start Convert Function Section

function convert(category) {
    let value, from, to, resultDiv;

    if (category === 'temperature') {
        value = parseFloat(document.getElementById('tempValue').value);
        from = document.getElementById('tempFrom').value;
        to = document.getElementById('tempTo').value;
        resultDiv = document.getElementById('tempResult');
        let result;

        if (from === to) result = value;
        else if (from === 'fahrenheit' && to === 'celsius') result = (value - 32) * 5 / 9;
        else if (from === 'celsius' && to === 'fahrenheit') result = value * 9 / 5 + 32;

        resultDiv.textContent = `${value} °${from.charAt(0).toUpperCase()} = ${result.toFixed(4)} °${to.charAt(0).toUpperCase()}`;
        resultDiv.style.display = 'block';
        return;
    }

    if (category === 'currency') {
        convertCurrency();
        return;
    }

    value = parseFloat(document.getElementById(category + 'Value').value);
    from = document.getElementById(category + 'From').value;
    to = document.getElementById(category + 'To').value;
    resultDiv = document.getElementById(category + 'Result');

    if (isNaN(value)) {
        resultDiv.textContent = 'Invalid value';
        resultDiv.style.display = 'block';
        return;
    }

    const data = conversionData[category];
    const baseValue = value / data.units[from].factor;
    const result = baseValue * data.units[to].factor;
    resultDiv.textContent = `${value} ${data.units[from].display} = ${result.toFixed(4)} ${data.units[to].display}`;
    resultDiv.style.display = 'block';
}
// End Convert Function Section

// ======================= Clear Fields =======================

// Start Clear Fields Section

function clearFields(category) {
    if (category === 'temperature') {
        document.getElementById('tempValue').value = '';
        document.getElementById('tempResult').style.display = 'none';
    } else if (category === 'currency') {
        document.getElementById('currencyValue').value = '';
        document.getElementById('currencyResult').style.display = 'none';
    } else {
        document.getElementById(category + 'Value').value = '';
        document.getElementById(category + 'Result').style.display = 'none';
    }
}
// End Clear Fields Section

// ======================= Convert Currency =======================

// Start Convert Currency Section

// Currency list with full names (195+ countries)

const currencyList = {
    "USD": "United States Dollar", "EUR": "Euro", "GBP": "British Pound", "INR": "Indian Rupee",
    "JPY": "Japanese Yen", "AUD": "Australian Dollar", "CAD": "Canadian Dollar", "CHF": "Swiss Franc",
    "CNY": "Chinese Yuan", "PKR": "Pakistani Rupee", "SAR": "Saudi Riyal", "AED": "United Arab Emirates Dirham",
    "AFN": "Afghan Afghani", "ALL": "Albanian Lek", "AMD": "Armenian Dram", "ARS": "Argentine Peso",
    "AZN": "Azerbaijani Manat", "BDT": "Bangladeshi Taka", "BHD": "Bahraini Dinar", "BIF": "Burundian Franc",
    "BMD": "Bermudan Dollar", "BND": "Brunei Dollar", "BOB": "Bolivian Boliviano", "BRL": "Brazilian Real",
    "BSD": "Bahamian Dollar", "BWP": "Botswanan Pula", "BYN": "Belarusian Ruble", "BZD": "Belize Dollar",
    "CDF": "Congolese Franc", "CLP": "Chilean Peso", "COP": "Colombian Peso", "CRC": "Costa Rican Colón",
    "CUP": "Cuban Peso", "CVE": "Cape Verdean Escudo", "CZK": "Czech Koruna", "DJF": "Djiboutian Franc",
    "DKK": "Danish Krone", "DOP": "Dominican Peso", "DZD": "Algerian Dinar", "EGP": "Egyptian Pound",
    "ERN": "Eritrean Nakfa", "ETB": "Ethiopian Birr", "FJD": "Fijian Dollar", "GEL": "Georgian Lari",
    "GHS": "Ghanaian Cedi", "GMD": "Gambian Dalasi", "GNF": "Guinean Franc", "GTQ": "Guatemalan Quetzal",
    "GYD": "Guyanaese Dollar", "HKD": "Hong Kong Dollar", "HNL": "Honduran Lempira", "HRK": "Croatian Kuna",
    "HTG": "Haitian Gourde", "HUF": "Hungarian Forint", "IDR": "Indonesian Rupiah", "ILS": "Israeli New Shekel",
    "IQD": "Iraqi Dinar", "IRR": "Iranian Rial", "ISK": "Icelandic Króna", "JMD": "Jamaican Dollar",
    "JOD": "Jordanian Dinar", "KES": "Kenyan Shilling", "KGS": "Kyrgystani Som", "KHR": "Cambodian Riel",
    "KMF": "Comorian Franc", "KRW": "South Korean Won", "KWD": "Kuwaiti Dinar", "KYD": "Cayman Islands Dollar",
    "KZT": "Kazakhstani Tenge", "LAK": "Laotian Kip", "LBP": "Lebanese Pound", "LKR": "Sri Lankan Rupee",
    "LRD": "Liberian Dollar", "LSL": "Lesotho Loti", "LYD": "Libyan Dinar", "MAD": "Moroccan Dirham",
    "MDL": "Moldovan Leu", "MGA": "Malagasy Ariary", "MKD": "Macedonian Denar", "MMK": "Myanmar Kyat",
    "MNT": "Mongolian Tugrik", "MOP": "Macanese Pataca", "MRU": "Mauritanian Ouguiya", "MUR": "Mauritian Rupee",
    "MVR": "Maldivian Rufiyaa", "MWK": "Malawian Kwacha", "MXN": "Mexican Peso", "MYR": "Malaysian Ringgit",
    "MZN": "Mozambican Metical", "NAD": "Namibian Dollar", "NGN": "Nigerian Naira", "NIO": "Nicaraguan Córdoba",
    "NOK": "Norwegian Krone", "NPR": "Nepalese Rupee", "NZD": "New Zealand Dollar", "OMR": "Omani Rial",
    "PAB": "Panamanian Balboa", "PEN": "Peruvian Sol", "PGK": "Papua New Guinean Kina", "PHP": "Philippine Peso",
    "PLN": "Polish Zloty", "PYG": "Paraguayan Guarani", "QAR": "Qatari Rial", "RON": "Romanian Leu",
    "RSD": "Serbian Dinar", "RUB": "Russian Ruble", "RWF": "Rwandan Franc", "SDG": "Sudanese Pound",
    "SEK": "Swedish Krona", "SGD": "Singapore Dollar", "SLL": "Sierra Leonean Leone", "SOS": "Somali Shilling",
    "SRD": "Surinamese Dollar", "SYP": "Syrian Pound", "SZL": "Eswatini Lilangeni", "THB": "Thai Baht",
    "TJS": "Tajikistani Somoni", "TMT": "Turkmenistani Manat", "TND": "Tunisian Dinar", "TOP": "Tongan Pa'anga",
    "TRY": "Turkish Lira", "TTD": "Trinidad & Tobago Dollar", "TWD": "New Taiwan Dollar", "TZS": "Tanzanian Shilling",
    "UAH": "Ukrainian Hryvnia", "UGX": "Ugandan Shilling", "UYU": "Uruguayan Peso", "UZS": "Uzbekistan Som",
    "VES": "Venezuelan Bolívar", "VND": "Vietnamese Dong", "VUV": "Vanuatu Vatu", "WST": "Samoan Tala",
    "XAF": "Central African CFA Franc", "XOF": "West African CFA Franc", "YER": "Yemeni Rial",
    "ZAR": "South African Rand", "ZMW": "Zambian Kwacha", "ZWL": "Zimbabwean Dollar"
};

let rates = {};
let baseCurrency = 'USD';

const fromSelect = document.getElementById('fromCurrency');
const toSelect = document.getElementById('toCurrency');
const amountInput = document.getElementById('amount');
const resultDiv = document.getElementById('result');
const lastUpdateSpan = document.getElementById('lastUpdate');

// Populate dropdowns (A-Z sorted)
function populateCurrencies() {
    const sortedCodes = Object.keys(currencyList).sort();
    sortedCodes.forEach(code => {
        const name = currencyList[code];
        const option1 = new Option(`${code} - ${name}`, code);
        const option2 = new Option(`${code} - ${name}`, code);
        fromSelect.add(option1);
        toSelect.add(option2);
    });
    fromSelect.value = 'USD';
    toSelect.value = 'INR';
}

// Fetch latest rates
async function fetchRates() {
    try {
        resultDiv.textContent = "Fetching latest rates...";
        const response = await fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${baseCurrency.toLowerCase()}.min.json`);
        const data = await response.json();
        rates = data[baseCurrency.toLowerCase()];
        
        convert();
        lastUpdateSpan.textContent = new Date().toLocaleTimeString();
    } catch (error) {
        resultDiv.textContent = "Error: Unable to load rates. Check your internet.";
    }
}

// Convert
function convert() {
    const amount = parseFloat(amountInput.value) || 0;
    const from = fromSelect.value;
    const to = toSelect.value;

    if (rates && rates[to.toLowerCase()]) {
        const converted = amount * rates[to.toLowerCase()];
        resultDiv.innerHTML = `
            <strong style="color:#667eea">${amount.toLocaleString()}</strong> ${from} = 
            <strong style="color:#667eea">${converted.toFixed(4)}</strong> ${to}
        `;
    }
}

// Swap
function swapCurrencies() {
    const temp = fromSelect.value;
    fromSelect.value = toSelect.value;
    toSelect.value = temp;
    updateBaseAndConvert();
}

// Update base currency and fetch new rates if needed
async function updateBaseAndConvert() {
    if (fromSelect.value !== baseCurrency) {
        baseCurrency = fromSelect.value;
        await fetchRates();
    } else {
        convert();
    }
}

// Initialize
populateCurrencies();
fetchRates();

// Event listeners
amountInput.addEventListener('input', convert);
fromSelect.addEventListener('change', updateBaseAndConvert);
toSelect.addEventListener('change', convert);

// End Convert Currency Section

// ======================= FAQ Toggle =======================

// Start FAQ Toggle Section

document.querySelectorAll('.faq h3').forEach(h => {
    h.addEventListener('click', () => {
        const p = h.nextElementSibling;
        p.style.display = p.style.display === 'block' ? 'none' : 'block';
    });
});

// End FAQ Toggle Section

// ======================= Initialize =======================

// Start Initialize Section

window.onload = () => {
    Object.keys(conversionData).forEach(populate);
    populate('currency');
};

// End Initialize Section
