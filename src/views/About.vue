<template>
  <div>
    oldal2
  </div>
</template>
<script lang="ts">
  import MainFrame from "@/components/mainframe/MainFrame.vue";
  import { Component, Vue } from "vue-property-decorator";

  @Component({
    components: {MainFrame}
  })
  export default class About extends Vue {
  }
</script>
