import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { ArrowLeft } from 'lucide-react'
import { getPostBySlug, getAllSlugs, getRelatedPosts, getCategoryName } from '@/lib/blog'
import { mdxComponents } from '@/components/blog/MDXComponents'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import PostCard from '@/components/blog/PostCard'
import CompactWaitlist from '@/components/blog/CompactWaitlist'

export async function generateStaticParams() {
  const slugs = getAllSlugs()
  return slugs.map(slug => ({ slug }))
}

export async function generateMetadata({ params }) {
  const post = getPostBySlug(params.slug)
  if (!post) return {}

  return {
    title: `${post.title} | Vaera Journal`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage],
      type: 'article',
      publishedTime: post.publishDate,
    },
  }
}

export default function BlogPostPage({ params }) {
  const post = getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  const relatedPosts = getRelatedPosts(post.slug, post.category, 3)
  const categoryName = getCategoryName(post.category)

  return (
    <>
      <Navbar />
      <main className="pt-24 bg-white">
        <article className="max-w-3xl mx-auto px-6">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 font-poppins text-sm text-vaera-navy border border-vaera-navy/20 rounded-full px-4 py-2 hover:bg-vaera-gray hover:border-vaera-navy/40 transition-all mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>

          <header className="mb-8">
            <Link
              href={`/blog/category/${post.category}`}
              className="inline-block px-3 py-1 bg-vaera-ice text-vaera-navy text-xs font-mono rounded-full mb-4 hover:bg-vaera-ice/80 transition-colors"
            >
              {categoryName}
            </Link>

            <h1 className="font-italiana text-3xl md:text-4xl lg:text-5xl text-vaera-navy mb-4 leading-tight">
              {post.title}
            </h1>

            <p className="font-poppins font-light text-lg text-vaera-navy/80 mb-6">
              {post.excerpt}
            </p>

            <div className="flex items-end justify-between">
              <div className="space-y-1">
                {post.author && (
                  <p className="font-poppins font-medium text-sm text-vaera-navy">
                    By {post.author}
                  </p>
                )}
                <div className="flex items-center gap-3 text-xs font-mono text-vaera-navy/70">
                  <time>
                    {new Date(post.publishDate).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </time>
                  <span>•</span>
                  <span>{post.readingTime}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-vaera-navy/50">Share</span>
                <a
                  href={`https://twitter.com/intent/tweet?url=https://vaeraskincare.com/blog/${post.slug}&text=${encodeURIComponent(post.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full border border-vaera-navy/20 flex items-center justify-center hover:bg-vaera-gray hover:border-vaera-navy/40 transition-all"
                  aria-label="Share on X"
                >
                  <svg className="w-4 h-4 text-vaera-navy" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=https://vaeraskincare.com/blog/${post.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full border border-vaera-navy/20 flex items-center justify-center hover:bg-vaera-gray hover:border-vaera-navy/40 transition-all"
                  aria-label="Share on Facebook"
                >
                  <svg className="w-4 h-4 text-vaera-navy" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
              </div>
            </div>
          </header>

          <div className="relative aspect-[16/9] rounded-3xl overflow-hidden mb-12">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              priority
              className="object-cover object-[center_25%]"
              sizes="(max-width: 768px) 100vw, 768px"
            />
          </div>

          <div className="prose-custom">
            <MDXRemote source={post.content} components={mdxComponents} />
          </div>

          <div className="mt-16 mb-12">
            <CompactWaitlist />
          </div>
        </article>

        {relatedPosts.length > 0 && (
          <section className="border-t border-vaera-navy/10 py-16 bg-vaera-gray">
            <div className="max-w-6xl mx-auto px-6">
              <h2 className="font-italiana text-2xl text-vaera-navy mb-8">
                Related Articles
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedPosts.map(relPost => (
                  <PostCard key={relPost.slug} post={relPost} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  )
}
