<template>
  <div>
    <h3>Tanuló választás</h3>

  </div>
</template>

<script lang="ts">
    import {Vue, Component} from "vue-property-decorator";
    import { Route } from 'vue-router';

    @Component({
        beforeRouteEnter (
            to: Route,
            from: Route,
            next: Function
    ): void {
        next();
    }
    })
    export default class TanuloValasztas extends Vue {


    }
</script>

<style scoped>

</style>
