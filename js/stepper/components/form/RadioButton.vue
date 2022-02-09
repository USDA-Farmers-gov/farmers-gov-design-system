<template>
  <Fragment>
    <label :class="labelClasses()">
      <input
        type="radio"
        class="radio-button-input"
        :name="name"
        :value="value"
        @click="$parent.processAnswer(option, stepIndex)"
      />
      <span>{{ text }}</span>
    </label>
  </Fragment>
</template>
<script>
import { Fragment } from "vue-fragment";
export default {
  name: "RadioButton",
  props: ["stepIndex", "id", "option", "name", "value", "text", "checked"],
  components: {
    Fragment: Fragment,
  },
  methods: {
    labelClasses() {
      let classes = "radio-button-label flex";
      if (this.checked) classes = `${classes} checked`;
      return classes;
    },
  },
};
</script>
