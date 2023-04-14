<template>
  <div class="image-uploader">
    <label class="image-uploader__preview" :class="{'image-uploader__preview-loading': loading}" :style="background"
           @click="remove">
      <span v-if="haveFile" class="image-uploader__text">Удалить изображение</span>
      <span v-else class="image-uploader__text">Загрузить изображение</span>
      <span v-if="loading" class="image-uploader__text">Загрузка...</span>
      <input ref="inputFile" v-bind="$attrs" type="file" accept="image/*" class="image-uploader__input"
             @change="onChange"/>
    </label>
  </div>
</template>

<script>

export default {
  name: 'UiImageUploader',
  inheritAttrs: false,
  props: {
    preview: {
      type: String,
    },
    uploader: {
      type: Function,
    },
  },
  data() {
    return {
      loading: false,
      haveFile: !!this.preview,
      localPreview: this.preview,
    };
  },
  emits: ['select', 'upload', 'error', 'remove'],
  computed: {
    background() {
      return this.localPreview ? `--bg-url: url(${this.localPreview})` : ''
    }
  },
  methods: {
    async onChange(event) {
      this.$emit('select', event.target.files[0])
      this.localPreview = URL.createObjectURL(event.target.files[0])
      this.haveFile = true
      if (this.uploader) {
        this.loading = true
        try {
          let response = await this.uploader(event.target.files[0])
          this.$emit('upload', response)
        } catch (error) {
          event.target.value = ''
          this.haveFile = false
          this.localPreview = undefined
          this.$emit('error', error)
        }
        this.loading = false
      }
    },
    remove(event) {
      if (this.haveFile && !this.loading) {
        event.preventDefault()
        this.$refs.inputFile.value = ''
        this.haveFile = false
        this.localPreview = undefined
        this.$emit('remove')
      }
    }
  }
};
</script>

<style scoped>
.image-uploader {
}

.image-uploader__input {
  opacity: 0;
  height: 0;
}

.image-uploader__preview {
  --bg-url: var(--default-cover);
  background-size: cover;
  background-position: center;
  background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), var(--bg-url);
  border: 2px solid var(--blue-light);
  border-radius: 8px;
  transition: 0.2s border-color;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 512px;
  height: 228px;
}

.image-uploader__text {
  color: var(--white);
  font-family: 'Nunito', sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
}

.image-uploader__preview:hover {
  border-color: var(--blue);
}

.image-uploader__preview.image-uploader__preview-loading {
  cursor: no-drop;
}
</style>
