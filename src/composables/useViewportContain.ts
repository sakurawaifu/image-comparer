import useViewportSize from '@/composables/useViewportSize'
import useContain from '@/composables/useContain'
import { computed, Ref } from 'vue'

const useViewportContain = (wContent: Ref<number>, hContent: Ref<number>, offsetX: number = 0, offsetY: number = 0) => {
  const {
    vWidth,
    vHeight
  } = useViewportSize()

  const wLimit = computed(() => vWidth.value - offsetX)
  const hLimit = computed(() => vHeight.value - offsetY)

  const {
    width,
    height
  } = useContain(wContent, hContent, wLimit, hLimit)

  return {
    width,
    height
  }
}

export default useViewportContain
