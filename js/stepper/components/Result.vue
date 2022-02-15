<template>
  <div>
    <div v-for="(value, name, index) in data">
      <div class="row">
        <div class="medium-12">
          <Alert v-if="name === 'alert'" :data="data.alert"></Alert>
          <div v-if="name === 'markup'" v-html="data.markup"></div>
          <div
            v-if="name === 'button' || index === Object.keys(data).length - 1"
          >
            <Button v-if="name === 'button'" :data="data.button"></Button>
            <StartOverButton @start-over="goBacktoStart" />

            <span v-if="printLink" class="flex print-btn">
              <div class="icon print"></div>
              <a
                class="text-link no-icon mt-4"
                @click="printStepper"
                tabindex="0"
              >
                Print Results
              </a>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Alert from "./elements/Alert.vue";
import Button from "./elements/Button.vue";
import StartOverButton from "./elements/StartOverButton.vue";

export default {
  name: "Result",
  props: ["data", "printLink"],
  components: {
    Alert: Alert,
    Button: Button,
    StartOverButton: StartOverButton,
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
