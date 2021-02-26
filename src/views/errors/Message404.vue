<template>
  <div class="not-found"></div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class Message404 extends Vue {}
</script>

<style scoped>
.not-found {
  height: 800px;
  background-image: url(~@/assets/error/not_found.jpg);
}
</style>
