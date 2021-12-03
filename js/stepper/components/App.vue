<template>
  <div :lang="data.lang_code">
    <h2>{{ data.stepper_header }}</h2>
    <p>{{ data.stepper_description }}</p>
    <hr />
    <div
      v-for="(step, stepIndex) in data.questions"
      v-if="stepIsVisible(stepIndex) || stepIndex === 0"
    >
      <h3>
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
</template>

<script>
import Result from "./Result.vue";

export default {
  name: "App",
  props: ["data"],
  data() {
    return {
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
    resetStepper() {
      this.visibleSteps = [{ stepIndex: 0, answer: "" }];
      this.results = [];
    },
    processAnswer(option, stepIndex) {
      if (!!option.value) this.setAnswer(stepIndex, option.value);

      if (!!option.go_to) {
        const option_index = this.visibleSteps.filter(
          (row) => row.stepIndex === stepIndex
        );
        if (!!option_index && stepIndex === option_index)
          this.visibleSteps.splice(stepIndex, 1);

        this.results = [];
        this.setAnswer(option.go_to - 1);
      }

      if (!!option.result) {
        const results_index = this.results.findIndex(
          (row) => row.stepIndex === stepIndex
        );
        if (results_index !== -1) this.results.splice(results_index, 1);

        this.results.push({ stepIndex: stepIndex, result: option.result });
      }
    },
    stepIsVisible(stepIndex) {
      return this.visibleSteps.filter((row) => row.stepIndex === stepIndex)
        .length
        ? true
        : false;
    },
    optionIsChecked(value, stepIndex) {
      const answerCheck = this.visibleSteps.findIndex(
        (row) => row.stepIndex === stepIndex && row.answer === value
      );

      return answerCheck > -1 ? true : false;
    },
    setAnswer(index, value) {
      const existing_index = this.visibleSteps.findIndex(
        (row) => row.stepIndex === index
      );

      if (!!existing_index && existing_index > -1)
        this.visibleSteps.splice(existing_index, 1);

      this.visibleSteps.push({ stepIndex: index, answer: value });
    },
    getResult(index) {
      return !!this.results
        ? this.results.filter((row) => row.stepIndex === index)[0]
        : [];
    },
  },
};
</script>
