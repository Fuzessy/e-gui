<template>
  <div id="app">
    <div>
      <div id="sidebar" ref="sidebar" :class="sideBarClass">
        <div id="sidebar-header">
          <div class="sidebarlogo">
            E-WEB LOGO
          </div>
          <div class="sidebar-close" :class="sideBarVisible ? 'menuIconHide' : 'menuIconVisible'" @click="hideMenu()">
            <i class="fas fa-arrow-left"></i>
          </div>
        </div>
      </div>

        <div id="header" :class="headerAndContentClass">
          <div id="sidebar-open" class="menuIconClass" :class="!sideBarVisible ? 'menuIconHide' : 'menuIconVisible'" @click="openMenu()">
            <i class="fas fa-bars"></i>
          </div>
          <div style="display: flex; flex-grow: 1;justify-content: center">
            <div>E-WEB</div>
          </div>
          <div style="display: flex; margin-right: 10px; margin-left: 10px">
            <div>Füzesi Zsolt</div>
          </div>
        </div>

        <div id="main" :class="headerAndContentClass">
          <div id="content">
            <router-link to="/">Home</router-link>
            <router-link to="/about">About</router-link>
            <router-view />
          </div>
        </div>
    </div>
  </div>
</template>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@1,700&display=swap");

$side-width: 220px;
$side-and-header-color-bg: #eff2f3;
$side-header-color: #3d556e;
$header-height: 42px;

.header-font-comon {
  font-family: "Roboto", sans-serif;
  color: $side-header-color;
}

.header-common {
  @extend .header-font-comon;
  border-bottom: 1px;
  border-bottom-color: rgba(219, 213, 213, 0.99);
  box-shadow: 1px 1px 5px rgba(197, 189, 189, 0.99);
  border-bottom-style: solid;
  height: $header-height;
}

.sidebarlogo {
  flex-grow: 1;
}

.sidebar-close {
  margin-right: 10px;
  color: $side-header-color;
  cursor: pointer;
}

#sidebar-header {
  @extend .header-common;
  border-bottom: 0px;
  box-shadow: 0px 0px 0px rgba(197, 189, 189, 0.99);
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
}

.transition-common{
  transition: margin 1s, width 1s, opacity 1.5s;
}

.headerWhenSidebarClosed {
  @extend .transition-common;
  margin-left: 0 !important;
  width: 100%;
}

.headerWhenSidebarOpened {
  @extend .transition-common;
  margin-left: $side-width;
  width: calc(100% - #{$side-width});
}

.sidebarClosed {
  @extend .transition-common;
  margin-left: calc(-1 * #{$side-width}) !important;
  overflow: hidden;
  opacity: 0;
}

.sidebarOpened {
  @extend .transition-common;
}

.menuIconHide{
  @extend .transition-common;
  opacity: 10%;
  cursor: inherit !important;
}

.menuIconVisible{
  @extend .transition-common;
  opacity: 100%;
}

#header {
  @extend .header-common;
  position: fixed;
  background: $side-and-header-color-bg;
  display: flex;
  flex-direction: row;
  align-items: center;
}

#sidebar-open {
  color: $side-header-color;
  margin-left: 10px;
  margin-right: 10px;
  font-size: 22px;
  cursor: pointer;
}

#main {
  display: flex;
  flex-direction: column;
}

#sidebar {
  background: $side-and-header-color-bg;
  position: fixed;
  width: 220px;
  height: 100%;
  border-right-width: 2px;
  border-right-color: #dddddd;
  border-right-style: solid;
  box-shadow: 1px 1px 5px rgba(197, 189, 189, 0.99);
  z-index: 1;
}

#content {
  background: #e9e9e9;
  flex-grow: 1;
  margin-top:$header-height;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: block;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {}
})
export default class App extends Vue {
  public sideBarClass = "sidebarOpened";
  public headerAndContentClass = "headerWhenSidebarOpened";
  public sideBarVisible = true;

  public hideMenu(): void {
    this.sideBarClass = "sidebarClosed";
    this.headerAndContentClass = "headerWhenSidebarClosed";
    this.sideBarVisible = true;
  }

  public openMenu(): void {
    this.sideBarClass = "sidebarOpened";
    this.headerAndContentClass = "headerWhenSidebarOpened";
    this.sideBarVisible = false;
  }
}
</script>
