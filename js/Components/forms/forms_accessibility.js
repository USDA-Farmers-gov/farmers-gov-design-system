import * as form_utils from "./_form-utils";

export function checkboxKeyboard() {
  toggleChecked("checkbox-input");
}

export function radioButtonKeyboard() {
  toggleChecked("radio-button-input");
}

function toggleChecked(inputClass) {
  const inputs = document.querySelectorAll(`.${inputClass}`);
  if (!!inputs) {
    inputs.forEach((input) => {
      input.addEventListener("keydown", (event) => {
        if (event.code.toLowerCase() === "enter")
          input.checked = !input.checked;
      });
    });
  }
}
