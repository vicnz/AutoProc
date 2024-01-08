
import remarkGfm from 'remark-gfm'
import remarkImages from 'remark-mdx-images'
import createMDX from '@next/mdx'

/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: {
            allowedOrigins: ['https://cj5bscgj-3000.asse.devtunnels.ms/', 'localhost:3000']
        },
        instrumentationHook: true,
    },
    // Configure `pageExtensions`` to include MDX files
    pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
    // Optionally, add any other Next.js config below
}

const withMDX = createMDX({
    // Add markdown plugins here, as desired
    options: {
        remarkPlugins: [remarkImages, remarkGfm],
        rehypePlugins: [],
    },
})

// Merge MDX config with Next.js config
export default withMDX(nextConfig)