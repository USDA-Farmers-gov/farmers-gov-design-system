<template>
  <div>
    <div v-for="(value, name) in data">
      <!-- ALERT -->
      <div v-if="name === 'alert'">
        <Alert :data="data.alert"></Alert>
      </div>

      <!-- BUTTON/START OVER LINK -->
      <div v-if="name === 'button'">
        <div class="row">
          <div class="medium-12">
            <Button :data="data.button"></Button>
            <a class="btn tertiary ml-4" @click="goBacktoStart" tabindex="0">
              Start Over
            </a>
          </div>
        </div>
      </div>

      <!-- MARKUP -->
      <div v-if="name === 'markup'" v-html="data.markup"></div>
    </div>
    <!-- START OVER -->
    <a
      v-if="showStartOver()"
      class="btn tertiary no-padding-left"
      @click="goBacktoStart"
      tabindex="0"
    >
      Start Over
    </a>
  </div>
</template>

<script>
import Alert from "./elements/Alert.vue";
import Button from "./elements/Button.vue";

export default {
  name: "Result",
  props: ["data"],
  components: {
    Alert: Alert,
    Button: Button,
  },
  methods: {
    showStartOver() {
      return !this.data.button;
    },
    goBacktoStart() {
      this.$parent.resetStepper();
      this.$parent.scrollToFirstStep();
    },
  },
};
</script>
