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
          class="
            medium-12
            step-footer
            flex flex-align-items-center flex-column-m
          "
        >
          <div>
            <Button v-if="name === 'button'" :data="data.button"></Button>
          </div>
          <div>
            <a
              class="btn tertiary pl-0 start-over"
              tabindex="0"
              @click="goBacktoStart"
            >
              Start Over
            </a>
          </div>

          <div v-if="printLink" class="inline-flex print-btn ml-auto">
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
  </div>
</template>

<script>
import Alert from "./elements/Alert";
import Button from "./elements/Button";

export default {
  name: "Result",
  props: ["data", "printLink"],
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
    printStepper() {
      this.$parent.printStepper();
    },
  },
};
</script>
