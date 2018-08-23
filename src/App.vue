<template>
    <div id="app" data-app>
        <router-view/>
    </div>
</template>

<script>
  export default {
    name: 'App',
    data () {
      return {
        bottomNav: 'recent'
      }
    }
  }
</script>

<style>


    @import url('../node_modules/vuetify/dist/vuetify.min.css');
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
    }
</style>
