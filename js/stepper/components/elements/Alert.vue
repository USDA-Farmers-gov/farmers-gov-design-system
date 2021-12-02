<template>
  <div class="alert-wrapper">
    <div :class="setAlertClasses()" id="coronavirus-alert">
      <div class="usa-alert-body">
        <div class="usa-alert-text">
          <h2 class="usa-alert-heading headline-4">
            {{ data.header }}
            {{ data.type }}
          </h2>
          <p>
            {{ data.content }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Alert",
  props: ["data"],
  methods: {
    setAlertClasses() {
      let classes = "usa-alert";

      if (this.data.type === "warning")
        classes = `${classes} usa-alert-warning`;
      if (this.data.type === "success")
        classes = `${classes} usa-alert-success`;

      return classes;
    },
  },
};
</script>
