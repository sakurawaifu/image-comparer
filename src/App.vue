<template>
  <div>
    <header>
      <el-switch
        v-model="img1"
        inline-prompt
        active-text="1"
        inactive-text="2"
      ></el-switch>
    </header>
    <main :style="sizeStyleObj">
      <div class="img-container img-container1" :style="{width: dec2per(position)}">
        <el-upload
          drag
          class="upload upload1"
          :show-file-list="false"
          :before-upload="beforeUpload1"
        >
          <el-icon>
            <plus></plus>
          </el-icon>
        </el-upload>
        <img class="uploaded-img uploaded-img1" v-if="urlRef1" :src="urlRef1" alt="img1">
      </div>
      <div class="img-container img-container2">
        <el-upload
          drag
          class="upload upload2"
          :show-file-list="false"
          :before-upload="beforeUpload2"
        >
          <el-icon>
            <plus></plus>
          </el-icon>
        </el-upload>
        <img class="uploaded-img uploaded-img2" v-if="urlRef2" :src="urlRef2" alt="img2">
      </div>
      <movable-divider
        :position="position"
        :container-width="width"
        @move="handleMove"
      ></movable-divider>
    </main>
  </div>
</template>

<script lang="ts">
const DEFAULT_WIDTH = 1280
const DEFAULT_HEIGHT = 720
</script>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import getImgSize from './utils/getImgSize.js'
import useBlobUrl from '@/composables/useBlobUrl'
import useViewportContain from '@/composables/useViewportContain'
import MovableDivider from '@/components/MovableDivider.vue'
import { dec2per } from '@/utils/MathUtils'

const imgWidth = ref(DEFAULT_WIDTH)
const imgHeight = ref(DEFAULT_HEIGHT)
const {
  width,
  height
} = useViewportContain(imgWidth, imgHeight, 64, 64)
const sizeStyleObj = computed(() => ({
  width: width.value + 'px',
  height: height.value + 'px'
}))

const {
  urlRef: urlRef1,
  setUrl: setUrl1
} = useBlobUrl()
const beforeUpload1 = (file: File) => {
  setUrl1(file)
  getImgSize(urlRef1.value)
    .then(({ width, height }) => {
      imgWidth.value = width
      imgHeight.value = height
    })
  return false
}

const {
  urlRef: urlRef2,
  setUrl: setUrl2
} = useBlobUrl()
const beforeUpload2 = (file: File) => {
  setUrl2(file)
  return false
}

const position = ref(0.5)
const handleMove = (v: number) => position.value = v

const img1 = ref(true)
watch(img1, nv => position.value = Number(nv))
</script>

<style scoped lang="less">
main {
  position: relative;
  margin: 0 auto;
  display: flex;
}

.img-container {
  position: relative;
  min-width: 0;

  &.img-container2 {
    flex: 1;
  }
}

.img-container > .upload,
.img-container > .uploaded-img {
  position: absolute;
  width: 100%;
  height: 100%;
}

.upload:deep(.el-upload) {
  height: 100%;
}

.upload:deep(.el-upload-dragger) {
  padding: 0;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.uploaded-img {
  user-select: none;
  pointer-events: none;
  object-fit: cover;

  &.uploaded-img1 {
    object-position: 0 0;
  }

  &.uploaded-img2 {
    object-position: 100% 100%;
  }
}
</style>

