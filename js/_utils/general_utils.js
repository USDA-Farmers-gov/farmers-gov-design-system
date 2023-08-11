export function removeUrlParams() {
  const newurl = `${window.location.protocol}//${window.location.host}${window.location.pathname}`;
  window.history.replaceState({}, document.title, newurl);
}

export function removeHtmlComments(html) {
  return html.replace(/<!--[\s\S]*?-->/g, "").trim();
}

export function convertNodeListToArray(nodeList) {
  return Array.from(nodeList);
}

export function webFriendlyName(text) {
  text = text.replace(/\s+/g, "-").toLowerCase();
  text = text.replace(/[^a-z0-9\-]+/gi, "");
  return text;
}

export function removeDupsInAssociativeArrayByKey(array, key) {
  let newArray = [];
  let uniqueObject = {};
  let i = 0;

  for (let i in array) {
    let obj = array[i][key];
    uniqueObject[obj] = array[i];
    i++;
  }

  for (i in uniqueObject) if (i !== "undefined") newArray.push(uniqueObject[i]);
  return newArray;
}

export function sortArrayAlphabeticalByKey(array, key) {
  if (!key) key = "text";
  array.sort(function (a, b) {
    if (a[key] > b[key]) return 1;
    if (a[key] < b[key]) return -1;
    return 0;
  });
}

export function decodeHTMLEntities(html) {
  var txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

export function addClassIfDoesntExist(element, className) {
  if (!!element && !element.classList.contains(className))
    element.classList.add(className);
}
export function removeClassIfExists(element, className) {
  if (!!element && element.classList.contains(className))
    element.classList.remove(className);
}

export function formatYouTubeUrl(url) {
  let videoCode;
  let youTubeUrl = "https://www.youtube.com/watch?v=";

  if (url.indexOf("embed") !== -1) {
    let array = url.split("embed/");
    let videoCode = !!array[1] ? array[1].split("?")[0] : "";
    if (!!videoCode) url = `${youTubeUrl}${videoCode}`;
  }
  return url;
}
