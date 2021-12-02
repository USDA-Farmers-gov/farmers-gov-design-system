<template>
  <a :href="data.link" class="btn">{{ data.value }}</a>
</template>

<script>
export default {
  name: "Button",
  props: ["data"],
};
</script>
