<template>
  <div class="content">
    <Main v-if="page === 0" @start="start" />
    <Select v-if="page === 1" @upload="upload" />
    <Setting v-if="page === 2" @render="render" :file="file" />
  </div>
</template>

<script>
import Main from "./components/Main.vue";
import Select from "./components/Select.vue";
import Setting from "./components/Setting.vue";

export default {
  components: { Main, Select, Setting },
  data() {
    return {
      page: 0,
      file: null,
    };
  },
  methods: {
    start() {
      this.page = 1;
    },
    upload(file) {
      this.file = file;
      this.page = 2;
    },
    render(config) {
      console.log(config);
      this.page = 3;
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