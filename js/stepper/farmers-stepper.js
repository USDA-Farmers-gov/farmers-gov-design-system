import Vue from "../../node_modules/vue/dist/vue.js";
import App from "./components/App.vue";

require("./mixins").initialize(Vue);

export default function FGStepper(data, options) {
  const el = document.getElementById(data.element_id);

  // extract data from the extlink Drupal module (if enabled)
  const drupalJsonSettings = document.querySelector(
    'script[data-drupal-selector="drupal-settings-json"]'
  );

  if (
    !!JSON.parse(drupalJsonSettings.innerHTML).data &&
    !!JSON.parse(drupalJsonSettings.innerHTML).data.extlink
  ) {
    const extLinkModuleData = !!drupalJsonSettings
      ? JSON.parse(drupalJsonSettings.innerHTML).data.extlink
      : "";

    if (!!extLinkModuleData)
      localStorage.setItem("extlink_data", JSON.stringify(extLinkModuleData));
  }

  var app = new Vue({
    el: el,
    render: (h) =>
      h(App, {
        props: {
          data: data,
          options: options,
        },
      }),
  });
}

window.FGStepper = FGStepper;
