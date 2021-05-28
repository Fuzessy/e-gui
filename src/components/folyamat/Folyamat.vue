<template>
  <div class="folyamat-frame">
    <div class="folyamat-header">
      folyamat-header
    </div>

    <div class="folyamat-center">
      <div class="folyamat-main">
        <slot name="folyamat-main"></slot>
      </div>
      <div class="folyamat-buttons">
        folyamat-buttons
      </div>
    </div>

    <div class="folyamat-footer">
      folyamat-footer
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default class Folyamat extends Vue {

}
</script>

<style scoped lang="scss">

.folyamat-frame {
  display: flex;
  flex-direction: column;
  height: 100%;

  .folyamat-header {
    background-color: lightblue;
  }

  .folyamat-center {
    display: flex;
    flex-grow: 1;

    .folyamat-main {
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      background-color: $folyamat-background-color;
    }

    .folyamat-buttons {
      background-color: #4e78ae;
      min-width: 150px;
    }
  }


  .folyamat-footer {
    background-color: chocolate;
    height: 30px;
  }



}

</style>
