import Vue from "../../node_modules/vue/dist/vue.js";
import App from "./components/App.vue";

require("./mixins").initialize(Vue);

export default function FGStepper(data, options) {
  const el = document.getElementById(data.element_id);

  // this extracts data from the extlink Drupal module (if enabled)
  const extLinkModuleData = JSON.parse(
    document.querySelector(
      'script[data-drupal-selector="drupal-settings-json"]'
    ).innerHTML
  ).data.extlink;
  localStorage.setItem("extlink_data", JSON.stringify(extLinkModuleData));

  var app = new Vue({
    el: el,
    render: (h) =>
      h(App, {
        props: {
          data: data,
          options: options,
          extLinkModuleData: extLinkModuleData,
        },
      }),
  });
}

window.FGStepper = FGStepper;
