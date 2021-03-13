<template>
  <div>
    <h3>Tanuló választás</h3>
    <EwTable :headers="ewheaders" :rows="tanulok"></EwTable>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Route } from "vue-router";
import axios from "axios";
import EwTable from "@/components/table/EwTable.vue";
import EwTableHeaderModel from "@/components/table/model/EwTableHeaderModel";

@Component({
  components: { EwTable },
  beforeRouteEnter(to: Route, from: Route, next: Function): void {
    next();
  }
})
export default class TanuloValasztas extends Vue {
  private headers: any[] = [];
  private ewheaders: EwTableHeaderModel[] = [];
  private tanulok: any[] = [];

  constructor() {
    super();
    this.headers = [
      {
        text: "#TANULO_ID",
        value: "tanuloId",
        align: "start",
        sortable: false
      },
      { text: "Név", value: "tanuloNev" },
      { text: "Csoport", value: "csoportNev" },
      { text: "Csoport vezető", value: "csoportVezetoNev" },
      { text: "Actions", value: "actions", sortable: false }
    ];
    this.ewheaders = [
      {
        label: "#TANULO_ID",
        columnName: "tanuloId",
        searchField: {
          type: "number"
        },
        align: "start",
        sortable: false
      },
      {
        label: "Név",
        columnName: "tanuloNev",
        searchField: {
          type: "text"
        }
      },
      {
        label: "Csoport",
        columnName: "csoportNev",
        searchField: {
          type: "text"
        }
      },
      { label: "Csoport vezető", columnName: "csoportVezetoNev" ,
          searchField: {
              type: "text"
          }},
      {
        label: "Actions",
        columnName: "actions",
        sortable: false
      }
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

  mounted() {
    axios
      .get<Array<any>>("http://localhost:9999/ovi/tanulok")
      .then(response => {
        this.tanulok = response.data;
      });
  }
}
</script>

<style scoped></style>
