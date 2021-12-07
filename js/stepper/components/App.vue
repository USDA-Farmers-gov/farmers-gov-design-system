<template>
  <div class="row simple-stepper pb-12" :lang="data.lang_code">
    <div class="medium-12">
      <h2>{{ data.stepper_header }}</h2>
      <p>{{ data.stepper_description }}</p>
      <hr />
      <div
        :id="`${stepperId}-${stepIndex}`"
        :class="rowClasses(step, stepIndex)"
        v-for="(step, stepIndex) in data.questions"
        v-if="stepIsVisible(stepIndex) || stepIndex === 0"
      >
        <div class="question-number mr-2">
          <div class="number-container">
            <div class="number">{{ stepNumber(stepIndex) }}</div>
          </div>
        </div>
        <div class="question-and-answer">
          <h3 class="question mt-6">
            {{ step.question }}
          </h3>
          <p v-if="step.description">
            {{ step.description }}
          </p>
          <div v-for="option in step.options">
            <input
              type="radio"
              :id="createFormElementId(step.question, option.value)"
              class="radio-input"
              :name="webFriendlyName(step.question)"
              :value="option.value"
              :checked="optionIsChecked(option.value, stepIndex)"
              @click="processAnswer(option, stepIndex)"
            />
            <label
              :for="createFormElementId(step.question, option.value)"
              class="radio-label"
            >
              {{ option.value }}
            </label>
          </div>
          <Result
            v-if="getResult(stepIndex) && getResult(stepIndex).result"
            :data="getResult(stepIndex).result"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Result from "./Result.vue";

export default {
  name: "App",
  props: ["data"],
  data() {
    return {
      stepperId: this.data.element_id,
      visibleSteps: [],
      selected: [],
      results: [],
    };
  },
  components: {
    Result: Result,
  },
  mounted() {
    this.resetStepper();
  },
  methods: {
    rowClasses(step, stepIndex) {
      let classes = ["input-row"];
      if (!!this.visibleSteps.filter((row) => row.stepIndex > stepIndex).length)
        classes.push("answered");

      return classes.join(" ");
    },
    stepNumber(stepIndex) {
      return (
        this.visibleSteps.findIndex((row) => row.stepIndex === stepIndex) + 1
      );
    },
    resetStepper() {
      this.visibleSteps = [{ stepIndex: 0 }];
      this.results = [];
    },
    scrollToFirstStep() {
      this.scrollToStep(0);
    },
    stepIsVisible(stepIndex) {
      return this.visibleSteps.filter((row) => row.stepIndex === stepIndex)
        .length;
    },
    optionIsChecked(value, stepIndex) {
      return Boolean(
        this.visibleSteps.findIndex(
          (row) => row.stepIndex === stepIndex && row.answer === value
        ) > -1
      );
    },
    processAnswer(option, stepIndex) {
      // remove questions if their index is higher than the one currently selected.
      this.visibleSteps = this.visibleSteps.filter(
        (row) => row.stepIndex <= stepIndex
      );
      this.results = [];

      if (!!option.value) {
        this.setAnswer(stepIndex, option.value);
        this.scrollToStep(stepIndex + 1);
      }
      if (!!option.go_to) {
        let nextStep = option.go_to - 1;
        this.setAnswer(nextStep);
        this.scrollToStep(nextStep);
      }
      if (!!option.result) {
        this.results = this.results.filter(
          (row) => row.stepIndex !== stepIndex
        );
        this.results.push({ stepIndex: stepIndex, result: option.result });
      }
    },
    setAnswer(index, value) {
      this.results = [];
      this.visibleSteps = this.visibleSteps.filter(
        (row) => row.stepIndex !== index
      );
      this.visibleSteps.push({ stepIndex: index, answer: value });
    },
    getResult(index) {
      return !!this.results
        ? this.results.filter((row) => row.stepIndex === index)[0]
        : [];
    },
    scrollToStep(index) {
      setTimeout(() => {
        const element = document.getElementById(`${this.stepperId}-${index}`);
        if (!!element) element.scrollIntoView({ behavior: "smooth" });
      }, 200);
    },
  },
};
</script>
