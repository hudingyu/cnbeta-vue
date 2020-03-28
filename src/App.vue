<template>
  <div id="app">
      <keep-alive>
          <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
body {
  background: #f0f0f0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  position: relative;
  color: #2c3e50;
  max-width: 800px;
  background: #fff;
  margin: 0 auto;
  height: 100vh;
  /*margin-top: 60px;*/
}
</style>
