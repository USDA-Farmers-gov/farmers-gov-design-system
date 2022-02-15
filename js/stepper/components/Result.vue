<template>
  <div>
    <div v-for="(value, name, index) in data">
      <div class="row">
        <div class="medium-12">
          <Alert v-if="name === 'alert'" :data="data.alert"></Alert>
          <div v-if="name === 'markup'" v-html="data.markup"></div>
        </div>
        <div
          v-if="name === 'button' || index === Object.keys(data).length - 1"
          class="medium-12"
        >
          <Button v-if="name === 'button'" :data="data.button"></Button>
          <StartOverButton @start-over="goBacktoStart" />

          <div v-if="printLink" class="inline-flex print-btn">
            <span class="icon print"></span>
            <a
              class="text-link no-icon mt-4"
              @click="printStepper"
              tabindex="0"
            >
              Print Results
            </a>
          </div>
        </div>
      </div>
    </div>
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
