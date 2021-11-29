const billInput = document.getElementById("bill");
const numberOfPeopleInput = document.getElementById("people");
const tipResult = document.getElementById("tip");
const totalResult = document.getElementById("total");
const tipButtons = document.querySelectorAll(".btn-tip");
const btnReset = document.querySelector(".reset");
const customInput = document.querySelector(".custom");
const checkError = document.querySelector(".people__error");
let percentOfTips;

function calculateBill() {
    let bill = +billInput.value;
    let people = +numberOfPeopleInput.value;

    let amountPerPerson = bill / people;
    let tips = (bill * percentOfTips) / people;
    let totalBill = amountPerPerson + tips;

    if (percentOfTips === undefined && people > 0) {
        totalResult.innerHTML = "$" + amountPerPerson.toFixed(2);
        tipResult.innerHTML = "$0.00";
    } else if (people > 0 && bill > 0 && tips > 0) {
        totalResult.innerHTML = "$" + totalBill.toFixed(2);
        tipResult.innerHTML = "$" + tips.toFixed(2);
    } else {
        totalResult.innerHTML = "$0.00";
        tipResult.innerHTML = "$0.00";
    }
}

function tipPercentage(e) {
    e.preventDefault();
    percentOfTips = e.target.value;
    percentOfTips = percentOfTips / 100;
    calculateBill();
}

function error() {
    let people = +numberOfPeopleInput.value;
    if (people <= 0) {
        if (
            checkError.classList.contains("hide") &&
            !numberOfPeopleInput.classList.contains("error")
        ) {
            checkError.classList.remove("hide");
            numberOfPeopleInput.classList.add("error");
        }
    } else {
        checkError.classList.add("hide");
        numberOfPeopleInput.classList.remove("error");
    }
}

function reset() {
    percentOfTips = undefined;
    billInput.value = "";
    numberOfPeopleInput.value = "";
    customInput.value = "";
    totalResult.innerHTML = "$0.00";
    tipResult.innerHTML = "$0.00";
    for (let i = 0; i < tipButtons.length; i++) {
        tipButtons[i].classList.remove("btn-active");
    }
}

function addActive(e) {
    for (let i = 0; i < tipButtons.length; i++) {
        if (tipButtons[i] == e.target) {
            e.target.classList.toggle("btn-active");
        } else {
            tipButtons[i].classList.remove("btn-active");
        }
    }
}

for (let i = 0; i < tipButtons.length; i++) {
    tipButtons[i].addEventListener("click", tipPercentage);
    tipButtons[i].addEventListener("input", tipPercentage);
    tipButtons[i].addEventListener("click", addActive);
}

btnReset.addEventListener("click", reset);
numberOfPeopleInput.addEventListener("input", calculateBill);
numberOfPeopleInput.addEventListener("input", error);
billInput.addEventListener("input", calculateBill);
