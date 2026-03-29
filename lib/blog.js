import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'

const BLOG_DIR = path.join(process.cwd(), 'content/blog')

export const CATEGORIES = {
  'science-technology': {
    name: 'Science & Technology',
    slug: 'science-technology',
  },
  'guides': {
    name: 'Guides',
    slug: 'guides',
  },
  'results-recovery': {
    name: 'Results & Recovery',
    slug: 'results-recovery',
  },
  'skin-concerns': {
    name: 'Skin Concerns',
    slug: 'skin-concerns',
  },
  'vaera': {
    name: 'Vaera',
    slug: 'vaera',
  },
}

export function getAllPosts() {
  if (!fs.existsSync(BLOG_DIR)) {
    return []
  }

  const files = fs.readdirSync(BLOG_DIR).filter(file => file.endsWith('.mdx'))

  const posts = files.map(filename => {
    const filePath = path.join(BLOG_DIR, filename)
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(fileContents)
    const stats = readingTime(content)

    return {
      ...data,
      slug: data.slug || filename.replace('.mdx', ''),
      readingTime: `${Math.ceil(stats.minutes)} min read`,
    }
  })

  return posts.sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate))
}

export function getPostBySlug(slug) {
  const files = fs.readdirSync(BLOG_DIR).filter(file => file.endsWith('.mdx'))

  for (const filename of files) {
    const filePath = path.join(BLOG_DIR, filename)
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(fileContents)

    const postSlug = data.slug || filename.replace('.mdx', '')

    if (postSlug === slug) {
      const stats = readingTime(content)
      return {
        ...data,
        slug: postSlug,
        content,
        readingTime: `${Math.ceil(stats.minutes)} min read`,
      }
    }
  }

  return null
}

export function getPostsByCategory(category) {
  const posts = getAllPosts()
  return posts.filter(post => post.category === category)
}

export function getFeaturedPost() {
  const posts = getAllPosts()
  return posts.find(post => post.featured) || posts[0] || null
}

export function getRelatedPosts(currentSlug, category, limit = 3) {
  const posts = getAllPosts()
  return posts
    .filter(post => post.slug !== currentSlug)
    .filter(post => post.category === category)
    .slice(0, limit)
}

export function getAllSlugs() {
  if (!fs.existsSync(BLOG_DIR)) {
    return []
  }

  const files = fs.readdirSync(BLOG_DIR).filter(file => file.endsWith('.mdx'))

  return files.map(filename => {
    const filePath = path.join(BLOG_DIR, filename)
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const { data } = matter(fileContents)
    return data.slug || filename.replace('.mdx', '')
  })
}

export function getCategoryName(slug) {
  return CATEGORIES[slug]?.name || slug
}

export function getAllCategories() {
  return Object.values(CATEGORIES)
}
