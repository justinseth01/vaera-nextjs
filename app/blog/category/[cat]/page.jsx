import { notFound } from 'next/navigation'
import { getPostsByCategory, getAllCategories, getCategoryName, CATEGORIES } from '@/lib/blog'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import PostCard from '@/components/blog/PostCard'
import CategoryFilter from '@/components/blog/CategoryFilter'

export async function generateStaticParams() {
  const categories = getAllCategories()
  return categories.map(cat => ({ cat: cat.slug }))
}

export async function generateMetadata({ params }) {
  const categoryName = getCategoryName(params.cat)

  return {
    title: `${categoryName} | Vaera Journal`,
    description: `Browse ${categoryName.toLowerCase()} articles from the Vaera skincare team.`,
  }
}

export default function CategoryPage({ params }) {
  const { cat } = params

  if (!CATEGORIES[cat]) {
    notFound()
  }

  const posts = getPostsByCategory(cat)
  const categoryName = getCategoryName(cat)

  return (
    <>
      <Navbar />
      <main className="pt-24">
        <section className="bg-vaera-navy py-16 md:py-24">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <span className="font-mono text-xs uppercase tracking-widest text-white/50 mb-4 block">
              Category
            </span>
            <h1 className="font-italiana text-4xl md:text-5xl lg:text-6xl text-white mb-4">
              {categoryName}
            </h1>
          </div>
        </section>

        <section className="section-padding bg-vaera-gray">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <CategoryFilter currentCategory={cat} />
            </div>

            {posts.length === 0 ? (
              <div className="text-center py-16">
                <p className="font-poppins text-vaera-navy/60">
                  No posts in this category yet.
                </p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map(post => (
                  <PostCard key={post.slug} post={post} />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
