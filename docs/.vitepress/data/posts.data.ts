import { createContentLoader } from 'vitepress'

/* ──────────────────────────────────────────────────────────────
 * 阅读时长估算 —— 整个博客里最有"主观取舍"的一块逻辑。
 *
 * 这里的策略决策点（适合你来定）：
 *   1. 中文按"字"算、英文按"词"算：用正则把 CJK 字符与拉丁单词分开计数。
 *   2. 阅读速度假设：中文 ~500 字/分、英文 ~200 词/分（业界常用值）。
 *   3. 是否扣除代码块（代码阅读速度不同），当前先粗略不计。
 *
 * 下面给了一个能工作的默认实现，并把"假设"提成顶部两个常量——
 * 你只需改这两个数字，就能调整全站阅读时长策略。
 * ────────────────────────────────────────────────────────────── */

const CJK_CHARS_PER_MIN = 500 // 中文阅读速度（字/分钟）
const LATIN_WORDS_PER_MIN = 200 // 英文阅读速度（词/分钟）

function estimateReadingTime(raw: string): {
  words: number
  minutes: number
} {
  if (!raw) return { words: 0, minutes: 0 }

  // CJK 字符（中日韩统一表意文字 + 平假名/片假名）
  const cjk = (raw.match(/[一-鿿぀-ヿ]/g) || []).length
  // 拉丁单词
  const latin = (raw.match(/[A-Za-z][A-Za-z'-]*/g) || []).length

  const words = cjk + latin
  const minutes = cjk / CJK_CHARS_PER_MIN + latin / LATIN_WORDS_PER_MIN
  return { words, minutes }
}

export default createContentLoader('posts/**/*.md', {
  includeSrc: true,
  excerpt: true,
  transform(raw) {
    return raw
      .filter((p) => p.frontmatter.date) // 只要带 date 的真实文章
      .sort(
        (a, b) =>
          +new Date(b.frontmatter.date as string) -
          +new Date(a.frontmatter.date as string)
      )
      .map((p) => {
        const { words, minutes } = estimateReadingTime(p.src || '')
        return {
          ...p,
          wordCount: words,
          readingTime: Math.max(1, Math.round(minutes))
        }
      })
  }
})
