window.addEventListener("load", function () {
    let w =
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth;
    if (is_mobile_device || w <= 1000) {
        document.addEventListener("click", (event) => {
            const helper = (element, className) => {
                if (!!element) {
                    if (element.classList.contains(className)) {
                        return element;
                    } else {
                        return helper(element.parentElement, className);
                    }
                }
            };
            // create the mobile menu...
            if (document.querySelector(".mobile-menu-button") == event.target) {
                const defaultCalloutBtn = document.querySelector(
                    ".header-inner-wrap .header-button"
                );

                let mobileNav = document.querySelector(".mobile-primary-nav");
                let navBar = document.querySelector(".primary-nav");
                let navContainer = document.querySelector(".nav-container");
                let navBarClone = navBar.cloneNode(true);
                let navBrandingBar = document
                    .getElementById("nav-branding-bar")
                    .cloneNode(true);
                let mobileNavHeader = document.createElement("div");
                let mobileNavFooter = document.createElement("div");
                let mobileMobileMenuSearch = document.createElement("div");
                let closeSpan = document.createElement("span");
                let backButton = document.createElement("div");
                let menuSlider = document.createElement("div");
                let utilityNav = document
                    .querySelector(".header-inner-wrap .utility-nav")
                    .cloneNode(true);
                let calloutBtn = defaultCalloutBtn
                    ? defaultCalloutBtn.cloneNode(true)
                    : document
                          .querySelector(
                              ".header-inner-wrap .utility-nav-buttons"
                          )
                          .cloneNode(true);
                let searchField = document
                    .querySelector("#search-field")
                    .cloneNode(true);

                // start 508 fixes
                searchField.id = "search-field-mobile"; // start 508 fixes

                var searchFieldOuter = searchField.outerHTML;

                searchFieldOuter = searchFieldOuter.replaceAll(
                    "affiliatename",
                    "affiliatename-mobile"
                );
                searchFieldOuter = searchFieldOuter.replaceAll(
                    "header-search",
                    "header-search-mobile"
                );
                searchFieldOuter = searchFieldOuter.replaceAll(
                    "affiliatename",
                    "affiliatename-mobile"
                );
                searchFieldOuter = searchFieldOuter.replaceAll(
                    "Site Search",
                    "Mobile Site Search"
                );

                backButton.innerText = "Back";
                backButton.classList.add("mobile-menu-back");
                menuSlider.classList.add("menus-slider-container");
                closeSpan.classList.add("mobile-menu-close");
                mobileMobileMenuSearch.classList.add("mm-search");
                mobileNavHeader.classList.add("mobile-nav-header");
                mobileNavHeader.appendChild(closeSpan);
                mobileNavHeader.appendChild(backButton);
                mobileNavHeader.appendChild(mobileMobileMenuSearch);
                //mobileNavHeader.appendChild(searchField);
                if (searchField)
                    mobileNavHeader.querySelector(
                        ".mm-search"
                    ).innerHTML = searchFieldOuter;
                backButton.style.display = "none";
                document.body.classList.toggle("mobile-menu-active");
                mobileNav.style.display = "flex";
                navContainer.appendChild(mobileNavHeader);
                menuSlider.appendChild(navBarClone);
                navContainer.appendChild(menuSlider);
                mobileNavFooter.classList.add("mobile-nav-footer");
                mobileNavFooter.appendChild(calloutBtn);
                if (!!navBrandingBar)
                    mobileNavFooter.appendChild(navBrandingBar);
                mobileNavFooter.appendChild(utilityNav);
                navContainer.appendChild(mobileNavFooter);

                var navBarCloneOuter = navBarClone.outerHTML;
                navBarCloneOuter = navBarCloneOuter.replaceAll(
                    "Primary",
                    "Mobile Menu"
                );
                if (navBarClone)
                    menuSlider.querySelector(
                        ".primary-nav"
                    ).outerHTML = navBarCloneOuter;
            }

            const mobileNavContainerClicked = helper(
                event.target,
                "nav-container"
            );
            const mobileNavItemClicked = helper(event.target, "nav-link");
            const mobileNavContainer = document.querySelector(
                ".menus-slider-container"
            );
            const submenuHasSubmenu = helper(event.target, "has-submenu");

            if (mobileNavItemClicked) {
                if (
                    mobileNavItemClicked.classList.contains("accordion-button")
                ) {
                    event.preventDefault();
                    event.stopPropagation();

                    let mobileSubmenu = mobileNavItemClicked.parentElement
                        .querySelector(".nav-submenu")
                        .cloneNode(true);
                    let emptyNavDiv = document.createElement("div");
                    emptyNavDiv.appendChild(mobileSubmenu);
                    mobileNavContainer.appendChild(emptyNavDiv);
                    mobileNavContainer.classList.toggle("level-2");
                    document.querySelector(
                        ".mobile-nav-header > .mobile-menu-back"
                    ).style.display = "flex";
                    document.querySelector(
                        ".mobile-nav-header > #search-field"
                    ).style.display = "none";
                    document.querySelector(".mobile-nav-footer").style.display =
                        "none";
                }
            }

            if (
                event.target.classList.contains("mobile-primary-nav") ||
                event.target.classList.contains("mobile-menu-close")
            ) {
                document.body.classList.toggle("mobile-menu-active");
                document.querySelector(".mobile-primary-nav").style.display =
                    "none";
                document.querySelector(".nav-container").innerHTML = "";
            }

            if (event.target.classList.contains("mobile-menu-back")) {
                event.preventDefault();
                event.stopPropagation();

                let lowestLevel = mobileNavContainer.lastChild;

                if (mobileNavContainer.classList.contains("level-3")) {
                    mobileNavContainer.classList.remove("level-3");
                } else {
                    mobileNavContainer.classList.remove("level-2");
                    document.querySelector(".mobile-menu-back").style.display =
                        "none";
                    document.querySelector(
                        ".mobile-nav-header > #search-field"
                    ).style.display = "flex";
                    document.querySelector(".mobile-nav-footer").style.display =
                        "flex";
                }

                setTimeout(() => {
                    mobileNavContainer.removeChild(lowestLevel);
                }, 50);
            }

            if (submenuHasSubmenu) {
                event.preventDefault();
                event.stopPropagation();

                let subSubmenu = submenuHasSubmenu
                    .querySelector(".nav-submenu-submenu")
                    .cloneNode(true);
                let emptyNavDiv = document.createElement("div");
                emptyNavDiv.appendChild(subSubmenu);
                mobileNavContainer.appendChild(emptyNavDiv);
                mobileNavContainer.classList.toggle("level-3");
            }
        });
    }
});
