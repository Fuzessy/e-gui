<template>
  <div>
    <h3>Tanuló választás</h3>

    <v-data-table
            :headers="headers"
            :items="tanulok"
            :single-select="true"
            show-select
            item-key="tanuloId"
            sort-by="calories"
            class="elevation-1"
    >

    </v-data-table>

  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Route } from "vue-router";
import axios from "axios";
import {Menu} from "@/components/mainframe/model/Menu";

@Component({
  beforeRouteEnter(to: Route, from: Route, next: Function): void {
    next();
  }
})
export default class TanuloValasztas extends Vue {
    private headers : any[] = []
    private tanulok : any[] = []
    private singleSelect : any

    constructor() {
        super();
        this.headers = [
            {
                text: '#TANULO_ID',
                align: 'start',
                sortable: false,
                value: 'tanuloId',
            },
            { text: 'Név', value: 'tanuloNev' },
            { text: 'Csoport', value: 'csoportNev' },
            { text: 'Csoport vezető', value: 'csoportVezetoNev' },
            { text: 'Actions', value: 'actions', sortable: false },
        ];

        /*this.tanulok = [
            {
                tanuloId: 1,
                tanuloNev: 'Füzesi Zsoltika',
                csoportNev: 'Alma csoport',
                csoportVezetoNev: 'Ecserika Barbika'
            }
        ];*/
    }

    mounted(){
        axios.get<Array<any>>("http://localhost:9999/ovi/tanulok").then(response => {
            this.tanulok = response.data;
        });
    }
}
</script>

<style scoped></style>
