import * as mm_accessibility from "./accessibility/farmers_mm_accessibility";

export function closeOnOutsideClick() {
  document.addEventListener("click", (event) => {
    const isClickInside = document.querySelector(".tbm").contains(event.target)
      ? true
      : false;

    if (!isClickInside) {
      closeAllMenus();
      toggleContentOverlay(false);
      // mm_accessibility.ariaCheck();
    }
  });
}

export function menuClickEvents() {
  const levelOneLinksDropdowns = document.querySelectorAll(
    ".tbm-item.level-1.tbm-item--has-dropdown",
  );
  levelOneLinksDropdowns.forEach(function (section) {
    const link = section.querySelector("a");

    if (!!link) {
      section.querySelector("a").addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();

        const sideMenuFirstLink = section.querySelector(
          ".tbm-item.level-2.tbm-item--has-flyout",
        );

        const button = section.querySelector("button");
        if (!!button) button.click();
        setFirstSideMenuLinkAsActive(link, sideMenuFirstLink);
      });

      // button
      section.querySelector("button").addEventListener("click", (event) => {
        const sideMenuFirstLink = section.querySelector(
          ".tbm-item.level-2.tbm-item--has-flyout",
        );
        setFirstSideMenuLinkAsActive(link, sideMenuFirstLink);
        toggleContentOverlay(true);
      });
    }
  });
}

export function disableLinkContainerEvents() {
  // IMPORTANT:  Overides Drupal 10 TB Megamenu module
  // disable clicks in container links.
  const containers = document.querySelectorAll(
    ".tbm-item.level-2.tbm-item--has-flyout .mega-dropdown-inner",
  );
  containers.forEach((element) => {
    element.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
    });
  });

  const containerLinks = document.querySelectorAll(
    ".tbm-item.level-2.tbm-item--has-flyout .mega-dropdown-inner a",
  );

  containerLinks.forEach((element) => {
    element.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      window.location.href = event.currentTarget.href;
    });
  });
}
export function setFirstSideMenuLinkAsActive(link, sideMenuFirstLink) {
  if (!!sideMenuFirstLink) {
    sideMenuFirstLink.classList.remove("open");
    if (link.getAttribute("aria-expanded") === "false")
      sideMenuFirstLink.classList.add("open");
  }
}

export function scrollEvents() {
  document.addEventListener("scroll", (event) => {
    const openMenu = document.querySelector(".level-1.open");
    if (openMenu) {
      const openSubMenu = openMenu.querySelector(".mm-card-grid");
      const openMenuCoords = openSubMenu
        ? openSubMenu.getBoundingClientRect()
        : null;

      if (
        !!openMenuCoords &&
        openMenuCoords.y * -1 - openMenuCoords.height >= 300
      ) {
        toggleContentOverlay();
        openMenu.classList.remove("open");
        // mm_accessibility.ariaCheck();
      }
    }
  });
}

export function toggleContentOverlay(force_block) {
  const overlay = document.querySelector(".usa-overlay");

  let display = "none";

  const docHeight =
    document.querySelector("html").getBoundingClientRect().height -
    document.querySelector("header").getBoundingClientRect().height;

  document.querySelector(".usa-overlay").style.height = `${docHeight}px`;

  if (overlay.style.display !== "block" || !!force_block) display = "block";
  if (overlay.style.display === "none") display = "block";
  if (force_block === false || overlay.style.display === "block")
    display = "none";
  overlay.style.display = display;

  // mm_accessibility.ariaCheck();
  // blurNonOpenFirstLevelLink();
}

export function setupNavLinks() {
  const firstLevelSelector = ".tbm-item.level-1";
  const firstLevelOpenSelector = `${firstLevelSelector}.open`;
  const firstLevel = document.querySelectorAll(firstLevelSelector);
  const languages = require("../../../constants").languages;
  const langHomePages = languages.map((row) =>
    row.lang === "en" ? "/" : `/${row.lang}`,
  );

  firstLevel.forEach((item) => {
    processSubmenuBanner(item);
    setPanelMinHeight(item);
  });

  const submenus = document.querySelectorAll(
    ".level-1 > div.tbm-submenu.tbm-item-child.nav-submenu",
  );
  submenus.forEach((submenu) => {
    const sidemenuLinks = submenu.querySelectorAll(
      ".tbm .sidemenu .tbm-item.level-2.tbm-item--has-flyout",
    );
    if (sidemenuLinks) {
      sidemenuLinks.forEach((link) => {
        const linkSubMenu = link.querySelector(
          ".tbm-submenu.tbm-item-child.nav-submenu",
        );

        const cardGridHeight = linkSubMenu.getBoundingClientRect().height;

        if (cardGridHeight)
          link
            .querySelector(".tbm-toggle")
            .setAttribute("data-grid-card-height", cardGridHeight);

        // click events
        link.addEventListener("click", (event) => {
          if (!!link.classList.contains("open")) {
            event.preventDefault();
            return;
          }

          const childSubMenus = document.querySelectorAll(
            ".level-2 .tbm-submenu.tbm-item-child.nav-submenu",
          );

          if (!!childSubMenus)
            childSubMenus.forEach((menu) => {
              menu.style.left = "-999999999px";
            });

          const cardHeight = link
            .querySelector(".tbm-toggle")
            .getAttribute("data-grid-card-height");

          submenu.style.minHeight = `${Number(cardHeight) + 70}px`;

          setTimeout(() => {
            childSubMenus.forEach((menu) => {
              menu.style.left = null;
            });
          }, 100);
        });
      });
    }
    // const link = item.querySelector("a");
    // const activeLinkClass = "mm-active";

    // if (
    //   langHomePages.includes(link.getAttribute("data-label")) &&
    //   langHomePages.includes(window.location.pathname)
    // )
    //   link.classList.add(activeLinkClass);

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

export function setupSecondLevelLinks() {
  const sidemenus = document.querySelectorAll(".tbm-subnav.level-1.sidemenu");
  const top = document
    .querySelector(".tbm-submenu.tbm-item-child.nav-submenu")
    .getBoundingClientRect().top;

  sidemenus.forEach((sidmenu) => {
    sidmenu.querySelectorAll("li.tbm-item.level-2").forEach((item, idx) => {
      const submenu = item.querySelector(
        ".tbm-submenu.tbm-item-child.nav-submenu",
      );
      if (!!submenu) {
        const topDifference = top - submenu.getBoundingClientRect().top + 70;
        submenu.style.top = `${topDifference}px`;
      }
    });
  });
}

export function processSubmenuBanner(item) {
  const linkText = item.querySelector("a").text.trim();
  const originalBanner = document.querySelector(
    `.mm-landing-page-banner[data-label='${linkText}']`,
  );
  const landingPageBanner = originalBanner
    ? originalBanner.cloneNode(true)
    : "";

  if (landingPageBanner) {
    // const submenuLevel1 = item.querySelector(
    //   ".tbm-submenu.tbm-item-child.nav-submenu",
    // );
    const submenuLevel1 = item.querySelector(".mega-dropdown-inner");

    if (submenuLevel1) {
      submenuLevel1.prepend(landingPageBanner);
      landingPageBanner.classList.add("show-mm-landing-page-banner");
    }
  }
}

export function setPanelMinHeight(item) {
  const targetNode = item;
  const config = { attributes: true, childList: true };
  const callback = function (mutationsList, observer) {
    if (item.classList.contains("open")) {
      const sideMenu = item.querySelector(
        ".tbm-submenu.tbm-item-child.nav-submenu",
      );

      if (!!sideMenu) {
        const submenu = item.querySelector(
          "li.tbm-item.level-2.tbm-item--has-flyout.open > div.tbm-submenu.tbm-item-child.nav-submenu",
        );
        const height = !!submenu ? submenu.getBoundingClientRect().height : 200;
        // add height of section banner
        sideMenu.style.minHeight = `${height + 70}px`;
      }
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

export function closeAllMenus(event) {
  const openLinks = document.querySelectorAll(".tbm-item.level-1.open");

  openLinks.forEach((link) => {
    link.querySelector("a").click();
  });
  if (event) toggleContentOverlay();
}
