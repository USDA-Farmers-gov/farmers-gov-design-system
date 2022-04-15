<template>
  <div class="alert-wrapper full-width pt-6 pb-8">
    <div :class="setAlertClasses()" id="coronavirus-alert">
      <div class="usa-alert-body">
        <div class="usa-alert-text">
          <h2 class="usa-alert-heading headline-4">
            {{ data.header }}
          </h2>
          <div
            v-html="setAllLinksOpenInNewWindow(data.content)"
            @click="handleLinkAlert"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Alert",
  props: ["data"],
  data() {
    return {
      extLinks: [],
    };
  },
  mounted() {
    this.extLinks = this.getExternalLinksFromContent(this.data.content);
  },
  methods: {
    setAlertClasses() {
      let classes = "usa-alert";

      if (this.data.type === "success")
        classes = `${classes} usa-alert-success`;
      if (this.data.type === "info") classes = `${classes} usa-alert-info`;
      if (this.data.type === "error") classes = `${classes} usa-alert-error`;
      if (this.data.type === "warning")
        classes = `${classes} usa-alert-warning`;

      return classes;
    },
  },
};
</script>
