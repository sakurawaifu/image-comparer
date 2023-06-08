<template>
  <div class="upload-img">
    <el-upload
      v-if="props.enableUpload"
      drag
      class="upload"
      :show-file-list="false"
      :before-upload="beforeUpload"
    >
      <el-icon>
        <upload-filled></upload-filled>
      </el-icon>
      <span class="description">点击或拖拽上传图片</span>
    </el-upload>
    <img v-if="urlRef" :src="urlRef" alt="img">
  </div>
</template>

<script setup lang="ts">
import { UploadFilled } from '@element-plus/icons-vue'
import useBlobUrl from '@/composables/useBlobUrl'
import getImgSize from '@/utils/getImgSize'
import { Size } from '@/common/types'

const props = withDefaults(defineProps<{
  enableUpload: boolean
}>(), {
  enableUpload: true
})
const emit = defineEmits<{
  (e: 'upload', v: Size): void
}>()

const {
  urlRef,
  setUrl
} = useBlobUrl()

const beforeUpload = (file: File) => {
  setUrl(file)
  getImgSize(urlRef.value)
    .then(size => emit('upload', size))
  return false
}

const clear = () => setUrl('')

defineExpose({
  clear
})
</script>

<style scoped lang="less">
.upload-img {
  position: relative;
  overflow: hidden;
}

.upload,
img {
  position: absolute;
  height: 100%;
}

.upload {
  width: 100%;
}

.upload:deep(.el-upload) {
  height: 100%;
}

.upload:deep(.el-upload-dragger) {
  border-radius: 0;
  padding: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: var(--el-text-color-placeholder);

  > .el-icon {
    font-size: 64px;
  }

  > .description {
    font-size: 14px;
  }
}

img {
  user-select: none;
  pointer-events: none;
  object-fit: cover;
}
</style>
