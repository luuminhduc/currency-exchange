import './styles/main.scss';
import {coreUri} from './jsModule/coreUri.js';
import {exchangeUri} from './jsModule/exchangeUri';
import {getAllCurrency} from './jsModule/getAllCurrency.js';
import {displayCurrency} from './jsModule/displayCurrency.js';
const selects = document.querySelectorAll('select');
let selectFrom = document.querySelector('.from-select');
let selectTo = document.querySelector('.to-select');
const inputFrom = document.querySelector('.from-input');
const inputTo = document.querySelector('.to-input');
const resultEl = document.querySelector('.result');
const switchBtn = document.querySelector('.switch');

let currencyList;
let selectFromValue = 'USD';
let selectToValue = 'EUR';

console.log("value: "+selectFrom.value);

getAllCurrency(coreUri).then(data => {
    currencyList = Object.keys(data);
    console.log(currencyList);
    displayCurrency(currencyList, selects);
});

selects.forEach(el => {
    el.addEventListener('change', (e) => {
        calculate();
    })
})

inputFrom.addEventListener('input', (e) => {
    console.log(inputFrom.value);
    calculate();
})

switchBtn.addEventListener('click', (e) => {
    checkValue();
    const temp = selectFrom.value;
    selectFrom.value = selectToValue;
    selectTo.value = temp;
    calculate();
})

async function calculate() {
    checkValue();
    const res = await fetch(`${exchangeUri}/${selectFromValue}`);
    const data = await res.json();
    const rates = data.rates;
    resultEl.innerText = `1 ${selectFromValue} = ${rates[selectToValue]} ${selectToValue}`;
    inputTo.value = `${inputFrom.value * rates[selectToValue]}`;
    
}

function checkValue() {
    if(selectFrom.value !== '') {
        selectFromValue = selectFrom.value;
    }else{
        selectFromValue = 'USD';
    }
    if(selectTo.value !== '') {
        selectToValue = selectTo.value;
    }else{
        selectToValue = 'EUR';
    }
}

calculate();