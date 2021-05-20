<template>
  <div style="display: flex; flex-direction: column">
    <div class="fuz-input-container">
      <div style="flex-grow: 1; text-align: left; font-size: 12px">
        {{ label }}
      </div>
      <div>
        <input
            class="fuz-input"
            v-model="inputText"
            :disabled="disabled"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Component from "vue-class-component";
import Vue from "vue";
import { Prop, VModel } from "vue-property-decorator";

@Component
export default class FuzInput extends Vue {
  @VModel({ type: String }) inputText!: string;
  @Prop({ type: String }) label!: string;
  @Prop({ type: Boolean, default:false }) disabled!: boolean;
}
</script>

<style scoped>
.fuz-input-container {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  padding: 5px 2px 2px 10px;
  color: grey;
}

.fuz-input {
  width: 100%;
  border-width: 0 0 2px 1px;
  border-style: solid;
  border-color: rgba(28, 110, 164, 0.3);
  border-radius: 0 0 0 6px;
}

.fuz-input:focus-visible {
  outline: 0;
  border-color: rgba(28, 110, 164, 0.6);
}

/*.fuz-input:focus-visible{*/
/*  outline: 0;*/

/*  border-bottom: 3px;*/
/*  border-color: rgba(28,110,164,0.3);*/
/*}*/
</style>
