<template>
  <div class="app">
    <header class="page-header">
      <span class="cur-img">当前：{{ curImgName }}</span>
      <el-button-group>
        <el-button @click="switchImg">
          <el-icon class="el-icon--left">
            <Switch></Switch>
          </el-icon>
          切换(S)
        </el-button>
        <el-button @click="switchFullscreen">
          <el-icon class="el-icon--left">
            <full-screen></full-screen>
          </el-icon>
          全屏(F)
        </el-button>
        <el-button @click="reset">
          <el-icon class="el-icon--left">
            <refresh></refresh>
          </el-icon>
          重置(R)
        </el-button>
        <el-button @click="toggle">
          <el-icon>
            <unlock v-if="enableUpload"></unlock>
            <lock v-else></lock>
          </el-icon>
          上传已{{ text }}(L)
        </el-button>
        <el-popover trigger="click" :width="300" :hide-after="0">
          <template #reference>
            <el-button>
              <el-icon class="el-icon--left">
                <question-filled></question-filled>
              </el-icon>
              帮助
            </el-button>
          </template>
          <template #default>
            <help-doc></help-doc>
          </template>
        </el-popover>
      </el-button-group>
    </header>
    <main
      ref="mainArea"
      class="page-main"
      :style="sizeStyleObj"
      @fullscreenchange="handleFullscreenchange"
    >
      <upload-img
        ref="uploadImg1"
        class="upload-img1"
        :style="{width: dec2per(position)}"
        :enable-upload="enableUpload"
        @upload="handleUpload1"
      ></upload-img>
      <upload-img
        ref="uploadImg2"
        class="upload-img2"
        :enable-upload="enableUpload"
        @upload="handleUpload2"
      ></upload-img>
      <movable-divider
        v-model:position="position"
        :container-width="targetWidth"
      ></movable-divider>
    </main>
  </div>
</template>

<script lang="ts">
const DEFAULT_SIZE = {
  width: screen.width,
  height: screen.height
}
const OFFSET_X = 128
const OFFSET_Y = 128

const DEFAULT_POSITION = 0.5
</script>

<script setup lang="ts">
import { computed, reactive, ref, toRef } from 'vue'
import { FullScreen, Refresh, Switch, QuestionFilled, Lock, Unlock } from '@element-plus/icons-vue'
import useViewportContain from '@/composables/useViewportContain'
import MovableDivider from '@/components/MovableDivider.vue'
import useToggleText from '@/composables/useToggleText'
import HelpDoc from '@/components/HelpDoc.vue'
import UploadImg from '@/components/UploadImg.vue'
import { Size } from '@/common/types'
import useLastSize from '@/composables/useLastSize'
import { dec2per } from '@/utils/MathUtils'

const viewportOffsetX = ref(OFFSET_X)
const viewportOffsetY = ref(OFFSET_Y)

const size1 = reactive({ ...DEFAULT_SIZE })
const size2 = reactive({ ...DEFAULT_SIZE })
const handleUpload1 = (size: Size) => void Object.assign(size1, size)
const handleUpload2 = (size: Size) => void Object.assign(size2, size)

const lastSize = useLastSize(size1, size2)
const {
  width: targetWidth,
  height: targetHeight
} = useViewportContain(
  toRef(lastSize, 'width'),
  toRef(lastSize, 'height'),
  viewportOffsetX,
  viewportOffsetY
)
const sizeStyleObj = computed(() => ({
  width: targetWidth.value + 'px',
  height: targetHeight.value + 'px'
}))

const position = ref(DEFAULT_POSITION)

// 切换
let img1 = true
const switchImg = () => {
  img1 = !img1
  position.value = Number(img1)
}
const curImgName = computed(() => {
  switch (position.value) {
    case 0:
      return '图片2'
    case 1:
      return '图片1'
    default:
      return '比较'
  }
})

// 全屏
const handleFullscreenchange = () => {
  if (document.fullscreenElement) {
    viewportOffsetX.value = 0
    viewportOffsetY.value = 0
  } else {
    viewportOffsetX.value = OFFSET_X
    viewportOffsetY.value = OFFSET_Y
  }
}
const mainArea = ref<HTMLElement | null>(null)
const switchFullscreen = () => {
  document.fullscreenElement
    ? document.exitFullscreen()
    : mainArea.value?.requestFullscreen()
}

// 重置
const uploadImg1 = ref<InstanceType<typeof UploadImg> | null>(null)
const uploadImg2 = ref<InstanceType<typeof UploadImg> | null>(null)
const reset = () => {
  uploadImg1.value?.clear()
  uploadImg2.value?.clear()
  Object.assign(size1, { ...DEFAULT_SIZE })
  Object.assign(size2, { ...DEFAULT_SIZE })
  position.value = DEFAULT_POSITION
}

// 启用/禁用上传
const {
  bool: enableUpload,
  text,
  toggle
} = useToggleText('启用', '禁用', true)

// 快捷键
document.addEventListener('keypress', ({ key }) => {
  switch (key) {
    case 's':
      switchImg()
      break
    case 'f':
      switchFullscreen()
      break
    case 'r':
      reset()
      break
    case 'l':
      toggle()
      break
  }
})
</script>

<style scoped lang="less">
.page-header {
  margin-inline: auto 32px;
  padding-block: 20px;
  max-width: 100%;
  width: 1280px;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  .cur-img {
    margin-right: 2em;
    color: #333;
  }
}

.page-main {
  position: relative;
  margin: 0 auto;
  display: flex;
}

.upload-img1:deep(img) {
  object-position: 0 0;
}

.upload-img2 {
  flex: 1;

  :deep(img) {
    object-position: 100% 100%;
  }
}

.movable-divider {
  background-clip: content-box;
  background-color: #2ea9df;
}
</style>
