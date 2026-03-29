import Image from 'next/image'
import Link from 'next/link'
import { getCategoryName } from '@/lib/blog'

export default function PostCard({ post }) {
  const categoryName = getCategoryName(post.category)

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block"
    >
      <article className="bg-white rounded-3xl overflow-hidden border border-vaera-navy/5 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
        <div className="relative overflow-hidden aspect-[16/9]">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover object-[center_25%] transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <span className="absolute bottom-4 left-4 px-3 py-1 bg-vaera-ice text-vaera-navy text-xs font-mono rounded-full">
            {categoryName}
          </span>
        </div>

        <div className="p-6">
          <h3 className="font-italiana text-xl text-vaera-navy mb-3 line-clamp-2 transition-colors group-hover:text-vaera-light-navy">
            {post.title}
          </h3>

          <p className="font-poppins text-sm text-vaera-navy/60 mb-4 line-clamp-3">
            {post.excerpt}
          </p>

          <div className="flex items-center gap-3 text-xs font-mono text-vaera-navy/40">
            {post.author && (
              <>
                <span>{post.author}</span>
                <span>•</span>
              </>
            )}
            <time>
              {new Date(post.publishDate).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </time>
            <span>•</span>
            <span>{post.readingTime}</span>
          </div>
        </div>
      </article>
    </Link>
  )
}
