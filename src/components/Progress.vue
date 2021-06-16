<template>
  <div class="progress-container">
    <span class="info">렌더링 중...</span>
    <b-progress class="w-50 mt-4" :max="200">
      <b-progress-bar :value="value" :label="`${(value / 2).toFixed(2)}%`" />
    </b-progress>
    <span class="mt-1">예상 소요 시간 {{ eta }}</span>
    <b-button v-if="false" class="mt-3" variant="danger" @click="stop"
      >취소</b-button
    >
  </div>
</template>

<script>
import { ipcRenderer } from "electron";

export default {
  props: ["file", "config"],
  data() {
    return {
      value: 0,
      eta: "",
    };
  },
  mounted() {
    console.log(this.file);

    ipcRenderer.on("progressCrop", (evt, payload) => {
      this.value = payload.percent;
      this.eta = new Date(payload.eta * 1000).toISOString().substr(11, 8);
    });

    ipcRenderer.on("progressMerge", (evt, payload) => {
      this.value = payload.percent + 100;
      this.eta = new Date(payload.eta * 1000).toISOString().substr(11, 8);
    });

    ipcRenderer.on("doneCrop", () => {
      this.value = 100;
    });

    ipcRenderer.on("doneMerge", () => {
      this.value = 200;
      this.eta = "00:00:00";
    });

    ipcRenderer.on("done", (evt, payload) => {
      this.$emit("complete", new Blob([payload], { type: "video/mp4" }));
    });

    const { path, width, height, x, y } = this.config;

    ipcRenderer.send("render", {
      inputPath: this.file.path,
      outputPath: path,
      width,
      height,
      x,
      y,
    });
  },
  methods: {
    stop() {
      ipcRenderer.send("kill");
      this.$emit("stop");
    },
  },
};
</script>

<style scoped>
.progress-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.info {
  font-weight: bold;
  font-size: 2rem;
}
</style>
