<template>
  <div
    class="select"
    :class="isDragging ? 'drag' : ''"
    @dragover="dragging"
    @dragleave="dragleave"
    @drop="dropUpload"
  >
    <div v-if="isDragging" class="icon-warpper">
      <img class="icon" src="../assets/add.svg" />
    </div>
    <div v-if="isDragging" class="dragtip" />
    <span class="info">영상을 선택해주세요</span>
    <span>또는 이곳에 드래그하세요</span>
    <b-button class="mt-3" variant="primary" @click="choose">선택하기</b-button>
    <input
      type="file"
      id="file"
      ref="file"
      accept="video/*"
      @change="btnUpload"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      isDragging: false,
      file: null,
    };
  },
  methods: {
    choose() {
      this.$refs.file.click();
    },
    upload(file) {
      console.log(file);
      this.$emit("upload", file);
    },
    btnUpload(event) {
      const files = event.target.files;
      this.upload(files[0]);
    },
    dropUpload(event) {
      event.stopPropagation();
      event.preventDefault();
      this.isDragging = false;

      const files = event.dataTransfer.files;
      if (files.length < 1) return;
      if (!files[0].type.startsWith("video/")) return;

      this.upload(files[0]);
    },
    dragging(event) {
      event.stopPropagation();
      event.preventDefault();
      this.isDragging = true;
    },
    dragleave(event) {
      event.stopPropagation();
      event.preventDefault();

      this.isDragging = false;
    },
  },
};
</script>


<style scoped>
.select {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.drag * {
  pointer-events: none;
}

.icon-warpper {
  height: 100%;
  width: 100%;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
}

.icon {
  width: 10rem;
  -webkit-user-drag: none;
}

.dragtip {
  width: 100%;
  height: 100%;
  position: fixed;
  background: black;
  opacity: 70%;
}

.info {
  font-weight: bold;
  font-size: 2rem;
}

#file {
  display: none;
}
</style>