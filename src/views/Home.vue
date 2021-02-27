<template>
  <div class="home">
    <img src="https://nordicdairycongress.com/sites/default/files/billeder/nyheder/colourbox15033372.jpg" style="width:500px">
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src

@Component({
  components: {
    HelloWorld
  }
})
export default class Home extends Vue {}
</script>
