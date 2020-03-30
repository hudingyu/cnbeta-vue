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
@media (prefers-color-scheme: dark) {
  body {
    background: #444;
  }
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
  max-width: 800px;
  margin: 0 auto;
  min-height: 100vh;
  background: #fff;
  /*margin-top: 60px;*/
}

@media (prefers-color-scheme: dark) {
    #app {
        background: #333;
    }
}
</style>
