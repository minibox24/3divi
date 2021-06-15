<template>
  <div class="content">
    <Main @start="start" />
  </div>
</template>

<script>
import Main from "./components/Main.vue";

export default {
  components: { Main },
  methods: {
    start() {
      alert("start");
    },
  },
};
</script>


<style scoped>
.content {
  height: 100%;
  background: #333333;
  color: white;
}
</style>