const billInput = document.getElementById("bill");
const numberOfPeopleInput = document.getElementById("people");
const tipResult = document.getElementById("tip");
const totalResult = document.getElementById("total");
const tipButtons = document.querySelectorAll(".btn-tip");
const btnReset = document.querySelector(".reset");
const customInput = document.querySelector(".custom");
let percentOfTips;

// console.log(numberOfPeopleInput);

function calculateBill() {
    let bill = +billInput.value;
    let people = +numberOfPeopleInput.value;

    let amountPerPerson = bill / people;
    let tips = (bill * percentOfTips) / people;
    let totalBill = amountPerPerson + tips;
    // console.log(people);
    // console.log(percentOfTips);

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
    // console.log(percentOfTips);
    calculateBill();
}

function error() {
    let people = +numberOfPeopleInput.value;
    // console.log(`${people} + error`);
    if (people <= 0) {
        console.log(`${people} + if`);
        if (
            document
                .querySelector(".people__error")
                .classList.contains("hide") &&
            !numberOfPeopleInput.classList.contains("error")
        ) {
            document.querySelector(".people__error").classList.remove("hide");
            numberOfPeopleInput.classList.add("error");
            console.log("Ok");
        }
    } else {
        console.log(`${people} + else`);
        document.querySelector(".people__error").classList.add("hide");
        numberOfPeopleInput.classList.remove("error");
    }
}

function reset() {
    console.log(billInput.value);
    billInput.value = "";
    numberOfPeopleInput.value = "";
    customInput.value = "";
    totalResult.innerHTML = "$0.00";
    tipResult.innerHTML = "$0.00";
    // addActive();
}

function addActive(e) {
    console.log(e.target);
    // e.target.classList.add("btn-active");
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