import * as mm_utils from "../farmers_mm_utils.js";
import * as mm_accessibility_keyboard from "./farmers_mm_accessibility_keyboard.js";

export function handleKeyboard(event) {
  if (event.keyCode == 27) mm_accessibility_keyboard.escapeKey(event);
  if (event.keyCode == 36 || event.keyCode == 35)
    mm_accessibility_keyboard.homeEnd(event);
  if (event.keyCode == 39) mm_accessibility_keyboard.topLevelArrows("right");
  if (event.keyCode == 37) mm_accessibility_keyboard.topLevelArrows("left");
  if (event.keyCode == 38)
    mm_accessibility_keyboard.secondLevelArrows(event, "up");
  if (event.keyCode == 40)
    mm_accessibility_keyboard.secondLevelArrows(event, "down");

  document.querySelectorAll(".tb-megamenu .level-2").forEach((link) => {
    link.addEventListener("keyup", (event) => {
      event.stopImmediatePropagation();
      event.preventDefault();

      if (event.keyCode === 13) {
        if (event.target.classList.contains("page-link")) return;
        mm_utils.processLinkStyles(
          link,
          ".tb-megamenu-item.level-2.dropdown-submenu.open"
        );
        ariaCheck();
      }
    });
  });
}

export function keyboardEventListeners() {
  document.body.addEventListener("keyup", (event) => {
    if (
      event.key.toLowerCase() === "tab" &&
      !document.querySelector(".primary-nav-wrap :focus")
    )
      mm_utils.closeAllMenus(event);
  });
}

export function ariaCheck() {
  document.querySelectorAll("li.tb-megamenu-item").forEach((element) => {
    const link = element.querySelector("a.dropdown-toggle");
    if (link) {
      let ariaExpanded = false;
      if (element.classList.contains("open")) ariaExpanded = true;
      link.setAttribute("aria-expanded", ariaExpanded);
    }
  });
}
