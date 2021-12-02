<template>
  <div :lang="data.lang_code">
    <h2>{{ data.stepper_header }}</h2>
    <p>{{ data.stepper_description }}</p>
    <hr />
    <div
      v-if="stepIsVisible(index) || index === 0"
      v-for="(step, index) in data.questions"
    >
      STEP {{ index + 1 }}
      <h3>
        {{ step.question }}
      </h3>
      <p v-if="step.description">
        {{ step.description }}
      </p>
      <span v-for="option in step.options">
        <input
          type="radio"
          :id="createFormElementId(step.question, option.value)"
          class="radio-input"
          :name="webFriendlyName(step.question)"
          :value="option.value"
          :checked="optionIsChecked(option.value, index)"
          @click="processAnswer(option, index)"
        />
        <label
          :for="createFormElementId(step.question, option.value)"
          class="radio-label"
        >
          {{ option.value }}
        </label>
      </span>
      <Result
        v-if="getResult(index) && getResult(index).result"
        :data="getResult(index).result"
      ></Result>
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
    this.setBlankSteps();
  },
  methods: {
    setBlankSteps() {
      this.visibleSteps = [{ step: 0, answer: "" }];
    },
    processAnswer(option, index) {
      this.setAnswer(index, option.value);

      if (!!option.go_to) {
        this.results = [];
        this.setAnswer(option.go_to - 1);

        const option_index = this.visibleSteps.filter(
          (row) => row.step === index
        );
        if (!!option_index && index === option_index)
          this.visibleSteps.splice(index, 1);
      }

      if (!!option.result) {
        const results_index = this.results.findIndex(
          (row) => row.index === index
        );

        if (results_index !== -1) this.results.splice(results_index, 1);
        this.results.push({ index: index, result: option.result });
      }
    },
    stepIsVisible(index) {
      return this.visibleSteps.filter((row) => row.step === index).length
        ? true
        : false;
    },
    optionIsChecked(value, index) {
      return this.visibleSteps.filter(
        (row) => row.step === index && row.answer === value
      ).length
        ? true
        : false;
    },
    setAnswer(step, answer) {
      this.visibleSteps.push({ step: step, answer: answer });
    },
    getResult(index) {
      return !!this.results
        ? this.results.filter((row) => row.index === index)[0]
        : [];
    },
  },
};
</script>
