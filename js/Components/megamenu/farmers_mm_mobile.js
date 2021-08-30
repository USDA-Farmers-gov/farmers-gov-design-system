import * as mm_mobile_utils from "./_utils/farmers_mm_mobile_utils";
import * as general_utils from "../../_utils/general_utils";

export const megamenu_mobile = function () {
  mm_mobile_utils.processMobileSections();
  mm_mobile_utils.backToTopShowHide();

  if (document.querySelector(".tb-megamenu")) {
    const megaMenuMobile = document.querySelector(
      ".mm-mobile-primary-nav.megamenu"
    );
    const signUpElement = !!document.querySelector(".header-button")
      ? document.querySelector(".header-button")
      : "";
    const signUpButtonsElement = !!document.querySelector(
      ".utility-nav-buttons"
    )
      ? document.querySelector(".utility-nav-buttons")
      : "";
    const searchElement = document.getElementById("search-field");

    let signupNode = signUpElement ? signUpElement.cloneNode(true) : null;
    const searchNode = searchElement ? searchElement.cloneNode(true) : null;
    if (!signupNode && !!signUpButtonsElement)
      signupNode = signUpButtonsElement.cloneNode(true);
    setUpUtilityNav(megaMenuMobile);

    const headerSearchId = "header-search-mobile";

    // start 508 fixes
    searchNode.id = "search-field-mobile";
    searchNode.querySelector("#affiliatename").id = "affiliatename-mobile";
    searchNode.querySelector("label").setAttribute("for", headerSearchId);
    searchNode.querySelector("#header-search").id = headerSearchId;
    searchNode.querySelector("div[aria-label='Site Search']").ariaLabel =
      "Mobile Site Search";
    // end 508 fixes
    // copy nodes to menu
    if (signupNode) {
      const signupNodeLink = signupNode.querySelector("a");

      general_utils.removeClassIfExists(signupNode, "header-button");
      general_utils.addClassIfDoesntExist(signupNode, "utility-nav-buttons");
      general_utils.addClassIfDoesntExist(signupNodeLink, "utility-nav-links");
      general_utils.addClassIfDoesntExist(signupNodeLink, "btn");
      general_utils.addClassIfDoesntExist(signupNodeLink, "tertiary");

      megaMenuMobile.querySelector(".mm-signup").innerHTML =
        signupNode.outerHTML;
    }
    if (searchNode)
      megaMenuMobile.querySelector(".mm-search").innerHTML =
        searchNode.outerHTML;
    // if (utilityNav) {
    //   const utilNavMarkup = !!brandingBarMenu
    //     ? `${brandingBarMenu.innerHTML} ${utilityNav.innerHTML}`
    //     : utilityNav.innerHTML;
    //   megaMenuMobile.querySelector(".mm-utility-nav").innerHTML = utilNavMarkup;
    // }

    // utilityNav.querySelector("ul").className = "";

    const topNav = document.querySelector(".mm-top-nav");
    const linksContainer = megaMenuMobile.querySelector(".mm-links-container");

    document
      .getElementById("mm-mobile")
      .addEventListener("click", function (event) {
        if (event.target.classList.contains("mm-mobile-primary-nav")) {
          document.body.classList.toggle("mobile-menu-active");
          document.querySelector(".mm-mobile-primary-nav").style.display =
            "none";
        }
      });

    document
      .querySelector(".mobile-megamenu-button")
      .addEventListener("click", function (element) {
        document.body.classList.add("mobile-menu-active");
        mm_mobile_utils.toggleMobileMegaMenu("open");

        const megaMenuMobileDisplay = window
          .getComputedStyle(megaMenuMobile)
          .getPropertyValue("display");

        if (megaMenuMobileDisplay === "none") {
          megaMenuMobile.style.display = "flex";
        } else {
          megaMenuMobile.style.display = "none";
        }
      });

    document
      .querySelector(".mm-mobile-menu-close")
      .addEventListener("click", function (element) {
        mm_mobile_utils.toggleMobileMegaMenu("close");

        document.body.classList.remove("mobile-menu-active");
      });
    megaMenuMobile.addEventListener("animationend", function () {
      if (
        document
          .querySelector(".nav-container")
          .classList.contains("animation-slide-out")
      )
        megaMenuMobile.style.display = "none";
    });
    const firstLevelMenus = document.querySelectorAll(
      ".tb-megamenu-item.level-1"
    );

    firstLevelMenus.forEach(function (element) {
      var decodeHTML = function (html) {
        var txt = document.createElement("textarea");
        txt.innerHTML = html;
        return txt.value;
      };

      const linkText = element
        .querySelector(".mm-nav-link > div")
        .innerHTML.trim();
      if (linkText.toLowerCase() === "home") return;

      let listItem = document.createElement("li");
      let link = document.createElement("a");

      const subMenu = element.querySelector(".tb-megamenu-item.level-2")
        ? element.querySelector(".tb-megamenu-item.level-2").cloneNode(true)
        : "";

      link.text = general_utils.decodeHTMLEntities(linkText);
      link.href = `#${general_utils.webFriendlyName(linkText)}`;
      link.classList.add("mm-mobile-top-nav");
      link.setAttribute("aria-label", "Jump to " + linkText);

      if (topNav) {
        listItem.appendChild(link);
        topNav.appendChild(listItem);
      }
    });

    const navJumpLinks = document.querySelectorAll(
      ".mm-mobile-top-nav:not(.home)"
    );
    navJumpLinks.forEach((link) => {
      link.addEventListener("click", (event) => {
        event.preventDefault();
        const navContainer = document.querySelector(
          "#mm-mobile .nav-container"
        );
        const closeButtonHeight = document
          .querySelector(".mm-mobile-menu-close")
          .getBoundingClientRect().height;
        let position = document
          .querySelector(event.target.hash)
          .getBoundingClientRect().y;

        let calcluatedPosition = position - closeButtonHeight;

        navContainer.scrollTop = calcluatedPosition;
      });
    });

    document
      .querySelector(".back-to-top.mm-back-to-top")
      .addEventListener("click", function (event) {
        event.stopPropagation();
        document.getElementById("mm-mobile-header").scrollIntoView();
      });

    document.addEventListener("click", function (event) {
      const clickedInside = document
        .querySelector("#mm-mobile .nav-container")
        .contains(event.target)
        ? true
        : false;

      if (
        !clickedInside &&
        !event.target.classList.contains("mobile-megamenu-button") &&
        !event.target.classList.contains("mm-back-to-top")
      ) {
        mm_mobile_utils.showBackToTop(false);

        megaMenuMobile.addEventListener("animationend", function () {
          if (
            document
              .querySelector(".nav-container")
              .classList.contains("animation-slide-out")
          )
            megaMenuMobile.style.display = "none";
        });
      }
    });

    window.addEventListener("popstate", mm_mobile_utils.backToTopShowHide());
  }
};

function setUpUtilityNav(megaMenuMobile) {
  const utilityNavElement = document.querySelector(".utility-nav");
  const utilityNav = utilityNavElement
    ? utilityNavElement.cloneNode(true)
    : null;
  const brandingBarMenu = document.getElementById("nav-branding-bar");

  if (!!brandingBarMenu)
    brandingBarMenu.querySelector("ul").classList.add("mm-branding-bar-menu");

  if (utilityNav) {
    const utilNavMarkup = !!brandingBarMenu
      ? `${brandingBarMenu.innerHTML} ${utilityNav.innerHTML}`
      : utilityNav.innerHTML;
    megaMenuMobile.querySelector(".mm-utility-nav").innerHTML = utilNavMarkup;
  }

  utilityNav.querySelector("ul").className = "";
}
