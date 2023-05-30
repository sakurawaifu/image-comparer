<template>
  <div
    class="movable-divider"
    :class="{dragging}"
    @pointerdown="handlePointerdown"
    :style="styleObj"
  ></div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { clamp, dec2per } from '@/utils/MathUtils'

type MovableDivider = {
  padding?: number
  init?: number // 位置百分比 [0, 1]
  containerWidth: number
}
const props = withDefaults(defineProps<MovableDivider>(), {
  padding: 8,
  init: 0.5
})

const emit = defineEmits<{
  (e: 'move', v: number): void
}>()

const left = ref(props.init)
let dragging = ref(false)
const styleObj = computed(() => ({
  left:  dec2per(left.value),
  '--padding': props.padding + 'px'
}))

let startPosition = 0
let originLeft = left.value
const handlePointerdown = (e: PointerEvent) => {
  if (e.pointerType === 'mouse' && (e.button !== 0)) return

  dragging.value = true
  startPosition = e.clientX
  originLeft = left.value
  document.body.classList.add('dragging')
}
const handlePointermove = (e: PointerEvent) => {
  if (!dragging.value) return

  const offsetPx = e.clientX - startPosition
  const offsetPercentage = offsetPx / props.containerWidth
  const curLeft = originLeft + offsetPercentage
  left.value = clamp(curLeft, 0, 1)
  emit('move', left.value)
}
const handlePointerup = (e: PointerEvent) => {
  dragging.value = false
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
  --width: 2px;
  --oversize: 8px;

  position: absolute;
  top: calc(-1 * var(--oversize));

  padding-inline: var(--padding);
  height: calc(100% + 2 * var(--oversize));
  width: var(--width);
  transform: translateX(calc(-1 * (var(--padding) + var(--width) / 2)));

  background-color: lightgray;
  background-clip: content-box;
  transition: background-color 0.15s;

  &:hover {
    cursor: col-resize;
    background-color: dodgerblue;
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
