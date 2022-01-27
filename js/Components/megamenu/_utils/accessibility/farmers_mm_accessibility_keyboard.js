// this file to be used for specific key events
// anything else for accessiblity should go in farmers_mm_accessibility.js

import * as mm_utils from "../farmers_mm_utils";
import * as general_utils from "../../../../_utils/_general_utils";

const plainLinkHoverClass = "sidemenu-hover-plain";
const topLevelLinks = document.querySelectorAll(
  ".tb-megamenu-item.level-1 > a"
);

const firstLevel = document.querySelectorAll(
  ".tb-megamenu .tb-megamenu-item.level-1"
);
const firstLevelArray = general_utils.convertNodeListToArray(firstLevel);

export function escapeKey(event) {
  mm_utils.closeAllMenus(event);
}

export function homeEnd(event) {
  event.preventDefault();

  const firstLevelSelector =
    event.keyCode === 36
      ? ".tb-megamenu-item.level-1"
      : ".tb-megamenu-item.level-1:last-child";

  const level2Selector =
    event.keyCode === 36
      ? ".tb-megamenu-nav .tb-megamenu-item.level-1.open .level-2:first-of-type"
      : ".tb-megamenu-nav .tb-megamenu-item.level-1.open .level-2:last-child";

  const openLevel2Item = document.querySelector(
    ".tb-megamenu .tb-megamenu-item.level-2.open"
  );

  if (
    document.querySelector(`.tb-megamenu ${firstLevelSelector}`) &&
    !openLevel2Item
  ) {
    mm_utils.removeHoverFromLevel2Links(true);
    let linkIndex = event.keyCode === 36 ? 0 : topLevelLinks.length - 1;
    topLevelLinks[linkIndex].focus();
  }

  if (openLevel2Item) {
    mm_utils.removeHoverFromLevel2Links();
    const link = document.querySelector(`${level2Selector} a`);

    if (link) {
      if (!link.classList.contains("sidemenu-hover"))
        link.classList.add(plainLinkHoverClass);
      link.focus();
    }
  }
}

export function topLevelArrows(direction) {
  const focusedLink = document.querySelector(".tb-megamenu .level-1 a:focus");
  const linkTitle = focusedLink.querySelector(".mm-top-level-title");

  if (focusedLink) {
    const linkTitle = focusedLink.querySelector(".mm-top-level-title");
    if (linkTitle) {
      const index = firstLevelArray.indexOf(
        document.querySelector(`li[data-label="${linkTitle.textContent}"]`)
      );
      const newIndex = direction === "right" ? index + 1 : index - 1;

      if (firstLevelArray[newIndex]) {
        document.querySelector(".tb-megamenu .level-1 a:focus").blur();
        firstLevelArray[newIndex].querySelector("a").focus();
      }
    }
  }
}

export function secondLevelArrows(event, direction) {
  event.preventDefault();
  const linkArray = general_utils.convertNodeListToArray(
    document.querySelectorAll(".tb-megamenu .level-1.open li.level-2")
  );
  const focusedLink = document.querySelector(
    ".tb-megamenu .level-1.open li.level-2 a:focus"
  );

  const currentLink = focusedLink
    ? focusedLink
    : document.querySelector(
        ".tb-megamenu .level-1.open li.level-2 a.sidemenu-hover"
      );

  const secondLevelElement = currentLink
    ? document.querySelector(
        `.tb-megamenu .level-1.open li.level-2[data-label="${currentLink.getAttribute(
          "data-category"
        )}"]`
      )
    : null;

  if (secondLevelElement) {
    const index = linkArray.indexOf(secondLevelElement);
    const newIndex = direction === "down" ? index + 1 : index - 1;

    if (linkArray[newIndex]) {
      const oldLink = linkArray[index].querySelector("a");
      const newLink = linkArray[newIndex].querySelector("a");

      oldLink.classList.remove(plainLinkHoverClass);
      newLink.classList.add(plainLinkHoverClass);
      oldLink.blur();
      newLink.focus();
    }
  }
}
