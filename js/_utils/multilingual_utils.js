export function getPageLanguageCode() {
  return document.querySelector("html").getAttribute("lang");
}
