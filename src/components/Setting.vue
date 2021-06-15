<template>
  <div class="setting">
    <video class="preview" ref="video" controls @loadedmetadata="meta" />
    <div class="control">
      <div>
        <b-input-group class="input" prepend="넓이">
          <b-form-input type="number" :value="width" />
        </b-input-group>
        <b-input-group class="input" prepend="높이">
          <b-form-input type="number" :value="height" />
        </b-input-group>
      </div>
      <div>
        <b-input-group class="input" prepend="X">
          <b-form-input type="number" :value="x" />
        </b-input-group>
        <b-input-group class="input" prepend="Y">
          <b-form-input type="number" :value="y" />
        </b-input-group>
      </div>
      <b-button class="create" variant="success" @click="render">제작</b-button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["file"],
  data() {
    return {
      width: 0,
      height: 0,
      x: 0,
      y: 0,
    };
  },
  methods: {
    meta() {
      const video = this.$refs.video;
      const width = video.videoWidth;
      const height = video.videoHeight;

      this.width = Math.round(width / 3);
      this.height = height;
      this.x = Math.round(width / 3);
      this.y = 0;
    },
    render() {
      this.$emit("render", {
        width: this.width,
        height: this.height,
        x: this.x,
        y: this.y,
      });
    },
  },
  mounted() {
    this.$refs.video.src = URL.createObjectURL(this.file);
  },
};
</script>


<style scoped>
.setting {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.preview {
  background: black;
  width: 640px;
  height: 360px;
}

.control {
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
}

.input {
  width: 10rem;
  margin: 0.5rem;
}

.create {
  margin-left: 0.5rem;
  height: 38px;
  width: 100px;
}
</style>