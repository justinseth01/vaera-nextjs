import Image from 'next/image'
import ClinicalCallout from './ClinicalCallout'

function CustomImage({ src, alt }) {
  const isVertical = src?.includes('IMG_3481') || src?.includes('lp_image') || src?.includes('IMG_0281')
  const isWide = src?.includes('Gear_Group') || src?.includes('Screenshot_2026')

  if (isVertical) {
    return (
      <div className="float-right ml-6 mb-4 mt-2 w-[200px] md:w-[240px] clear-right">
        <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-lg ring-1 ring-vaera-navy/5">
          <Image
            src={src}
            alt={alt || ''}
            fill
            className="object-cover"
            sizes="240px"
          />
        </div>
        {alt && (
          <p className="mt-2 font-mono text-[10px] text-vaera-navy/40 leading-tight">
            {alt}
          </p>
        )}
      </div>
    )
  }

  return (
    <div className="my-10 clear-both">
      <div className={`relative ${isWide ? 'aspect-[16/9]' : 'aspect-[4/3]'} rounded-2xl overflow-hidden shadow-lg ring-1 ring-vaera-navy/5`}>
        <Image
          src={src}
          alt={alt || ''}
          fill
          className="object-cover"
          sizes="(max-width: 680px) 100vw, 680px"
        />
      </div>
      {alt && (
        <p className="mt-3 text-center font-mono text-xs text-vaera-navy/40">
          {alt}
        </p>
      )}
    </div>
  )
}

export const mdxComponents = {
  h2: ({ children }) => (
    <h2 className="font-italiana text-2xl md:text-3xl text-vaera-navy mt-12 mb-4 clear-both">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="font-poppins font-medium text-lg text-vaera-navy mt-8 mb-3">
      {children}
    </h3>
  ),
  p: ({ children }) => {
    const hasImage = Array.isArray(children)
      ? children.some(child => child?.type?.name === 'CustomImage' || child?.props?.src)
      : children?.type?.name === 'CustomImage' || children?.props?.src
    if (hasImage) {
      return <>{children}</>
    }
    return (
      <p className="font-poppins text-base text-vaera-navy/80 leading-relaxed mb-6">
        {children}
      </p>
    )
  },
  strong: ({ children }) => (
    <strong className="font-semibold text-vaera-navy">{children}</strong>
  ),
  a: ({ href, children }) => (
    <a
      href={href}
      className="text-vaera-navy underline underline-offset-2 hover:text-vaera-light-navy transition-colors"
      target={href?.startsWith('http') ? '_blank' : undefined}
      rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
    >
      {children}
    </a>
  ),
  ul: ({ children }) => (
    <ul className="my-6 space-y-3 font-poppins text-vaera-navy/80">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="my-6 space-y-3 font-poppins text-vaera-navy/80 list-decimal list-inside">
      {children}
    </ol>
  ),
  li: ({ children }) => (
    <li className="flex items-start gap-3">
      <span className="w-1.5 h-1.5 rounded-full bg-vaera-light-navy mt-2.5 flex-shrink-0" />
      <span>{children}</span>
    </li>
  ),
  blockquote: ({ children }) => (
    <blockquote className="my-8 pl-6 py-4 pr-4 bg-vaera-ice/20 border-l-4 border-vaera-ice rounded-r-xl">
      <div className="font-poppins italic text-lg text-vaera-navy/70">
        {children}
      </div>
    </blockquote>
  ),
  code: ({ children }) => (
    <code className="font-mono text-sm bg-vaera-ice/40 text-vaera-navy px-2 py-0.5 rounded">
      {children}
    </code>
  ),
  pre: ({ children }) => (
    <pre className="my-6 p-4 bg-vaera-navy rounded-xl overflow-x-auto">
      <code className="font-mono text-sm text-white">{children}</code>
    </pre>
  ),
  hr: () => (
    <hr className="my-12 border-t border-vaera-navy/10" />
  ),
  img: CustomImage,
  Image: CustomImage,
  ClinicalCallout,
}
