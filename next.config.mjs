import createMDX from '@next/mdx'
import remarkGfm from 'remark-gfm'

const withMDX = createMDX({
  // MDX options must be nested under `options`
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [],
  },
  extension: /\.mdx?$/,
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  experimental: {
    // Important: disable the Rust MDX compiler so remark/rehype plugins run
    mdxRs: false,
  },
}

export default withMDX(nextConfig)
