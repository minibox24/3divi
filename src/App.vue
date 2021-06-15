<template>
  <div id="app">
    <Bar />
    <div class="view"></div>
  </div>
</template>

<script>
import Bar from "./components/Bar.vue";

export default {
  name: "App",
  components: {
    Bar,
  },
};
</script>

<style>
#app {
  overflow: hidden;
  height: 100vh;
}

.view {
  height: 100%;
}
</style>
