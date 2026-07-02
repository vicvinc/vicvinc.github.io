import fs from 'node:fs'
import path from 'node:path'

// gallery 图片放在 docs/public/gallery/（public 下的文件按原路径提供，URL = /gallery/<file>）。
//
// VitePress 数据加载器契约：default 导出一个带 load() 方法的对象，
// load() 的返回值会被隐式暴露为 `data` 具名导出（见 GalleryGrid 的 import { data }）。
// 此模块仅在构建期 Node 环境运行，可用 fs / Node API；cwd = 项目根。
const dir = path.resolve(process.cwd(), 'docs/public/gallery')

export interface GalleryImage {
  name: string
  url: string
}

export default {
  load(): GalleryImage[] {
    const files: string[] = fs.existsSync(dir)
      ? fs
          .readdirSync(dir)
          .filter((f) => /\.(png|jpe?g|webp|gif|svg)$/i.test(f))
          .sort()
      : []
    return files.map((f) => ({ name: f, url: `/gallery/${f}` }))
  }
}
