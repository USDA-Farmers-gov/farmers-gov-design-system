export function translate(json) {
  let langJson = json["en"];
  const htmlLang = document.querySelector("html").getAttribute("lang");

  if (!!htmlLang && htmlLang !== "en") langJson = json[htmlLang];

  if (htmlLang === "en") {
    Object.keys(json).forEach(function (key) {
      if (window.location.href.indexOf(`/${key}/`) > -1) langJson = json[key];
    });
  }

  return langJson;
}
