<template>
  <div id="app">
    <Bar />
    <Content />
  </div>
</template>

<script>
import Bar from "./components/Bar.vue";
import Content from "./Content.vue";

export default {
  components: { Bar, Content },
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
  user-select: none;
}
</style>
