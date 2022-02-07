export function initialize(Vue) {
  Vue.mixin({
    methods: {
      webFriendlyName(text) {
        if (!!text) {
          text = text.replace(/\s+/g, "-");
          text = text.replace(/[^0-9a-zA-Z\-]/g, "");
          text = text.toLowerCase();
        }
        return text;
      },
      createFormElementId(value) {
        return `${this.data.element_id}-${value}`;
      },
      elementClasses(constant, dynamic) {
        let classes = [constant];
        if (!!dynamic) classes.push(dynamic);
        return classes.join(" ");
      },
    },
  });
}
