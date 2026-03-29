import { redirect } from 'next/navigation'

export default function OldBlogRedirect() {
  redirect('/blog/category/science-technology')
}
