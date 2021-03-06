<template>
  <div class="table-container" ref="container">
    <table @blur="tableFocused()" ref="table">
      <thead ref="tableHeader">
        <tr v-if="hasSearchField()">
          <th class="filter"></th>
          <th v-for="(header, index) in headers" :key="index" class="filter">
            <div v-if="header.searchField">
              <div v-if="header.searchField.type === 'number'">
                <input
                  type="number"
                  @input="filterInputChanged()"
                  :placeholder="
                    isDefaultSzuro(header) ? 'default szűrő' : 'szűrő'
                  "
                  v-model="filters[header.columnName]"
                  v-bind:class="{ 'default-search': isDefaultSzuro(header) }"
                />
              </div>
              <div v-if="header.searchField.type === 'text'">
                <input
                  @input="filterInputChanged()"
                  :placeholder="
                    isDefaultSzuro(header) ? 'default szűrő' : 'szűrő'
                  "
                  v-model="filters[header.columnName]"
                  v-bind:class="{
                    'default-search': isDefaultSzuro(header)
                  }"
                />
              </div>
            </div>
          </th>
        </tr>
        <tr>
          <th class="label">#</th>
          <th v-for="(header, index) in headers" :key="index" class="label">
            {{ header.label }}
          </th>
        </tr>
      </thead>
      <tbody @keydown="keyPressed($event)">
        <tr
          v-for="(row, index) in rowsInnerModel"
          :key="index"
          :class="{ selectedRow: row.innerRowModel.selected }"
          tabindex="-1"
          @focusin="rowClicked(row, $event)"
          :ref="'row-' + index"
        >
          <td class="rowNumber">{{ index + 1 }}</td>
          <td v-for="(header, colIndex) in headers" :key="colIndex">
            <div v-html="row.innerRowModel[header['columnName']]"></div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import {Component, Emit, Prop, Vue, Watch} from "vue-property-decorator";
import FuzTableHeaderModel from "@/components/table/model/FuzTableHeaderModel";

@Component
export default class FuzTable extends Vue {
  @Prop({ required: true, default: [] }) headers!: FuzTableHeaderModel[];
  @Prop({ required: true, default: [] }) rows!: [];

  private filters: any[string] = [];
  private rowsInnerModel: {innerRowModel:any, originalModel: any}[] = []

  constructor() {
    super();
  }

  private hasSearchField(): boolean {
    return this.headers.find(h => h.searchField !== undefined) !== undefined;
  }
  @Watch("rows", { immediate: true }) onRowsChanged() {
    console.log("rows changed");
    this.rowsInnerModel = this.generateInnerModelFromRows(this.rows);
    this.$forceUpdate();
  }

  @Watch("headers", { immediate: true }) onHeadersChanged() {
    console.log("headers changed");
    this.filters = [];
    this.headers.forEach(h => {
      if (h.searchField) this.filters[h.columnName] = null;
    });
    this.filterInputChanged();
    this.$forceUpdate();
  }

  private filterInputChanged() {
    this.rowsInnerModel = this.generateInnerModelFromRows(this.rows);

    this.headers
      .filter(h => h.searchField)
      .forEach(h => {
        const serachFilterType = h.searchField?.type;
        const filterValue = this.filters[h.columnName];
        this.filterByColumnFilter(
          h.columnName,
          filterValue,
          serachFilterType as string
        );
      });

    this.$forceUpdate();
    this.rowSelected();
  }

  private filterByColumnFilter(
    columnName: string,
    filterValue: any,
    serachFilterType: string
  ) {
    if (filterValue !== null && filterValue.length > 0) {
      if (serachFilterType === "text") {
        this.textSearch(columnName, filterValue);
      }
      if (serachFilterType === "number") {
        this.numberSearch(columnName, filterValue);
      }
    }
  }

  private textSearch(columnName: string, filterValue: string) {
    this.rowsInnerModel = this.rowsInnerModel.filter(row =>
      this.filterFields(row.innerRowModel, columnName, filterValue)
    );
    this.rowsInnerModel.forEach(row => {
      row.innerRowModel[columnName] = row.innerRowModel[columnName].replace(
        new RegExp(filterValue.toUpperCase(), "gi"),
        (match: string) => {
          return (
            '<span style="color:red; background-color: #f3efe0">' +
            match +
            "</span>"
          );
        }
      );
    });
  }

  private filterFields(row: any, columnName: string, filterValue: string) {
    return (row[columnName] as string)
      .toUpperCase()
      .match(new RegExp(filterValue.toUpperCase(), "gi"));
  }

  private generateInnerModelFromRows(from: any[]): any[] {
    return from.map(row => {
      return {
          innerRowModel: JSON.parse(JSON.stringify(row)),
          originalModel: row
        };
    });
  }

  private numberSearch(columnName: string, filterValue: string) {
    this.rowsInnerModel = this.rowsInnerModel.filter(
      row => row.innerRowModel[columnName] == filterValue
    );
  }

  private rowClicked(row: any, event: any): void {
    this.rowsInnerModel.forEach(r => (r.innerRowModel.selected = false));
    row.innerRowModel.selected = true;
    event.target.focus();
    this.$forceUpdate();
    this.rowSelected();
  }

  private keyPressed(event: KeyboardEvent): void {
    console.log(event);
    event.preventDefault();
    if (event.key === "ArrowUp") {
      this.keyUpPressed();
    } else if (event.key === "ArrowDown") {
      this.keyDownPressed();
    } else {
      const regex = /^[A-Za-z]+$/;
      const isValid = regex.test(String.fromCharCode(event.keyCode));
      if (isValid) {
        const header = this.headers.find(h => h.searchField?.defaultSearch);
        if (header) {
          if (!this.filters[header.columnName]) {
            this.filters[header.columnName] = "";
          }
          this.filters[header.columnName] += event.key;
          (document.querySelector(
            ".default-search"
          ) as HTMLInputElement).focus();
          this.filterInputChanged();
        }
      }
    }
  }

  private keyUpPressed(): void {
    const selectedRow = this.rowsInnerModel.find(r => r.innerRowModel.selected);
    if (selectedRow) {
      let index = this.rowsInnerModel.indexOf(selectedRow);
      if (index >= 0) {
        if (index === 0) {
          index = this.rowsInnerModel.length - 1;
        } else {
          index--;
        }
        ((this.$refs["row-" + index] as Element[])[0] as HTMLElement).focus();
      }
      this.afterRowFocused(index);
    }
  }

  private keyDownPressed(): void {
    const selectedRow = this.rowsInnerModel.find(r => r.innerRowModel.selected);
    if(selectedRow){
      let index = this.rowsInnerModel.indexOf(selectedRow);
      if (index >= 0) {
        if (index === this.rowsInnerModel.length - 1) {
          index = 0;
        } else {
          index++;
        }
        console.log(index);
        ((this.$refs["row-" + index] as Element[])[0] as HTMLElement).focus();
      }
      this.afterRowFocused(index);
    }
  }

  private afterRowFocused(index: number): void {
    this.handleScroll(index);
    this.rowSelected();
  }

  @Emit()
  private rowSelected() : void {
    return this.rowsInnerModel.find(r => r.innerRowModel.selected)?.originalModel;
  }

  private handleScroll(index: number): void {
    if (index === 0) {
      (this.$refs["container"] as HTMLDivElement).scrollTop = 0;
    } else {
      const domRectContainer: DOMRect = (this.$refs[
        "container"
      ] as HTMLElement).getBoundingClientRect();
      const domRectHeader: DOMRect = (this.$refs[
        "tableHeader"
      ] as HTMLElement).getBoundingClientRect();
      const domRectRow: DOMRect = ((this.$refs[
        "row-" + index
      ] as Element[])[0] as HTMLElement).getBoundingClientRect();

      if (domRectContainer.top + domRectHeader.height > domRectRow.top) {
        const scrollTopPosition = (this.$refs["container"] as HTMLElement)
          .scrollTop;
        if (scrollTopPosition > 20) {
          (this.$refs["container"] as HTMLElement).scrollTop =
            scrollTopPosition - 20;
        }
      }
    }
  }

  private isDefaultSzuro(header: FuzTableHeaderModel): boolean {
    return header.searchField?.defaultSearch === true;
  }
}
</script>

<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@500&display=swap");

$tableRadius: 5px;

.table-container {
  display: flex;
  flex-flow: column;
  overflow: auto;
  height: 100%;
  width: 100%;
  background-blend-mode: color;
  background: repeating-linear-gradient(
    145deg,
    rgba(138, 138, 219, 0.05),
    rgba(62, 99, 182, 0.06) 10px,
    rgba(207, 207, 211, 0.05) 20px
  );
}

table {
  width: 100%;
  border-spacing: 0;
  border: 1px solid rgba(5, 0, 156, 0.45);
  border-radius: $tableRadius;
  font-family: "Inter", serif;
  cursor: default;
}

thead {
  th.filter {
    position: sticky;
    top: 0;
    background-color: white;

    input {
      width: 92%;
    }
  }

  th.label {
    position: sticky;
    top: 25px;
    background-color: white;
  }
}

tbody {
  font-size: 12px;
}

td,
th {
  border: 1px solid rgba(5, 0, 156, 0.15);
  padding: 2px;
}

tr:last-child > td:last-child {
  border-bottom-right-radius: $tableRadius;
}

tr:last-child > td:first-child {
  border-bottom-left-radius: $tableRadius;
}
tr:first-child > th:first-child {
  border-top-left-radius: $tableRadius;
}
tr:first-child > th:last-child {
  border-top-right-radius: $tableRadius;
}

tbody > tr:first-child > td {
  border-top: 2px solid rgba(5, 0, 156, 0.35);
}

/* kijelölés */
tbody > tr:nth-child(odd) {
  background-color: rgba(248, 245, 255, 1);
}

tbody > tr:nth-child(odd):hover {
  background-color: rgb(238, 235, 245, 1);
}

tbody > tr:nth-child(even) {
  background-color: rgba(228, 233, 255, 1);
}

tbody > tr:nth-child(even):hover {
  background-color: rgba(218, 223, 240, 1);
}

.selectedRow > td {
  background-color: rgb(161, 180, 244);
}

.default-search {
  background-color: rgba(213, 228, 243);
}
.rowNumber {
  color: #acabab;
  font-weight: bold;
}
</style>
