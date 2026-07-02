import { validateFields } from "./load.js";

validateFields();

const billField = document.getElementById("input-bill");
const peopleField = document.getElementById("input-people");
const buttons = document.querySelectorAll(".btn-default, .btn-tip");
const customField = document.getElementById("custom-tip");
const tipAmountPerson = document.getElementById("tip-amount-person");
const totalPerson = document.getElementById("total-person");
const errorLabel = document.getElementById("personError");
const btnReset = document.getElementById("btn-reset");

let percentTip = 0;

function tipCalculator() {
  const subtotal = parseFloat(billField.value) || 0;
  const persons = parseFloat(peopleField.value);
  const tipBill = subtotal * (percentTip / 100);
  const tip = tipBill / persons;
  tipAmountPerson.textContent = tip.toFixed(2);
  const total = (tipBill + subtotal) / persons;
  totalPerson.textContent = total.toFixed(2);
}

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    // desactiva todos los botons
    buttons.forEach((b) => b.setAttribute("aria-pressed", "false"));
    customField.value = "";
    // activa solo el botón donde se hace click
    btn.setAttribute("aria-pressed", "true");
    customField.value = "";
    percentTip = parseFloat(btn.dataset.percent);

    if (peopleField.value.trim() === "") {
      errorLabel.hidden = false;
      return;
    }
    tipCalculator();
  });
});

billField.addEventListener("input", () => {
  if (peopleField.value.trim() === "") return;
  tipCalculator();
});

// cuando se ingresa el porcentaje personalizado
customField.addEventListener("input", () => {
  buttons.forEach((b) => b.setAttribute("aria-pressed", "false"));
  percentTip = parseFloat(customField.value) || 0;
  if (peopleField.value.trim() === "") {
    errorLabel.hidden = false;
    return;
  }
  tipCalculator();
});

// para continuar con la operación una vez ingresado el valor en el total de personas
peopleField.addEventListener("input", () => {
  if (peopleField.value.trim() === "") return;

  errorLabel.hidden = true;

  if (percentTip > 0) {
    tipCalculator();
  }
});

customField.addEventListener("input", () => {
  buttons.forEach((b) => b.setAttribute("aria-pressed", "false"));
});

btnReset.addEventListener("click", () => {
  billField.value = "";
  peopleField.value = "";
  tipAmountPerson.textContent = "0.00";
  totalPerson.textContent = "0.00";
  customField.value = "";
  percentTip = 0;
  buttons.forEach((b) => b.setAttribute("aria-pressed", "false"));
  billField.focus();
});
