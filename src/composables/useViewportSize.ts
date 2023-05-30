import { ref } from "vue"

const useViewportSize = () => {
  const vWidth = ref(window.innerWidth)
  const vHeight = ref(window.innerHeight)

  window.addEventListener('resize', () => {
    vWidth.value = window.innerWidth
    vHeight.value = window.innerHeight
  })

  return {
    vWidth,
    vHeight
  }
}

export default useViewportSize
