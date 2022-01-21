import * as checkboxes_and_radios from "./checkboxes_and_radios";
import * as forms_accessibility from "./forms_accessibility";

window.addEventListener("load", (event) => {
  checkboxes_and_radios.checkboxCards();
  checkboxes_and_radios.radioButtonCards();
  forms_accessibility.checkboxKeyboard();
  forms_accessibility.radioButtonKeyboard();
});
