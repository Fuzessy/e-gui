<template>
  <folyamat>
    <template v-slot:folyamat-main>
      <div class="folyamat-tablazat" ref="folyamat-tablazat">
        <FuzTable
          :headers="headers"
          :rows="tanulok"
          @row-selected="rowSelected"
        />
      </div>
      <div class="splitter" @mousedown="splitterMouseDown">
        <i class="fas fa-grip-lines"></i>
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
          <div>
            <div>Részletek</div>
            <div
              style="
                border-bottom: 1px solid rgba(128,138,255,0.27);
                filter: blur(2px);
              "
            ></div>
          </div>
        </div>
        <template v-if="selectedRow">
          <div style="display: flex; flex-direction: row; width:100%">
            <div style="flex-grow: 1">
              <fuz-input
                label="Tanuló azonosító"
                disabled
                v-model="selectedRow.tanuloId"
              />
            </div>
            <div style="flex-grow: 1">
              <fuz-input
                label="Tanuló neve"
                disabled
                v-model="selectedRow.tanuloNev"
              />
            </div>
          </div>
          <div style="display: flex">
            <div style="flex-grow: 1">
              <fuz-input
                label="Csoport neve"
                disabled
                v-model="selectedRow.csoportNev"
              />
            </div>
            <div style="flex-grow: 1">
              <fuz-input
                label="Csoport vezető"
                disabled
                v-model="selectedRow.csoportVezetoNev"
              />
            </div>
          </div>
        </template>
        <template v-else>
          <p style="font-size: 36px">
            <i class="far fa-times-circle"></i>
          </p>
          <p>Nincs kijelölt sor.</p>
        </template>
      </div>
    </template>
  </folyamat>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Route } from "vue-router";
import axios from "axios";
import FuzTable from "@/components/table/FuzTable.vue";
import FuzTableHeaderModel from "@/components/table/model/FuzTableHeaderModel";
import FuzInput from "@/components/form/FuzInput.vue";
import Folyamat from "@/components/folyamat/Folyamat.vue";

@Component({
  components: { Folyamat, FuzInput, FuzTable },
  beforeRouteEnter(to: Route, from: Route, next: Function): void {
    next();
  }
})
export default class TanuloValasztas extends Vue {
  private headers: FuzTableHeaderModel[] = [];
  private tanulok: any[] = [];
  private selectedRow: any = null;

  private splitterStatus = "DEFAULT";
  private starterHeight = 0;
  private downY = 0;

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

  private rowSelected(row: any): void {
    this.selectedRow = row;
  }

  mounted() {
    axios
      .get<Array<any>>("http://localhost:9999/ovi/tanulok")
      .then(response => {
        this.tanulok = response.data;
      });
  }

  private splitterMouseDown(event: MouseEvent): void {
    console.log("DOWN- " + event.x + " " + event.y);
    this.downY = event.y;
    this.splitterStatus = "DOWN";
    this.starterHeight = (this.$refs[
      "folyamat-tablazat"
    ] as HTMLDivElement).getBoundingClientRect().height;
    document.addEventListener("mousemove", this.splitterMouseMove);
    document.addEventListener("mouseup", this.splitterMouseUp);
  }

  private splitterMouseMove(event: MouseEvent): void {
    if (this.splitterStatus === "DOWN") {
      const tablazatDiv = this.$refs["folyamat-tablazat"] as HTMLDivElement;
      const n = event.y - this.downY;
      console.log(n + " - " + this.starterHeight);
      console.log(`${this.starterHeight + n}px`);
      tablazatDiv.style.height = `${this.starterHeight + n}px`;
    }

    //tablazatDiv.style.height = `$(tablazatDiv.getBoundingClientRect().height + n)px`;
  }

  private splitterMouseUp(event: MouseEvent): void {
    console.log("UP  - " + event.x + " " + event.y);
    this.splitterStatus = "NO";
  }
}
</script>

<style scoped lang="scss">
.testMe {
  color: $myprimary;
}

.folyamat-tablazat {
  height: 200px;
}

.folyamat-details {
  background-color: rgba(209, 210, 255, 0.23);
  height: 100%;
}

.splitter {
  cursor: n-resize;
  background-color: rgba(209, 210, 255, 0.23);
  color: $myprimary;
  height: 10px;
  margin-top: -3px;
}
</style>
