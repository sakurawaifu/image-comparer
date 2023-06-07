import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { dirname, resolve } from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'
import { fileURLToPath } from 'url'
import viteLegacyPlugin from '@vitejs/plugin-legacy'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const pathSrc = resolve(__dirname, 'src')

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [
        ElementPlusResolver(),
        IconsResolver({
          prefix: 'Icon'
        })
      ],
      dts: resolve(pathSrc, 'auto-imports.d.ts')
    }),
    Components({
      resolvers: [
        ElementPlusResolver(),
        IconsResolver({
          enabledCollections: ['ep']
        })
      ],
      dts: resolve(pathSrc, 'components.d.ts')
    }),
    Icons({
      autoInstall: true
    }),
    viteLegacyPlugin({
      targets: ['defaults', 'not IE 11']
    })
  ],
  base: './',
  server: {
    open: true
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  }
})
