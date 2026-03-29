import { redirect } from 'next/navigation'

export default function OldBlogPostRedirect({ params }) {
  redirect(`/blog/${params.slug}`)
}
