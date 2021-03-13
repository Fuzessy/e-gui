<template>
  <div class="table-container">
    <table @blur="tableFocused()">
      <thead>
        <tr v-if="hasSearchField()">
          <th v-for="(header, index) in headers" :key="index">
            <div v-if="header.searchField">
              <div v-if="header.searchField.type === 'number'">
                <input
                  type="number"
                  @input="filterInputChanged()"
                  placeholder="szűrő"
                  v-model="filters[header.columnName]"
                />
              </div>
              <div v-if="header.searchField.type === 'text'">
                <input
                  @input="filterInputChanged()"
                  placeholder="szűrő"
                  v-model="filters[header.columnName]"
                />
              </div>
            </div>
          </th>
        </tr>
        <tr>
          <th v-for="(header, index) in headers" :key="index">
            {{ header.label }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in rowsInnerModel" :key="index"
            @click="rowClicked(row)"
            :class="{ 'selectedRow': row.selected }"
        >
          <td v-for="(header, colIndex) in headers" :key="colIndex">
            <div v-html="row[header['columnName']]"></div>
          </td>
        </tr>
      </tbody>
    </table>
    {{JSON.stringify(this.rowsInnerModel)}}
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import EwTableHeaderModel from "@/components/table/model/EwTableHeaderModel";

@Component
export default class EwTable extends Vue {
  @Prop({ required: true, default: [] }) headers!: EwTableHeaderModel[];
  @Prop({ required: true, default: [] }) rows!: [];

  private filters: any[string] = [];
  private rowsInnerModel!: any[];

  constructor(){
      super();
      window.addEventListener('keyup', this.keyPressed)
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
      this.filterFields(row, columnName, filterValue)
    );
    this.rowsInnerModel.forEach(row => {
      row[columnName] = row[columnName].replace(
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
    return JSON.parse(JSON.stringify(from));
  }

  private numberSearch(columnName: string, filterValue: string) {
    this.rowsInnerModel = this.rowsInnerModel.filter(
      row => row[columnName] == filterValue
    );
  }

  private rowClicked(row: any) : void {
      this.rowsInnerModel.forEach(r => r.selected = false);
      row.selected = true;
      this.$forceUpdate();
  }



  private keyPressed(event: any) : void{
      //alert('jkjnk')
  }
  private keyUpPressed(row: any) : void{
      console.log("UP")
      let index = this.rowsInnerModel.indexOf(row);
      if(index === 0){
          index = this.rowsInnerModel.length - 1;
      }else{
          index--;
      }
      this.rowsInnerModel[index].selected = true;
  }

    private keyDownPressed(row: any) : void{
        console.log("UP")
        let index = this.rowsInnerModel.indexOf(row);
        if(index === 0){
            index = this.rowsInnerModel.length - 1;
        }else{
            index--;
        }
        this.rowsInnerModel[index].selected = true;
    }

    private tableFocused() : void{
      //alert("focused")
    }
}
</script>

<style scoped lang="scss">
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@500&display=swap');

$tableRadius: 5px;

.table-container {
  display: flex;
  align-items: center;
  flex-flow: column;
}

table {
  border-spacing: 0;
  border: 1px solid rgba(5, 0, 156, 0.45);
  border-radius: $tableRadius;
  font-family: 'Inter', serif;
  cursor: default;
}

tbody{
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
  tbody > tr:nth-child(odd){
    background-color: rgba(248, 245, 255, 1);
  }

  tbody > tr:nth-child(odd):hover{
    background-color: rgb(238, 235, 245, 1);
  }

  tbody > tr:nth-child(even){
    background-color: rgba(228, 233, 255, 1);
  }

  tbody > tr:nth-child(even):hover{
    background-color: rgba(218, 223, 240, 1);
  }

  .selectedRow > td {
    background-color: rgb(161, 180, 244);
  }


  *:focus {
    color:red;
    font-size: 20px;
  }
</style>
