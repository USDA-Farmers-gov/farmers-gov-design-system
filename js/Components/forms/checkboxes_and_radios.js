import * as form_utils from "./_form-utils";

export function checkboxCards() {
  setCardEvents("checkbox-card");
}

export function radioButtonCards() {
  setCardEvents("radio-button-card");
}

function setCardEvents(cardClass) {
  const cardInputs = document.querySelectorAll(`.${cardClass} input`);
  if (!!cardInputs) {
    cardInputs.forEach((input) => {
      const card = input.closest(`.${cardClass}`);
      input.addEventListener("click", (_) => {
        if (!!card) {
          if (!!input.checked) card.classList.add("checked");
          if (!input.checked) card.classList.remove("checked");
        }
        form_utils.removeActiveFromUnchecked(cardClass);
      });
    });
  }
}
