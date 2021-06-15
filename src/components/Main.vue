<template>
  <div class="main">
    <span class="info">쉬운 3분할 메이커</span>
    <b-button class="mt-2" variant="success" @click="start">시작하기</b-button>
  </div>
</template>

<script>
export default {
  methods: {
    start() {
      this.$emit("start");
    },
  },
};
</script>

<style scoped>
.main {
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
