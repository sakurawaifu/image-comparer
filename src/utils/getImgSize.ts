const getImgSize = (url: String): Promise<{
  width: number,
  height: number
}> =>
  new Promise(resolve => {
    const img = new Image()
    img.addEventListener('load', () => {
      resolve({
        width: img.naturalWidth,
        height: img.naturalHeight
      })
    })
    img.src = url
  })

export default getImgSize
