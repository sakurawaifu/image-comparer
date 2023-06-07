import { ref } from "vue"

const useViewportSize = () => {
  const width = ref(window.innerWidth)
  const height = ref(window.innerHeight)

  window.addEventListener('resize', () => {
    width.value = window.innerWidth
    height.value = window.innerHeight
  })

  return {
    width,
    height
  }
}

export default useViewportSize
