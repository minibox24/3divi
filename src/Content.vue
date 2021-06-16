<template>
  <div class="content">
    <Main v-if="page === 0" @start="start" />
    <Select v-if="page === 1" @upload="upload" />
    <Setting v-if="page === 2" @render="render" @back="start" :file="file" />
    <Progress
      v-if="page === 3"
      @complate="complate"
      :file="file"
      :config="config"
    />
  </div>
</template>

<script>
import Main from "./components/Main.vue";
import Select from "./components/Select.vue";
import Setting from "./components/Setting.vue";
import Progress from "./components/Progress.vue";

export default {
  components: { Main, Select, Setting, Progress },
  data() {
    return {
      page: 0,
      file: null,
      config: null,
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
      this.config = config;
      this.page = 3;
    },
    complate() {
      alert("end");
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
