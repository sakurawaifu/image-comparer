import { reactive } from 'vue'
import useBlobUrl from '@/composables/useBlobUrl'
import getImgSize from '@/utils/getImgSize'
import { Size } from '@/common/types'

const useUploadImg = (defaultSize: Size = { width: 0, height: 0 }) => {
  const size = reactive({ ...defaultSize })

  const {
    urlRef,
    setUrl
  } = useBlobUrl()
  const beforeUpload = (file: File) => {
    setUrl(file)
    getImgSize(urlRef.value)
      .then(newSize => Object.assign(size, newSize))
    return false
  }
  const clear = () => {
    setUrl('')
    Object.assign(size, defaultSize)
  }

  return {
    urlRef,
    size,
    beforeUpload,
    clear
  }
}

export default useUploadImg
