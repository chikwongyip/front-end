<template>
  <div id="app">

    <router-link to="/login">login</router-link>
    <router-link to="/admin">admin</router-link>
    <router-view></router-view>
  </div>
</template>

<script>


export default {
  name: 'App'
  // components: {
  //   HelloWorld
  // }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
