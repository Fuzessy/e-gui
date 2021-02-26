<template>
  <div class="menu">
    <div v-for="(menuElem, index) in menuStructure" :key="index">
      <div class="main_menu" @click="mainMenuElemClicked(menuElem.id)">
        <div>{{ menuElem.label }}</div>

        <div  class="main_menu_icon"
              :style="menuElem.submenuHidden === false ? 'display: none' : ''">
          <i class="fas fa-chevron-down"></i>
        </div>

        <div  class="main_menu_icon"
              :style="menuElem.submenuHidden === true ? 'display: none' : ''">
          <i class="fas fa-times"></i>
        </div>
      </div>
      <div class="subMenu" :class="menuElem.submenuHidden ? 'submenuHidden' : ''">
        <div
                v-for="(submenuElem, subindex) in menuElem.submenu"
                :key="subindex"
                :id="submenuElem.id"
                class="sub-menu-item"
        >
          <div @click="navigateTo(submenuElem)" class="submenu-item">{{ submenuElem.label }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Menu } from "./model/Menu";
import router from "@/router";
import axios from "axios";
import {ProcessCodePathResolver} from "@/router/ProcessCodePathResolver";

@Component
export default class SideBarMenu extends Vue {
  //    @Prop({default: () => []}) menuStructure! : Array<Menu>;

  private menuStructure: Array<Menu> = [];

  mounted() {
    this.menuStructure = [];
    axios.get<Array<Menu>>('http://localhost:9999/process')
      .then(response => {
          const menus = response.data;
          menus.forEach(menu => menu.submenuHidden = false);
          this.menuStructure = menus;
      })

  }

 private mainMenuElemClicked(menuId : number) : void {
     const menu = this.menuStructure.find( menu => menu.id === menuId)
     if(menu){
         if(menu.submenuHidden) {
             menu.submenuHidden = false;
         }else{
             menu.submenuHidden = true;
         }
     }
     this.$forceUpdate()
 }

 private navigateTo(menu : Menu) : void{
      if(router.currentRoute.fullPath !== menu.processCode) {
          const resolver : ProcessCodePathResolver = new ProcessCodePathResolver();
          const path = resolver.getNextPage(menu.processCode);
          router.push({path: path})
      }
  }
}
</script>

<style scoped lang="scss">
.menu {
  color: #3d556e;
  text-align: left;
  margin-left: 10px;
}

.main_menu {
  cursor: context-menu;
  font-weight: 600;
  display: flex;
  flex-flow: row;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: rgba(44, 62, 80, 0.1);
}

.main_menu div:nth-child(1){
  flex-grow: 1;
}

.main_menu:hover{
  color: #4e78ae;
  transition: color 0.1s;
}


.main_menu_icon{
  margin-right: 10px;
  margin-left: 10px;
}

.main-menu:hover {
  color: #05009c;
}

.transition-common {
  transition: height 1s, opacity 0.1s;
}

.submenuHidden{
  height: 0px;
  overflow: hidden;
  opacity: 0;
  @extend .transition-common;
}

  .subMenu{
    padding-left: 10px;
    cursor: context-menu;
  }

.sub-menu-item{
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: rgba(44, 62, 80, 0.1);
}

.sub-menu-item:hover{
   color: #4e78ae;
   transition: color 0.1s;
}

</style>
