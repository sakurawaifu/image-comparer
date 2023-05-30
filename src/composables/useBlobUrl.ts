import { onUnmounted, ref } from 'vue'

const useBlobUrl = () => {
  const urlRef = ref('')
  const revoke = () => URL.revokeObjectURL(urlRef.value)

  const setUrl = (blob: Blob) => {
    revoke()
    urlRef.value = URL.createObjectURL(blob)
  }

  onUnmounted(revoke)

  return {
    urlRef,
    setUrl
  }
}

export default useBlobUrl
