// Compatible with Drupal TB Mega Menu Versions:
// 3.0.0-alpha2

import * as mm_utils from "./_utils/farmers_mm_utils";
import * as mm_accessibility from "./_utils/accessibility/farmers_mm_accessibility";
import * as mm_mobile from "./farmers_mm_mobile.js";

export const megamenu = function () {
  if (document.querySelector(".tbm")) {
    console.log("loading megamenu...");

    mm_utils.simpleClickEvents();
    // mm_utils.scrollEvents();
    mm_utils.setupFirstLevelLinks();
    // mm_utils.setupSecondLevelLinks();
    // mm_utils.setupSideMenuLinks();
    // mm_utils.closeOnOutsideClick();
    // mm_accessibility.keyboardEventListeners();
    // mm_accessibility.ariaCheck();

    document.addEventListener("keydown", (event) => {
      mm_accessibility.handleKeyboard(event);
    });
  }
};

// initiate megamenus
megamenu();
mm_mobile.megamenu_mobile();
