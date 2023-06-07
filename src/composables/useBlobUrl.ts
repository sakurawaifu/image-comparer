import { onUnmounted, ref } from 'vue'

const useBlobUrl = () => {
  const urlRef = ref('')
  const revoke = () => URL.revokeObjectURL(urlRef.value)

  const setUrl = (source: Blob | string) => {
    revoke()
    urlRef.value =
      typeof source === 'string'
        ? source
        : URL.createObjectURL(source)
  }
  onUnmounted(revoke)

  return {
    urlRef,
    setUrl
  }
}

export default useBlobUrl
