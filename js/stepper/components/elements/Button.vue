<template>
  <a :href="data.link" class="btn" target="_new" @click="handleLinkAlert">
    {{ data.value }}
  </a>
</template>

<script>
export default {
  name: "Button",
  props: ["data"],
};
</script>
