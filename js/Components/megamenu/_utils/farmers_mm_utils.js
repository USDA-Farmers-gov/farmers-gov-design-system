import * as mm_accessibility from "./accessibility/farmers_mm_accessibility";

export function closeOnOutsideClick() {
  document.addEventListener("click", (event) => {
    const isClickInside = document
      .querySelector(".tb-megamenu")
      .contains(event.target)
      ? true
      : false;

    if (!isClickInside) {
      closeAllMenus();
      mm_accessibility.ariaCheck();
    }
  });
}

export function simpleClickEvents() {
  const subMenuLinks = document.querySelectorAll(
    ".tbm-item.level-1.tbm-item--has-dropdown",
  );
  subMenuLinks.forEach(function (section) {
    const link = section.querySelector("a");
    if (!!link) {
      section.querySelector("a").addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();

        const sideMenuFirstLink = section.querySelector(
          ".level-2.tbm-toggle:first-child",
        );
        const button = section.querySelector("button");

        if (!!button) button.click();
        if (!!sideMenuFirstLink) sideMenuFirstLink.click();
      });
    }
  });
}

// export function scrollEvents() {
//   document.addEventListener("scroll", (event) => {
//     const openMenu = document.querySelector(".level-1.open");
//     if (openMenu) {
//       const openSubMenu = openMenu.querySelector(".mm-card-grid");
//       const openMenuCoords = openSubMenu
//         ? openSubMenu.getBoundingClientRect()
//         : null;

//       if (
//         !!openMenuCoords &&
//         openMenuCoords.y * -1 - openMenuCoords.height >= 300
//       ) {
//         toggleContentOverlay(openMenu.querySelector("a.dropdown-toggle"));
//         openMenu.classList.remove("open");
//         mm_accessibility.ariaCheck();
//       }
//     }
//   });
// }

export function setupFirstLevelLinks() {
  const firstLevelSelector = ".tbm-item.level-1";
  const firstLevelOpenSelector = `${firstLevelSelector}.open`;
  const firstLevel = document.querySelectorAll(firstLevelSelector);
  const languages = require("../../../constants").languages;
  const langHomePages = languages.map((row) =>
    row.lang === "en" ? "/" : `/${row.lang}`,
  );

  firstLevel.forEach((item) => {
    setPanelMinHeight(item);
    // processSubmenuBanner(item);
    const link = item.querySelector("a");
    const activeLinkClass = "mm-active";

    if (
      langHomePages.includes(link.getAttribute("data-label")) &&
      langHomePages.includes(window.location.pathname)
    )
      link.classList.add(activeLinkClass);

    // if (!langHomePages.includes(link.getAttribute("data-label"))) {
    //   const dataLabelLength = link.getAttribute("data-label").length;
    //   const anchorLink = window.location.pathname.substring(0, dataLabelLength);

    //   if (anchorLink === link.getAttribute("data-label"))
    //     link.classList.add(activeLinkClass);

    //   if (!link.classList.contains("page-link")) {
    //     if (!item.querySelector(".sidemenu")) item.classList.add("no-sidemenu");

    //     link.addEventListener("click", (event) => {
    //       if (item.classList.contains("open")) {
    //         item.classList.remove("open");
    //         mm_accessibility.ariaCheck();
    //       } else if (!item.classList.contains("open")) {
    //         processLinkStyles(item, firstLevelOpenSelector);
    //         processLinkStyles(item, `${firstLevelOpenSelector} .level-2`);

    //         const firstSidemenuLink = item.querySelector(
    //           ".sidemenu li:first-child",
    //         );
    //         if (item.classList.contains("open") && firstSidemenuLink) {
    //           firstSidemenuLink.classList.add("open");
    //           firstSidemenuLink
    //             .querySelector("a")
    //             .classList.add("sidemenu-hover");
    //           setSubMenuDimensions();
    //         }
    //         if (item.classList.contains("no-sidemenu")) setSubMenuDimensions();
    //         mm_accessibility.ariaCheck();
    //         item.querySelector("a").focus();
    //       }
    //       toggleContentOverlay(item);
    //     });
    //   }
    // }
  });
}

// export function setupSecondLevelLinks() {
//   const secondLevelSelector = ".tb-megamenu-item.level-2.dropdown-submenu";
//   const secondLevelOpenSelector = `${secondLevelSelector}.open`;
//   const secondLevelLinks = document.querySelectorAll(secondLevelSelector);

//   secondLevelLinks.forEach((item) => {
//     item
//       .querySelector(".dropdown-toggle")
//       .addEventListener("click", (event) => {
//         event.preventDefault();
//         event.stopPropagation();
//         const link = item.querySelector("a");
//         if (link.classList.contains("page-link")) {
//           event.stopImmediatePropagation();
//           window.location = this.querySelector("a").href;
//         }
//         processLinkStyles(item, secondLevelOpenSelector);
//         link.classList.add("sidemenu-hover");
//         mm_accessibility.ariaCheck();
//       });
//   });
// }

// export function setupSideMenuLinks() {
//   const sideMenus = document.querySelectorAll(
//     ".tb-megamenu .level-2 a.dropdown-toggle"
//   );

//   sideMenus.forEach((sidemenu) => {
//     sidemenu.addEventListener("mouseover", (event) => {
//       removeHoverFromLevel2Links();
//     });
//   });
//   mm_accessibility.ariaCheck();
// }

// export function toggleContentOverlay(element) {
//   const overlay = document.querySelector(".usa-overlay");

//   const docHeight =
//     document.querySelector("html").getBoundingClientRect().height -
//     document.querySelector("header").getBoundingClientRect().height;

//   document.querySelector(".usa-overlay").style.height = `${docHeight}px`;

//   overlay.style.display = element.classList.contains("open") ? "block" : "none";
//   mm_accessibility.ariaCheck();
//   blurNonOpenFirstLevelLink();
// }

// export function processSubmenuBanner(item) {
//   const linkText = item.querySelector("a").text.trim();
//   const landingPageBanner = document.querySelector(
//     `.mm-landing-page-banner[data-label='${linkText}']`
//   )
//     ? document
//         .querySelector(`.mm-landing-page-banner[data-label='${linkText}']`)
//         .cloneNode(true)
//     : "";

//   if (landingPageBanner) {
//     const submenuLevel1 = item.querySelector(".tb-megamenu-submenu");
//     if (submenuLevel1) {
//       submenuLevel1.prepend(landingPageBanner);
//       landingPageBanner.classList.add("show-mm-landing-page-banner");
//     }
//   }
// }

// export function removeHoverFromLevel2Links(all) {
//   const sideMenuLinks = document.querySelectorAll(
//     ".tb-megamenu-item.level-1 .sidemenu li"
//   );
//   sideMenuLinks.forEach((element) => {
//     const link = element.querySelector("a.dropdown-toggle");
//     if (link) {
//       link.classList.remove("sidemenu-hover-plain");
//       link.blur();
//     }
//     if (all && link) {
//       element.classList.remove("open");
//       link.classList.remove("sidemenu-hover");
//       link.setAttribute("aria-expanded", "false");
//     }
//   });
// }

// export function setSubMenuDimensions() {
//   const primaryNavCoords = document
//     .querySelector(".primary-nav-wrap > .container")
//     .getBoundingClientRect();
//   const level1Links = document.querySelectorAll("li.tb-megamenu-item.level-1");

//   level1Links.forEach(function (element) {
//     const submenu = element.querySelector(".tb-megamenu-submenu");

//     if (submenu) {
//       submenu.style.left = "initial";
//       const subMenuCoords = element.getBoundingClientRect();
//       let offset = subMenuCoords.x - primaryNavCoords.x + 20;

//       submenu.style.left = `-${offset}px`;
//     }
//   });
// }

export function setPanelMinHeight(item, submenu) {
  const targetNode = item;
  const config = { attributes: true, childList: true };
  const callback = function (mutationsList, observer) {
    if (item.classList.contains("open")) {
      const sideMenu = item.querySelector(
        ".tbm-submenu.tbm-item-child.nav-submenu",
      );

      if (!!sideMenu) {
        const height = item
          .querySelector(
            "li.tbm-item.level-2.tbm-item--has-flyout.open > div.tbm-submenu.tbm-item-child.nav-submenu",
          )
          .getBoundingClientRect().height;

        sideMenu.style.minHeight = `${height}px`;
      }
      // console.log(sideMenuHeight);
      // console.log(
      //   "column",
      //   item.querySelector(".tbm-column").getBoundingClientRect().height,
      // );

      // const rows = item.querySelectorAll(
      //   ".tb-megamenu-item.level-2 .mega-dropdown-inner .tb-megamenu-column.mega-col-nav.row",
      // );

      // rows.forEach((row) => {
      //   row.style.minHeight = `${sideMenuHeight}px`;
      // });

      // item.querySelector(
      //   ".tb-megamenu-submenu.dropdown-menu.nav-child",
      // ).style.visibility = "visible";
    }
  };

  const observer = new MutationObserver(callback);
  observer.observe(targetNode, config);
}

// export function isSafari() {
//   let safari = false;
//   if (
//     navigator.userAgent.indexOf("Safari") != -1 &&
//     navigator.userAgent.indexOf("Chrome") == -1
//   ) {
//     safari = true;
//   }
//   return safari;
// }

// export function processLinkStyles(link, selector) {
//   if (selector.indexOf("level-2") !== -1) {
//     const sideMenuElements = document.querySelectorAll(
//       ".tb-megamenu .level-1.open li.level-2"
//     );

//     sideMenuElements.forEach((element) => {
//       element.querySelector("a").classList.remove("sidemenu-hover");
//       element.querySelector("a").classList.remove("sidemenu-hover-plain");
//     });

//     if (!link.classList.contains("open")) toggleMenuLink(link, true);
//   } else {
//     link.classList.contains("open")
//       ? toggleMenuLink(link, false)
//       : toggleMenuLink(link, true);
//   }

//   const activeLinks = document.querySelectorAll(selector);

//   activeLinks.forEach((activeLink) => {
//     if (activeLink !== link) toggleMenuLink(activeLink, false);
//   });
// }

// export function toggleMenuLink(element, add) {
//   if (add) element.classList.add("open");
//   if (!add) element.classList.remove("open");
//   if (element.classList.contains("level-2")) {
//     if (add) element.querySelector("a").classList.add("sidemenu-hover");
//     if (!add) element.querySelector("a").classList.remove("sidemenu-hover");
//   }
//   mm_accessibility.ariaCheck();
// }

// export function closeAllMenus(event) {
//   const openLink = document.querySelector(".tb-megamenu .level-1.open a");

//   document.querySelectorAll(".tb-megamenu .level-1.open").forEach((element) => {
//     processLinkStyles(element, ".tb-megamenu-item.level-1.open");
//   });

//   document.querySelectorAll(".tb-megamenu .level-2.open").forEach((element) => {
//     element.classList.remove("open");
//   });

//   toggleContentOverlay(document.querySelector(".tb-megamenu .level-1"));
//   removeHoverFromLevel2Links(true);
//   mm_accessibility.ariaCheck();
//   if (
//     !!event &&
//     !!event.code &&
//     event.code.toLowerCase() === "escape" &&
//     openLink
//   )
//     openLink.focus();
// }

// function blurNonOpenFirstLevelLink() {
//   const focusedLink = document.querySelector(
//     ".tb-megamenu .tb-megamenu-item.level-1:not(.open) a:focus"
//   );
//   if (!!focusedLink) focusedLink.blur();
// }
