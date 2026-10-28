/** Input uses right-page coordinates; output uses the active page's local coordinates. */
export interface BookCurlPoint {
  x: number
  y: number
}

export type BookCurlCorner = 'top' | 'bottom'
export type BookCurlDirection = 'forward' | 'back'

export interface BookCurlInput {
  pageWidth: number
  pageHeight: number
  corner: BookCurlCorner
  /**
   * Pointer in canonical right-page coordinates: spine x = 0, outer edge x =
   * pageWidth. This convention also applies when direction is 'back'.
   */
  pointer: BookCurlPoint
  /** 'back' mirrors the output into a left page with its spine at local x = pageWidth. */
  direction?: BookCurlDirection
}

export interface BookCurlShadow {
  /** Ends of the crease, in the active page's local coordinates. */
  start: BookCurlPoint
  end: BookCurlPoint
  center: BookCurlPoint
  length: number
  /** Clockwise CSS rotation from a horizontal line, in radians. */
  angle: number
  /** Clockwise CSS rotation from a horizontal line, in degrees. */
  angleDeg: number
}

export interface BookCurlGeometry {
  /** Constrained corner in the active page's local coordinates. */
  pointer: BookCurlPoint
  /** 0 at the outer edge, 1 when the corner reaches the opposite outer edge. */
  progress: number
  /** CSS matrix for an element located at the active page's normal 0,0 position. */
  flapTransform: string
  /** Clip the folded back face before applying flapTransform. */
  flapClipPath: string
  /** Clip the still flat front face at its normal page position. */
  frontClipPath: string
  /** Clip the page underneath at its normal page position. */
  revealClipPath: string
  shadow: BookCurlShadow | null
}

type Polygon = BookCurlPoint[]

const EMPTY_CLIP = 'polygon(0px 0px, 0px 0px, 0px 0px)'

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value))
}

function cssNumber(value: number): string {
  const rounded = Math.round(value * 1_000_000) / 1_000_000
  return String(Object.is(rounded, -0) ? 0 : rounded)
}

function polygonPath(polygon: Polygon): string {
  if (polygon.length < 3) return EMPTY_CLIP
  return `polygon(${polygon.map(({ x, y }) => `${cssNumber(x)}px ${cssNumber(y)}px`).join(', ')})`
}

function clipPolygon(polygon: Polygon, signedDistance: (point: BookCurlPoint) => number, tolerance: number): Polygon {
  const clipped: Polygon = []
  for (let index = 0; index < polygon.length; index += 1) {
    const from = polygon[index]
    const to = polygon[(index + 1) % polygon.length]
    const fromDistance = signedDistance(from)
    const toDistance = signedDistance(to)
    const fromInside = fromDistance >= -tolerance
    const toInside = toDistance >= -tolerance

    if (fromInside) clipped.push(from)
    if (fromInside !== toInside) {
      const ratio = clamp(fromDistance / (fromDistance - toDistance), 0, 1)
      clipped.push({ x: from.x + (to.x - from.x) * ratio, y: from.y + (to.y - from.y) * ratio })
    }
  }

  // A crease passing through a rectangle vertex can add that vertex twice.
  const unique = clipped.filter((point, index) => {
    const previous = clipped[(index + clipped.length - 1) % clipped.length]
    return Math.hypot(point.x - previous.x, point.y - previous.y) > tolerance
  })
  if (unique.length < 3) return []

  const doubledArea = unique.reduce((sum, point, index) => {
    const next = unique[(index + 1) % unique.length]
    return sum + point.x * next.y - next.x * point.y
  }, 0)
  return Math.abs(doubledArea) > tolerance * tolerance ? unique : []
}

function creaseShadow(
  midpoint: BookCurlPoint,
  normal: BookCurlPoint,
  width: number,
  height: number,
  tolerance: number
): BookCurlShadow | null {
  const tangent = { x: -normal.y, y: normal.x }
  const points: BookCurlPoint[] = []
  const add = (point: BookCurlPoint) => {
    if (
      point.x < -tolerance ||
      point.x > width + tolerance ||
      point.y < -tolerance ||
      point.y > height + tolerance ||
      points.some((existing) => Math.hypot(existing.x - point.x, existing.y - point.y) <= tolerance)
    )
      return
    points.push({ x: clamp(point.x, 0, width), y: clamp(point.y, 0, height) })
  }

  if (Math.abs(tangent.x) > 1e-12) {
    for (const x of [0, width]) {
      const factor = (x - midpoint.x) / tangent.x
      add({ x, y: midpoint.y + factor * tangent.y })
    }
  }
  if (Math.abs(tangent.y) > 1e-12) {
    for (const y of [0, height]) {
      const factor = (y - midpoint.y) / tangent.y
      add({ x: midpoint.x + factor * tangent.x, y })
    }
  }

  if (points.length < 2) return null
  let start = points[0]
  let end = points[1]
  let length = 0
  for (let first = 0; first < points.length; first += 1) {
    for (let second = first + 1; second < points.length; second += 1) {
      const distance = Math.hypot(points[first].x - points[second].x, points[first].y - points[second].y)
      if (distance > length) {
        start = points[first]
        end = points[second]
        length = distance
      }
    }
  }
  if (length <= tolerance) return null
  if (start.y > end.y || (start.y === end.y && start.x > end.x)) [start, end] = [end, start]
  return {
    start,
    end,
    center: { x: (start.x + end.x) / 2, y: (start.y + end.y) / 2 },
    length,
    angle: Math.atan2(end.y - start.y, end.x - start.x),
    angleDeg: (Math.atan2(end.y - start.y, end.x - start.x) * 180) / Math.PI,
  }
}

/**
 * Compute a flat paper curl from a dragged outer corner. The page rectangle is
 * [0, pageWidth] × [0, pageHeight], with the spine at x = 0. The front face and
 * the page underneath remain in that rectangle; the folded back face uses the
 * returned clip path and reflection matrix. Put the back face's content inside
 * an additional `scaleX(-1)` wrapper so its text reads normally after folding.
 * With direction = 'back', the input pointer retains these canonical coordinates
 * but every output is mirrored into a left page (outer x = 0, spine x = width).
 */
export function calculateBookCurl({
  pageWidth,
  pageHeight,
  corner,
  pointer,
  direction = 'forward',
}: BookCurlInput): BookCurlGeometry {
  if (!Number.isFinite(pageWidth) || pageWidth <= 0 || !Number.isFinite(pageHeight) || pageHeight <= 0) {
    throw new RangeError('Book curl page dimensions must be positive finite numbers')
  }

  const cornerY = corner === 'bottom' ? pageHeight : 0
  const x = clamp(Number.isFinite(pointer.x) ? pointer.x : pageWidth, -pageWidth, pageWidth)
  const y = clamp(Number.isFinite(pointer.y) ? pointer.y : cornerY, 0, pageHeight)
  // The dragged corner cannot move farther than one page width from its spine pivot.
  const radius = Math.hypot(x, y - cornerY)
  const scale = radius > pageWidth ? pageWidth / radius : 1
  const constrained = { x: x * scale, y: cornerY + (y - cornerY) * scale }
  const tolerance = Math.max(1e-9, Math.max(pageWidth, pageHeight) * 1e-9)
  const wholePage: Polygon = [
    { x: 0, y: 0 },
    { x: pageWidth, y: 0 },
    { x: pageWidth, y: pageHeight },
    { x: 0, y: pageHeight },
  ]
  const toPagePoint = (point: BookCurlPoint): BookCurlPoint =>
    direction === 'back' ? { x: pageWidth - point.x, y: point.y } : point

  const dx = pageWidth - constrained.x
  const dy = cornerY - constrained.y
  const distance = Math.hypot(dx, dy)
  if (distance <= tolerance) {
    return {
      pointer: toPagePoint(constrained),
      progress: 0,
      flapTransform: 'matrix(1, 0, 0, 1, 0, 0)',
      flapClipPath: EMPTY_CLIP,
      frontClipPath: polygonPath(wholePage),
      revealClipPath: EMPTY_CLIP,
      shadow: null,
    }
  }

  // The crease is the perpendicular bisector of the original and dragged corner.
  const normal = { x: dx / distance, y: dy / distance }
  const midpoint = { x: (pageWidth + constrained.x) / 2, y: (cornerY + constrained.y) / 2 }
  const signedDistance = (point: BookCurlPoint) => (point.x - midpoint.x) * normal.x + (point.y - midpoint.y) * normal.y
  const folded = clipPolygon(wholePage, signedDistance, tolerance)
  const flat = clipPolygon(wholePage, (point) => -signedDistance(point), tolerance)

  // Reflection in the crease: q' = (I - 2nnᵀ)q + 2(n·midpoint)n.
  const a = 1 - 2 * normal.x * normal.x
  const b = -2 * normal.x * normal.y
  const d = 1 - 2 * normal.y * normal.y
  const translation = 2 * (normal.x * midpoint.x + normal.y * midpoint.y)
  const e = translation * normal.x
  const f = translation * normal.y
  const foldedPath = polygonPath(folded.map(toPagePoint))
  const shadow = creaseShadow(midpoint, normal, pageWidth, pageHeight, tolerance)
  const pageShadow =
    direction === 'back' && shadow
      ? {
          start: toPagePoint(shadow.start),
          end: toPagePoint(shadow.end),
          center: toPagePoint(shadow.center),
          length: shadow.length,
          angle: Math.atan2(shadow.end.y - shadow.start.y, shadow.start.x - shadow.end.x),
          angleDeg: (Math.atan2(shadow.end.y - shadow.start.y, shadow.start.x - shadow.end.x) * 180) / Math.PI,
        }
      : shadow
  // H(x) = width - x is the left-page mirror; H · matrix · H is the back-turn transform.
  const matrix = direction === 'back' ? [a, -b, -b, d, pageWidth * (1 - a) - e, pageWidth * b + f] : [a, b, b, d, e, f]

  return {
    pointer: toPagePoint(constrained),
    progress: clamp(dx / (2 * pageWidth), 0, 1),
    flapTransform: `matrix(${matrix.map(cssNumber).join(', ')})`,
    flapClipPath: foldedPath,
    frontClipPath: polygonPath(flat.map(toPagePoint)),
    revealClipPath: foldedPath,
    shadow: pageShadow,
  }
}
