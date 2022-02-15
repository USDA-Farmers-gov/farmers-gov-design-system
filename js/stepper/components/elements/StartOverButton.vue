<template>
  <a class="btn tertiary pl-0" tabindex="0" @click="buttonClickHandler">
    Start Over
  </a>
</template>

<script>
export default {
  methods: {
    buttonClickHandler() {
      this.$emit("start-over");
    },
  },
};
</script>
