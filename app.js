const fromSelect = document.querySelector("select[name ='from']");
const toSelect = document.querySelector("select[name='to']");

const selects = document.querySelectorAll("select");

const flags = document.querySelectorAll(".flag");

const fromFlag = document.querySelector('.fromFlag');
const toFlag = document.querySelector('.toFlag');


const button = document.querySelector('#btn');

const input = document.querySelector('#inputBox');

const fromAmount = document.querySelector('#fromAmount');
const toAmount = document.querySelector('#toAmount');

const fromCountry = document.querySelector('#fromCountry');
const toCountry = document.querySelector('#toCountry')

const Iniurl = 'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/';

let fromCurrency = '';
let toCurrency = '';

window.addEventListener("DOMContentLoaded", () => {
  fromFlag.src = `https://flagsapi.com/${fromSelect.value}/flat/64.png`;
  fromCurrency = fromSelect.options[fromSelect.selectedIndex].innerText;

  toFlag.src = `https://flagsapi.com/${toSelect.value}/flat/64.png`;
  toCurrency = toSelect.options[toSelect.selectedIndex].innerText;
});

selects.forEach((select) => {
  for(let country in countryList) {
    let option = document.createElement("option");
    option.innerText = country;
    option.value = countryList[country];
    select.appendChild(option);
  }

  fromSelect.addEventListener("change", () => {
    fromFlag.src = `https://flagsapi.com/${fromSelect.value}/flat/64.png`;
    fromCurrency = fromSelect.options[fromSelect.selectedIndex].innerText;
  });

  toSelect.addEventListener("change", () => {
    toFlag.src = `https://flagsapi.com/${toSelect.value}/flat/64.png`;
    toCurrency = toSelect.options[toSelect.selectedIndex].innerText;
  });
});


const claculate = async () => {
  let inputValue = input.value;
  fromAmount.innerText = inputValue;

  fromCountry.innerText = fromCurrency;
  toCountry.innerText = toCurrency;

  let URL = `${Iniurl}${fromCurrency.toLowerCase()}.min.json`;

  let response = await fetch(URL);
  let data = await response.json();

  const from = data[fromCurrency.toLowerCase()]
  const to = from[toCurrency.toLowerCase()]

  let toRounded = Math.round((to*inputValue)*100)/100;
  toAmount.innerText = toRounded;

}

button.addEventListener("click", (evt) => {
  evt.preventDefault();
  if(input.value == '') {
    alert("Please Enter an Amount")
  } else {
    claculate();
  }
});
