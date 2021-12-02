export function initialize(Vue) {
  Vue.mixin({
    methods: {
      webFriendlyName(text) {
        text = text.replace(/\s+/g, "-");
        text = text.replace(/[^0-9a-zA-Z\-]/g, "");
        return text.toLowerCase();
      },
      createFormElementId(question, answer) {
        return `${this.webFriendlyName(question).substring(
          0,
          30
        )}-${this.webFriendlyName(answer)}`;
      },
    },
  });
}
