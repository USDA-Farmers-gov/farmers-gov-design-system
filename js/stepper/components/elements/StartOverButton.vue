<template>
  <a class="btn tertiary pl-0" tabindex="0" @click="buttonClickHandler">
    Start Over
  </a>
</template>

<script>
export default {
  methods: {
    buttonClickHandler() {
      console.log("1");
      this.$emit("start-over");
    },
  },
};
</script>
