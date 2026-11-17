// components/Photo.tsx
// The one way pages show company photography. Uses next/image with the photo's
// real width and height (no layout shift, correct srcset). Where a layout needs
// a different shape the image is cropped with object-fit: cover — it is never
// stretched — and `position` keeps the subject in frame.
import Image from 'next/image'
import type { CSSProperties, ReactNode } from 'react'
import { PHOTOS, type PhotoName } from '@/lib/photos'

interface PhotoProps {
  name: PhotoName
  /** Rendered width at each breakpoint, so the browser picks the right file. */
  sizes: string
  /** Display shape above 720px, e.g. "3 / 2". Defaults to the photo's own ratio. */
  ratio?: string
  /** Display shape at 720px and below. Defaults to `ratio`. */
  ratioSm?: string
  /** object-position for crops, e.g. "100% 50%" to keep the right side. */
  position?: string
  caption?: ReactNode
  /** Above-the-fold photos load eagerly with high fetch priority. */
  eager?: boolean
  className?: string
}

export default function Photo({ name, sizes, ratio, ratioSm, position, caption, eager = false, className }: PhotoProps) {
  const photo = PHOTOS[name]
  const natural = `${photo.width} / ${photo.height}`
  const vars = {
    '--ph-ratio': ratio ?? natural,
    '--ph-ratio-sm': ratioSm ?? ratio ?? natural,
    '--ph-pos': position ?? '50% 50%',
  } as CSSProperties

  return (
    <figure className={`ct-photo${className ? ` ${className}` : ''}`} style={vars}>
      <Image
        className="ct-photo__img"
        src={photo.src}
        alt={photo.alt}
        width={photo.width}
        height={photo.height}
        sizes={sizes}
        // Next's default quality (75). The source files are already compressed;
        // 85 made the hero 43% heavier with no visible gain.
        quality={75}
        loading={eager ? 'eager' : 'lazy'}
        fetchPriority={eager ? 'high' : undefined}
      />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  )
}
