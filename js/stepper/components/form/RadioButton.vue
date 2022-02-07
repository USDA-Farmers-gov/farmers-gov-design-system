<template>
  <Fragment>
    <label class="radio-button-label flex">
      <input
        type="radio"
        class="radio-button-input"
        :name="name"
        :value="value"
        :checked="checked"
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
};
</script>
