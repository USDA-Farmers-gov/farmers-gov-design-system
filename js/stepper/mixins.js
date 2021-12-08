export function initialize(Vue) {
  Vue.mixin({
    methods: {
      webFriendlyName(text) {
        text = text.replace(/\s+/g, "-");
        text = text.replace(/[^0-9a-zA-Z\-]/g, "");
        return text.toLowerCase();
      },
      createFormElementId(question, answer) {
        const stepperId = this.data.element_id;
        const questionWebFriendlyName = this.webFriendlyName(
          question
        ).substring(0, 30);
        const answerWebFriendlyName = this.webFriendlyName(answer);

        return `${stepperId}-${questionWebFriendlyName}-${answerWebFriendlyName}`;
      },
    },
  });
}
