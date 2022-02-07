<template>
  <Fragment>
    <input
      type="radio"
      :id="id"
      class="radio-input"
      :name="name"
      :value="value"
      :checked="checked"
      @click="$parent.processAnswer(option, stepIndex)"
    />
    <label :for="id" class="radio-label">
      {{ text }}
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
