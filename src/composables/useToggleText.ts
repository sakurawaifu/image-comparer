import { computed } from 'vue'
import useToggle from '@/composables/useToggle'

const useToggleText = (enableText: string, disableText: string, init: boolean = false) => {
  const { bool, toggle } = useToggle(init)
  const text = computed(() => bool.value ? enableText : disableText)

  return {
    bool,
    text,
    toggle
  }
}

export default useToggleText
