import { reactive, watchEffect } from 'vue'
import { Size } from '@/common/types'

const useLastSize = (size1: Size, size2: Size) => {
  const lastSize = reactive({
    ...size1
  })
  watchEffect(() => void Object.assign(lastSize, size1))
  watchEffect(() => void Object.assign(lastSize, size2))

  return lastSize
}

export default useLastSize
