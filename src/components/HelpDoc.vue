<template>
  <article class="help-doc">
    <section>
      <header>说明</header>
      <main>
        <p>本工具目的在于比较相同宽高比（甚至相同分辨率）的图片，请不要上传不同宽高比的图片。</p>
        <p><strong>推荐在全屏下使用，窗口化时因为图片渲染的问题，可能出现锯齿</strong></p>
        <p>图片可点击上传，也可拖拽上传。</p>
        <p>底部三角对应的就是图片分割线。非全屏状态下hover不会变色，全屏状态下常态蓝色。</p>
      </main>
    </section>
    <section>
      <header>快捷键</header>
      <main>
        <p>S：切换图片</p>
        <p>F：切换全屏 </p>
        <p>R：重置图片以及分割线位置</p>
        <p>L：禁用/启用上传</p>
      </main>
    </section>
  </article>
</template>

<style scoped lang="less">
section {
  overflow: hidden;

  &:nth-child(n+2) {
    margin-top: 1em;
  }

  > header {
    font-weight: bold;
  }

  > main {
    > p {
      margin-block: 0.5em;
    }
  }
}
</style>
