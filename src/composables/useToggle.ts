import { ref } from 'vue'

const useToggle = (init: boolean = false) => {
  const bool = ref(init)
  const toggle = () => void (bool.value = !bool.value)

  return {
    bool,
    toggle
  }
}

export default useToggle
