<template>
  <div class="content">
    <Main v-if="page === 0" @start="start" />
    <Select v-if="page === 1" />
  </div>
</template>

<script>
import Main from "./components/Main.vue";
import Select from "./components/Select.vue";

export default {
  components: { Main, Select },
  data() {
    return {
      page: 1,
    };
  },
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