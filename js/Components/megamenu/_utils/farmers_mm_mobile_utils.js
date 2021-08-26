import * as general_utils from "../../../_utils/general_utils";
import * as mm_mobile_helpers from "./farmers_mm_mobile_helpers";

export function processMobileSections() {
  window.addEventListener("DOMContentLoaded", function () {
    const firstLevelMenus = document.querySelectorAll(
      ".tb-megamenu-item.level-1"
    );
    const linksContainer = document.querySelector(".mm-links-container");

    firstLevelMenus.forEach(function (firstLevel) {
      let categoryName = firstLevel
        .querySelector(".mm-nav-link div")
        .firstChild.nodeValue.trim();
      if (categoryName.toLowerCase() === "home") return;

      mm_mobile_helpers.setupFirstLevelTab(
        firstLevel,
        categoryName,
        linksContainer
      );

      const sideMenu = firstLevel.querySelectorAll(".tb-megamenu-item.level-2");
      const submenus = sideMenu.length
        ? sideMenu
        : firstLevel.querySelectorAll(".mm-card-grid .subcategory.row");

      // setup mobile link depending on what type of section it is (categories vs. none)
      if (submenus.length) {
        mm_mobile_helpers.setupMobileGridLinks(
          firstLevel,
          submenus,
          linksContainer
        );

        mm_mobile_helpers.setupFeaturedLinksContainer(
          firstLevel,
          linksContainer
        );

        mm_mobile_helpers.setupLandingPageLink(firstLevel, linksContainer);
      }
      if (!submenus.length)
        mm_mobile_helpers.setupLandingPageLinkNoSubmenu(
          firstLevel,
          categoryName
        );
    });
  });
}

export function backToTopShowHide() {
  window.addEventListener("load", function () {
    const backToTop = document.querySelector(".back-to-top.mm-back-to-top");
    const navContainer = document.querySelector("#mm-mobile .nav-container");

    if (navContainer) {
      navContainer.addEventListener("scroll", function (element) {
        let position = document
          .querySelector(
            "#mm-mobile .mm-links-container .mm-mobile-nav-category"
          )
          .getBoundingClientRect().y;

        const closeButtonHeight = document
          .querySelector(".mm-mobile-menu-close")
          .getBoundingClientRect().height;

        let calcluatedPosition = position - closeButtonHeight;

        if (calcluatedPosition <= 0) showBackToTop(true);
        if (calcluatedPosition > 0) showBackToTop(false);
      });
    }
  });
}

export function showBackToTop(show) {
  const backToTop = document.querySelector(".back-to-top.mm-back-to-top");
  const displayStyle = show ? "block" : "none";
  backToTop.style.display = displayStyle;
}

export function toggleMobileMegaMenu(action) {
  const openClass = "animation-slide-in";
  const closeClass = "animation-slide-out";

  if (action === "open") {
    document.querySelector(".nav-container").classList.remove(closeClass);
    document.querySelector(".nav-container").classList.add(openClass);
  }
  if (action === "close") {
    document.querySelector(".nav-container").classList.remove(openClass);
    document.querySelector(".nav-container").classList.add(closeClass);
    document.querySelector(".back-to-top.mm-back-to-top").style.display =
      "none";
  }
}
