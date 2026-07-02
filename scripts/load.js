const btnReset = document.getElementById("btn-reset");
const inputs = document.querySelectorAll("#input-bill, #input-people");
const labels = document.querySelectorAll("#tip-amount-person, #total-person");

export const validateFields = () => {
  const isEmptyField = [...inputs].some((input) => input.value.trim() === "");
  btnReset.disabled = isEmptyField;
};

inputs.forEach((input) => input.addEventListener("input", validateFields));
