import { getAllPosts, getFeaturedPost } from '@/lib/blog'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import PostCard from '@/components/blog/PostCard'
import CategoryFilter from '@/components/blog/CategoryFilter'

export const metadata = {
  title: 'The Journal | Vaera Skincare',
  description: 'Clinical insights and treatment guides from the team behind Vaera\'s precision microneedling device.',
}

export default function BlogPage() {
  const posts = getAllPosts()
  const featuredPost = getFeaturedPost()
  const regularPosts = posts.filter(p => p.slug !== featuredPost?.slug)

  return (
    <>
      <Navbar />
      <main className="pt-24">
        <section className="bg-vaera-navy py-16 md:py-24">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <h1 className="font-italiana text-4xl md:text-5xl lg:text-6xl text-white mb-4">
              The Science of Better Skin
            </h1>
            <p className="font-poppins font-light text-lg text-white/60 max-w-2xl mx-auto">
              Clinical insights, treatment guides, and the research behind everything we build.
            </p>
          </div>
        </section>

        <section className="section-padding bg-vaera-gray">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <CategoryFilter />
            </div>

            {posts.length === 0 ? (
              <div className="text-center py-16">
                <p className="font-poppins text-vaera-navy/60">
                  No posts yet. Check back soon.
                </p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredPost && (
                  <PostCard post={featuredPost} />
                )}
                {regularPosts.map(post => (
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
