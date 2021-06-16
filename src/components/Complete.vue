<template>
  <div class="complete">
    <span class="info">완성!</span>
    <video class="preview mt-1" ref="video" controls />
    <div>
      <b-button class="act-btn" variant="success">저장하기</b-button>
      <b-button class="act-btn" variant="danger">새로 만들기</b-button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["blob"],
  mounted() {
    this.$refs.video.src = URL.createObjectURL(this.blob);
  },
};
</script>

<style scoped>
.complete {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.info {
  font-weight: bold;
  font-size: 2rem;
  margin-top: -2rem;
}

.preview {
  background: black;
  width: 640px;
  height: 360px;
}

.act-btn {
  margin: 0.5rem;
}
</style>
