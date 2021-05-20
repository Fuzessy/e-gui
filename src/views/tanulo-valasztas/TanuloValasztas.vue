<template>
  <div class="folyamat-frame">
    <div class="folyamat-header">
      folyamat-header
    </div>

    <div class="folyamat-center">
      <div class="folyamat-main">
        <div class="folyamat-tablazat">
          <FuzTable
              :headers="headers"
              :rows="tanulok"
              @row-selected="rowSelected"
          />
        </div>
        <div class="folyamat-details">
          <div
            class="testMe"
            style="
                text-align: left;
                padding-left: 10px;
                padding-top: 10px;
                    "
          >
            Részletek
          </div>
          <div style="display: flex; flex-direction: row; width:100%">
            <div style="flex-grow: 1">
              <fuz-input v-model="inputModel"></fuz-input>
            </div>
            <div style="flex-grow: 1">
              <fuz-input v-model="inputModel"
                         :label="inputModel"
                          disabled
              ></fuz-input>
            </div>
          </div>
          <div>
            <fuz-input></fuz-input>
          </div>
          <div>{{selectedRow}}</div>
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
import FuzTable from "@/components/table/FuzTable.vue";
import FuzTableHeaderModel from "@/components/table/model/FuzTableHeaderModel";
import FuzInput from "@/components/form/FuzInput.vue";

@Component({
  components: { FuzInput, FuzTable },
  beforeRouteEnter(to: Route, from: Route, next: Function): void {
    next();
  }
})
export default class TanuloValasztas extends Vue {
  private headers: FuzTableHeaderModel[] = [];
  private tanulok: any[] = [];
  private selectedRow: any = null

  private inputModel = "hy";

  constructor() {
    super();
    this.headers = [
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
  }

  private rowSelected(row: any) : void {
    this.selectedRow = row;
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
.testMe {
  color: $myprimary;
}

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

  .folyamat-tablazat {
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
