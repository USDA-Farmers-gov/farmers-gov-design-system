export function removeActiveFromUnchecked(cardClass) {
  const cardInputs = document.querySelectorAll(`.${cardClass} input`);
  cardInputs.forEach((input) => {
    const card = input.closest(`.${cardClass}`);
    if (!!card && !input.checked) card.classList.remove("checked");
  });
}
