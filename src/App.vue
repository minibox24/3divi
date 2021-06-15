<template>
  <div id="app">
    <Bar />
    <div class="view">
      <span style="font-size: 2rem; font-weight: 700">안녕하세요 세상</span>
    </div>
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
@font-face {
  font-family: "Noto Sans KR";
  font-weight: 400;
  src: url("./assets/NotoSansKR-Regular.otf");
}

@font-face {
  font-family: "Noto Sans KR";
  font-weight: 700;
  src: url("./assets/NotoSansKR-Bold.otf");
}

#app {
  font-family: "Noto Sans KR", sans-serif;
  overflow: hidden;
  height: 100vh;
}

.view {
  height: 100%;
  background: #333333;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
