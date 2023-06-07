import useViewportSize from '@/composables/useViewportSize'
import useContain from '@/composables/useContain'
import { computed, Ref } from 'vue'

const useViewportContain = (wContent: Ref<number>, hContent: Ref<number>, offsetX: Ref<number>, offsetY: Ref<number>) => {
  const {
    width: vWidth,
    height: vHeight
  } = useViewportSize()

  const wLimit = computed(() => vWidth.value - offsetX.value)
  const hLimit = computed(() => vHeight.value - offsetY.value)

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
