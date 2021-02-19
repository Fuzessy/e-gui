<template>
    <div id="app">

        <div>
            <div id="sidebar">
                side menu
            </div>
            <div id="header">
                he
            </div>
            <div id="main">
                <div id="content">
                    <router-link to="/">Home</router-link>
                    <router-link to="/about">About</router-link>
                    <router-view/>
                </div>
            </div>
        </div>


    </div>
</template>

<style lang="scss">

    #header{
        position: fixed;
        margin-left: 220px;
        width: calc(100% - 220px);
        background: #42b983;
    }

    #main{
        display: flex;
        flex-direction: column;
        margin-left: 220px;
    }

    #sidebar{
        background: blue;
        position: fixed;
        width:220px;
        height: 100%;

    }

    #content{
        background: red;
        flex-grow: 1;
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
<script lang="js">

</script>
