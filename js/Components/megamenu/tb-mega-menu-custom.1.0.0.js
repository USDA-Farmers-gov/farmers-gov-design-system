// TB Mega Menu Version: 1.0.0-beta2-rc1

import * as mm_utils from "./_utils/farmers_mm_utils";
import * as mm_accessibility from "./_utils/accessibility/farmers_mm_accessibility";

export const megamenu = function () {
  if (document.querySelector(".tb-megamenu")) {
    console.log("loading megamenu...");

    mm_utils.simpleClickEvents();
    mm_utils.scrollEvents();
    mm_utils.setupFirstLevelLinks();
    mm_utils.setupSecondLevelLinks();
    mm_utils.setupSideMenuLinks();
    mm_utils.closeOnOutsideClick();
    mm_accessibility.keyboardEventListeners();
    mm_accessibility.ariaCheck();

    document.addEventListener("keydown", (event) => {
      mm_accessibility.handleKeyboard(event);
    });
  }
};

// initiate megamenu
megamenu();
