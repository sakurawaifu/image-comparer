import { Ref, ref, watchEffect } from 'vue'

const useContain = (wContent: Ref<number>, hContent: Ref<number>, wLimit: Ref<number>, hLimit: Ref<number>) => {
  const width = ref(wContent.value)
  const height = ref(hContent.value)


  watchEffect(() => {
    if (wContent.value <= wLimit.value && hContent.value <= hLimit.value) {
      width.value = wContent.value
      height.value = hContent.value
      return
    }

    const targetAspectRatio = wContent.value / hContent.value
    const newAspectRatio = wLimit.value / hLimit.value
    if (newAspectRatio >= targetAspectRatio) {
      width.value = targetAspectRatio * hLimit.value
      height.value = hLimit.value
    } else {
      width.value = wLimit.value
      height.value = wLimit.value / targetAspectRatio
    }
  })

  return {
    width,
    height
  }
}

export default useContain

