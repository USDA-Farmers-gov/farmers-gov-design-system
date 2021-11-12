import * as general_utils from "../../../_utils/general_utils";

export function setupFirstLevelTab(firstLevel, categoryName, linksContainer) {
  const sectionHeader = firstLevel.querySelector("a:first-of-type");
  const categoryHeader = document.createElement("div");
  categoryHeader.id = `mm-mobile-menu-${general_utils.webFriendlyName(
    categoryName
  )}`;
  categoryHeader.classList.add("mm-mobile-nav-category");

  // append main category header
  categoryHeader.textContent = categoryName;
  linksContainer.appendChild(categoryHeader);
}

export function setupMobileGridLinks(firstLevel, submenus, linksContainer) {
  submenus.forEach(function (submenu) {
    submenu = submenu.cloneNode(true);
    let categoryHeader = "";
    if (submenu.classList.contains("level-2")) {
      const pageLink = submenu.querySelector("a.page-link");
      categoryHeader = document.createElement("div");
      categoryHeader.classList.add("mm-link-category");
      if (pageLink) {
        const categoryPageLink = document.createElement("a");
        categoryPageLink.href = pageLink.href;
        categoryPageLink.text = pageLink.text;
        categoryPageLink.classList.add("direct-link");
        categoryHeader.classList.add("direct-link-item");
        categoryHeader.appendChild(categoryPageLink);
      }
      if (!pageLink)
        categoryHeader.innerHTML = submenu.getAttribute("data-label");
    }
    const links = submenu.querySelectorAll(".subcategory.row a");
    const linkList = createGridLinksContainer(links);
    if (categoryHeader) linksContainer.appendChild(categoryHeader);
    linksContainer.appendChild(linkList);
  });
}

export function createGridLinksContainer(links) {
  let linkList = document.createElement("ul");
  linkList.classList.add("mm-category-links");

  links.forEach((link) => {
    let newLink = document.createElement("a");
    newLink.href = link.href;
    newLink.text = general_utils.decodeHTMLEntities(
      link.querySelector("span:first-of-type").innerHTML
    );
    const listItem = document.createElement("li");
    listItem.appendChild(newLink);
    linkList.appendChild(listItem);
  });
  return linkList;
}

export function setupFeaturedLinksContainer(firstLevel, linksContainer) {
  const featuredLinks = firstLevel.querySelectorAll(".mm-grid-featured a");
  if (featuredLinks.length) {
    let featuredLinksHeader = document.createElement("div");
    let featuredLinksList = document.createElement("ul");

    featuredLinksHeader.classList.add(
      "mm-link-category",
      "mm-mobile-featured-container"
    );
    featuredLinksHeader.innerHTML = "Featured";
    featuredLinksList.classList.add("mm-featured-links");
    const uniqueLinks = general_utils.removeDupsInAssociativeArrayByKey(
      featuredLinks,
      "href"
    );

    general_utils.sortArrayAlphabeticalByKey(uniqueLinks);

    uniqueLinks.forEach((featuredLink) => {
      featuredLink = featuredLink.cloneNode(true);
      const newLink = document.createElement("li");
      newLink.appendChild(featuredLink);
      featuredLinksList.appendChild(newLink);
    });

    if (featuredLinksList) {
      linksContainer.appendChild(featuredLinksHeader);
      linksContainer.appendChild(featuredLinksList);
    }
  }
}

export function setupLandingPageLink(firstLevel, linksContainer) {
  const landingPageLink = firstLevel.querySelector(
    ".mm-landing-page-banner-link"
  )
    ? firstLevel.querySelector(".mm-landing-page-banner-link").cloneNode(true)
    : "";
  if (landingPageLink) linksContainer.appendChild(landingPageLink);
}

export function setupLandingPageLinkNoSubmenu(firstLevel, categoryName) {
  const mobileCategoryElement = document.querySelector(
    `.mm-links-container #mm-mobile-menu-${general_utils.webFriendlyName(
      categoryName
    )}`
  );

  let pageLinkContainer = document.createElement("div");
  let pageLink = document.createElement("a");
  pageLinkContainer.classList.add("mm-landing-page-link");
  pageLink.text = `View ${categoryName} Page`;
  pageLink.href = firstLevel.querySelector("a").getAttribute("href");
  pageLink.classList.add("btn", "tertiary");

  //add link to container
  pageLinkContainer.appendChild(pageLink);

  if (mobileCategoryElement)
    mobileCategoryElement.parentNode.insertBefore(
      pageLinkContainer,
      mobileCategoryElement.nextSibling
    );
}
