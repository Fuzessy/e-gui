<template>
  <div class="folyamat-frame">

    <div class="folyamat-header">
      folyamat-header <br/>adasd<br/>adasd<br/>adasd<br/>adasd<br/>adasd<br/>adasd<br/>adasd<br/>adasd<br/>adasd<br/>adasd
    </div>

    <div class="folyamat-center">
      <div class="folyamat-main">
        <div class="folyamat-tablazat">
          <EwTable :headers="ewheaders" :rows="tanulok"></EwTable>
        </div>
        <div class="folyamat-details">
          <div style="
                text-align: left;
                padding-left: 10px;
                padding-top: 10px;
                    ">
            Részletek
          </div>
          <div>
<!--            <div style="-->
<!--              height: 80px;-->
<!--              width: 80px;-->
<!--              text-align: center;-->
<!--              background-color: #7cb3e3;-->
<!--              clip-path: polygon(0% 20%, 60% 20%, 60% 0%, 100% 50%, 60% 100%, 60% 80%, 0% 80%);"-->
<!--            >-->
<!--             <p>Részletek</p>-->
<!--            </div>-->
ú
          </div>
        </div>
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
          type: "text",
          defaultSearch: true
        }
      },
      {
        label: "Csoport",
        columnName: "csoportNev",
        searchField: {
          type: "text"
        }
      },
      {
        label: "Csoport vezető",
        columnName: "csoportVezetoNev",
        searchField: {
          type: "text"
        }
      },
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

<style scoped lang="scss">
.folyamat-frame {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.folyamat-header {
  background-color: lightblue;
}

.folyamat-center {
  display: flex;
  flex-grow: 1;
}

.folyamat-footer {
  background-color: chocolate;
  height: 30px;
}

.folyamat-main {
  flex-grow: 1;
  display: flex;
  flex-direction: column;

  .folyamat-tablazat{
    height: 200px;
  }

  .folyamat-details {
    background-color: rgba(158, 188, 243, 0.25);
    height: 100%;
  }
}

.folyamat-buttons {
  background-color: #4e78ae;
  min-width: 150px;
}
</style>
