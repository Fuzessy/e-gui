<template>
  <MainFrame>
    <template v-slot:main-content>
      <router-view />
    </template>
  </MainFrame>
</template>

<script lang="ts">
import MainFrame from "@/components/mainframe/MainFrame.vue";
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: { MainFrame }
  })
export default class App extends Vue {}
</script>
