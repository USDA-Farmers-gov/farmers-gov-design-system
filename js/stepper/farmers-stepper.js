import Vue from "../../node_modules/vue/dist/vue.js";
import App from "./components/App.vue";

require("./mixins").initialize(Vue);

export default function FGStepper(data, options) {
  const el = document.getElementById(data.element_id);
  var app = new Vue({
    el: el,
    render: (h) => h(App, { props: { data: data, options: options } }),
  });
}

window.FGStepper = FGStepper;
