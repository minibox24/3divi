<template>
  <div class="bar">
    <span class="title">3DIVI</span>
    <div class="win-button win-min" @click="min">
      <svg width="12" height="12" viewBox="0 0 12 12">
        <rect fill="white" width="10" height="1" x="1" y="6"></rect>
      </svg>
    </div>
    <div class="win-button win-max" @click="max">
      <svg width="12" height="12" viewBox="0 0 12 12">
        <rect
          width="9"
          height="9"
          x="1.5"
          y="1.5"
          fill="none"
          stroke="white"
        ></rect>
      </svg>
    </div>
    <div class="win-button win-close" @click="close">
      <svg width="12" height="12" viewBox="0 0 12 12">
        <polygon
          fill="white"
          points="11 1.576 6.583 6 11 10.424 10.424 11 6 6.583 1.576 11 1 10.424 5.417 6 1 1.576 1.576 1 6 5.417 10.424 1"
        ></polygon>
      </svg>
    </div>
  </div>
</template>

<script>
import { remote } from "electron";

const currentWindow = remote.getCurrentWindow();

export default {
  methods: {
    close() {
      currentWindow.close();
    },
    min() {
      currentWindow.minimize();
    },
    max() {
      if (currentWindow.isMaximized()) currentWindow.unmaximize();
      else currentWindow.maximize();
    },
  },
};
</script>

<style scoped>
.bar {
  -webkit-app-region: drag;
  height: 28px;
  background: #3c3c3c;
  color: #72767d;
  display: flex;
  align-items: center;
}

.title {
  font-weight: bold;
  font-size: 0.9rem;
  margin-left: 0.5rem;
}

.win-button {
  -webkit-app-region: no-drag;
  width: 30px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.win-min {
  margin-left: auto;
}

.win-min:hover,
.win-max:hover {
  background: #282b2e;
}

.win-close:hover {
  background: #ed4245;
}
</style>
