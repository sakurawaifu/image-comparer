<template>
  <div
    class="movable-divider"
    :style="{'--left': dec2per(props.position)}"
    @pointerdown="handlePointerdown"
  ></div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { clamp, dec2per } from '@/utils/MathUtils'

type MovableDividerProps = {
  position: number // 百分比
  containerWidth: number
}
const props = defineProps<MovableDividerProps>()
const emit = defineEmits<{
  (e: 'update:position', v: number): void
}>()

let dragging = false
let startClientX = 0
let startPosition = 0
const handlePointerdown = (e: PointerEvent) => {
  if (e.pointerType === 'mouse' && e.button !== 0) return

  dragging = true
  document.body.classList.add('dragging')
  startClientX = e.clientX
  startPosition = props.position
}
const handlePointermove = (e: PointerEvent) => {
  if (!dragging) return

  const percentage = (e.clientX - startClientX) / props.containerWidth
  const positionResult = startPosition + percentage
  emit('update:position', clamp(positionResult, 0, 1))
}
const handlePointerup = () => {
  dragging = false
  document.body.classList.remove('dragging')
}
onMounted(() => {
  document.addEventListener('pointermove', handlePointermove)
  document.addEventListener('pointerup', handlePointerup)
})
onUnmounted(() => {
  document.removeEventListener('pointermove', handlePointermove)
  document.removeEventListener('pointerup', handlePointerup)
})
</script>

<style scoped lang="less">
.movable-divider {
  --padding: 10px;
  --transition: 0.15s;

  position: absolute;
  top: 0;
  left: var(--left, 0);

  padding-inline: var(--padding);
  height: 100%;
  width: 2px;
  transform: translateX(-50%);

  user-select: none;
  display: flex;
  justify-content: center;
  align-items: flex-end;

  &:hover {
    cursor: ew-resize;
  }

  &::after {
    content: "";
    border: solid #0000;
    border-width: 0 6px 12px;
    border-bottom-color: #2ea9df;
    transform: translateY(16px);
  }
}
</style>

<style lang="less">
body.dragging {
  &,
  & * {
    cursor: col-resize;
  }
}
</style>
