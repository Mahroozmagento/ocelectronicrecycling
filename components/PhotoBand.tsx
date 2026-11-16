// components/PhotoBand.tsx
// A full-width section with a company photo as its background — the role the
// truck and sorting-floor photos played on the original homepage.
//
// The background is a CSS image-set() built from next/image's getImageProps(),
// so it is served through the image optimizer (WebP/AVIF, sized per screen)
// instead of the raw file. The photo layer carries role="img" and the photo's
// alt text; every piece of information in the band is also in its text.
//
//   variant "card":  photo fills the band; text sits on an ink card on one side,
//                    leaving the other side of the photo clear.
//   variant "split": photo fills the right half; text sits on solid ink on the
//                    left, never over the photo.
// Below 900px both become photo-on-top, text-below.
import { getImageProps } from 'next/image'
import type { CSSProperties, ReactNode } from 'react'
import { PHOTOS, type PhotoName } from '@/lib/photos'

function imageSet(name: PhotoName, width: number): string {
  const photo = PHOTOS[name]
  const { props } = getImageProps({
    src: photo.src,
    alt: '',
    width,
    height: Math.round((width * photo.height) / photo.width),
    quality: 75,
  })
  const set = (props.srcSet ?? '')
    .split(', ')
    .filter(Boolean)
    .map((entry) => {
      const [url, density] = entry.split(' ')
      return `url("${url}") ${density}`
    })
    .join(', ')
  return `image-set(${set})`
}

interface PhotoBandProps {
  name: PhotoName
  variant: 'card' | 'split'
  /** background-position on wide screens, e.g. "0% 50%" to keep the left side. */
  position?: string
  /** background-position for the photo strip below 900px. */
  positionSm?: string
  labelledBy: string
  className?: string
  children: ReactNode
}

export default function PhotoBand({ name, variant, position = '50% 50%', positionSm = '50% 50%', labelledBy, className, children }: PhotoBandProps) {
  const vars = {
    '--pb-lg': imageSet(name, 1920),
    '--pb-sm': imageSet(name, 1080),
    '--pb-pos': position,
    '--pb-pos-sm': positionSm,
  } as CSSProperties

  return (
    <section
      className={`ct-photoband ct-photoband--${variant}${className ? ` ${className}` : ''}`}
      aria-labelledby={labelledBy}
      style={vars}
    >
      <div className="ct-photoband__media" role="img" aria-label={PHOTOS[name].alt} />
      <div className="ct-wrap ct-photoband__inner">
        <div className="ct-photoband__card">{children}</div>
      </div>
    </section>
  )
}
