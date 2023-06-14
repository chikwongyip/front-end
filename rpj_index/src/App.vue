<template>
  <div id="app">
    <MallHeader> </MallHeader>
  </div>
</template>

<script>
import MallHeader from "./components/MallHeader"
export default {
  name: 'App',
  components: {
    MallHeader
  }
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
