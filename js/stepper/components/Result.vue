<template>
  <div>
    <div v-for="(value, name, index) in data" class="row">
      <div v-if="name === 'alert'" class="medium-12">
        <Alert :data="data.alert"></Alert>
      </div>
      <div v-if="name === 'markup'" class="medium-12">
        <div v-html="data.markup"></div>
      </div>
      <div
        v-if="name === 'button' || index === Object.keys(data).length - 1"
        :class="setRowClasses()"
      >
        <div v-if="name === 'button'" class="mr-8">
          <Button :data="data.button"></Button>
        </div>
        <div class="start-over-container">
          <a
            class="btn tertiary pl-0 start-over"
            tabindex="0"
            @click="goBacktoStart"
          >
            Start Over
          </a>
        </div>

        <div
          v-if="printLink && !firefoxOnAndroid()"
          class="inline-flex print-btn ml-auto"
        >
          <span class="icon print"></span>
          <a
            class="text-link no-icon mt-4 pr-0"
            @click="printStepper"
            tabindex="0"
            >Print Results</a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Alert from "./elements/Alert";
import Button from "./elements/Button";

export default {
  name: "Result",
  props: ["data", "printLink", "selectedValue"],
  components: {
    Alert: Alert,
    Button: Button,
  },
  methods: {
    setRowClasses() {
      const answerClass = this.webFriendlyName(this.selectedValue);
      return `medium-12 stepper-button-row-${answerClass} flex flex-align-items-center flex-column-m`;
    },
    showStartOver() {
      return !this.data.button;
    },
    goBacktoStart() {
      this.$parent.resetStepper();
      this.$parent.scrollToFirstStep();
    },
    printStepper() {
      this.$parent.printStepper();
    },
    firefoxOnAndroid() {
      return this.is_firefox() && this.is_android();
    },
  },
};
</script>
