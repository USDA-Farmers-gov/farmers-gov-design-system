export function initialize(Vue) {
  Vue.mixin({
    methods: {
      webFriendlyName(text) {
        text = text.replace(/\s+/g, "-");
        text = text.replace(/[^0-9a-zA-Z\-]/g, "");
        return text.toLowerCase();
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
