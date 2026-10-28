import { calculateBookCurl } from './bookCurlGeometry'

type Direction = 'forward' | 'back'
type Corner = 'top' | 'bottom'

interface Point {
  x: number
  y: number
}

export interface TurnFrame {
  from: number
  to: number
  direction: Direction
  progress: number
  preview: boolean
}

export interface BookFlipEngineOptions {
  host: HTMLElement
  pages: HTMLElement[]
  width: number
  height: number
  single: boolean
  startPage: number
  interactive: boolean
  showCorners: boolean
  reducedMotion: boolean
  onPage: (page: number) => void
  onTurning: (turning: boolean) => void
  onFrame: (frame: TurnFrame | null) => void
}

interface Turn {
  fromSpread: number
  toSpread: number
  direction: Direction
  corner: Corner
  progress: number
  pointerY: number
  preview: boolean
  front: HTMLElement
  back: HTMLElement
  temporaryFace: HTMLElement | null
  hard: boolean
}

interface PointerTrack {
  id: number
  kind: string
  start: Point
  direction: Direction
  corner: Corner
  cornerHit: boolean
  startedAt: number
  dragging: boolean
  verticalGesture: boolean
}

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value))
const ease = (t: number) => 1 - (1 - t) ** 3

/** DOM and input engine for InteractiveBook. React owns each page's content. */
export class BookFlipEngine {
  private readonly options: BookFlipEngineOptions
  private readonly stage: HTMLDivElement
  private readonly shadowMask: HTMLDivElement
  private readonly shadow: HTMLDivElement
  private readonly spreads: number[][]
  private spread = 0
  private turn: Turn | null = null
  private pointer: PointerTrack | null = null
  private animationFrame = 0
  private animationToken = 0
  private previewAnimating = false
  private previewTarget: { progress: number; pointerY: number } | null = null
  private turning = false
  private destroyed = false
  private interactive: boolean
  private showCorners: boolean

  constructor(options: BookFlipEngineOptions) {
    this.options = options
    this.interactive = options.interactive
    this.showCorners = options.showCorners
    this.spreads = this.makeSpreads(options.pages.length, options.single)
    this.stage = document.createElement('div')
    this.stage.className = 'bookFlipStage'
    this.stage.style.width = `${options.width * (options.single ? 1 : 2)}px`
    this.stage.style.height = `${options.height}px`
    this.shadowMask = document.createElement('div')
    this.shadowMask.className = 'bookFlipShadowMask'
    this.shadow = document.createElement('div')
    this.shadow.className = 'bookFlipShadow'
    this.shadowMask.appendChild(this.shadow)
    this.stage.append(...options.pages, this.shadowMask)
    options.host.appendChild(this.stage)
    this.spread = this.findSpread(options.startPage)
    this.paintStatic()
    this.stage.addEventListener('pointerdown', this.onPointerDown)
    this.stage.addEventListener('pointermove', this.onPointerMove)
    this.stage.addEventListener('pointerup', this.onPointerUp)
    this.stage.addEventListener('pointercancel', this.onPointerCancel)
    this.stage.addEventListener('pointerleave', this.onPointerLeave)
    options.onPage(this.getPage())
    options.onTurning(false)
  }

  getPage(): number {
    return this.spreads[this.spread]?.[0] ?? 0
  }

  setInteraction(interactive: boolean, showCorners: boolean): void {
    this.interactive = interactive
    this.showCorners = showCorners
    if ((!interactive || !showCorners) && this.turn?.preview) this.cancelPreview()
  }

  next(): void {
    this.navigate(this.spread + 1, true)
  }

  previous(): void {
    this.navigate(this.spread - 1, true)
  }

  goTo(page: number, animate = true): void {
    if (!Number.isFinite(page)) return
    const target = this.findSpread(page)
    if (this.turn) this.cancelTurn()
    if (target === this.spread) return
    if (!animate || this.options.reducedMotion) {
      this.spread = target
      this.paintStatic()
      this.options.onPage(this.getPage())
      return
    }
    // A distant jump presents its final sheet turn, as the old engine did.
    if (Math.abs(target - this.spread) > 1) {
      this.spread = target + (target > this.spread ? -1 : 1)
      this.paintStatic()
    }
    this.navigate(target, true)
  }

  destroy(): void {
    if (this.destroyed) return
    this.destroyed = true
    this.cancelAnimation()
    this.stage.removeEventListener('pointerdown', this.onPointerDown)
    this.stage.removeEventListener('pointermove', this.onPointerMove)
    this.stage.removeEventListener('pointerup', this.onPointerUp)
    this.stage.removeEventListener('pointercancel', this.onPointerCancel)
    this.stage.removeEventListener('pointerleave', this.onPointerLeave)
    if (this.pointer && this.stage.hasPointerCapture(this.pointer.id)) this.stage.releasePointerCapture(this.pointer.id)
    this.pointer = null
    this.turn = null
    this.stage.remove()
    this.options.onFrame(null)
  }

  private makeSpreads(count: number, single: boolean): number[][] {
    if (single) return Array.from({ length: count }, (_, index) => [index])
    const spreads: number[][] = count ? [[0]] : []
    for (let index = 1; index < count; index += 2) {
      spreads.push(index + 1 < count ? [index, index + 1] : [index])
    }
    return spreads
  }

  private findSpread(page: number): number {
    const index = this.spreads.findIndex((spread) =>
      spread.includes(clamp(Math.trunc(page), 0, this.options.pages.length - 1))
    )
    return index < 0 ? 0 : index
  }

  private navigate(target: number, animate: boolean, corner: Corner = 'bottom'): void {
    if (target < 0 || target >= this.spreads.length || target === this.spread || this.destroyed) return
    if (this.turn) this.cancelTurn()
    if (!animate || this.options.reducedMotion) {
      this.spread = target
      this.paintStatic()
      this.options.onPage(this.getPage())
      return
    }
    const direction: Direction = target > this.spread ? 'forward' : 'back'
    const turn = this.startTurn(direction, corner, false)
    if (!turn) return
    this.animateTo(1, true, 900)
  }

  private startTurn(direction: Direction, corner: Corner, preview: boolean): Turn | null {
    const toSpread = this.spread + (direction === 'forward' ? 1 : -1)
    if (toSpread < 0 || toSpread >= this.spreads.length) return null
    if (this.turn) this.cancelTurn()
    const current = this.spreads[this.spread]
    const destination = this.spreads[toSpread]
    const frontIndex = this.options.single
      ? current[0]
      : direction === 'forward'
        ? current[current.length - 1]
        : current[0]
    const backIndex = this.options.single
      ? destination[0]
      : direction === 'forward'
        ? destination[0]
        : destination[destination.length - 1]
    const front = this.options.pages[frontIndex]
    const back = this.options.pages[backIndex]
    if (!front || !back) return null
    const hard = front.dataset.density === 'hard' || back.dataset.density === 'hard'
    const turn: Turn = {
      fromSpread: this.spread,
      toSpread,
      direction,
      corner,
      progress: 0,
      pointerY: corner === 'top' ? 0 : this.options.height,
      preview,
      front,
      back,
      temporaryFace: null,
      hard,
    }
    this.turn = turn
    this.prepareTurn(turn)
    if (!preview) this.setTurning(true)
    this.paintTurn(turn)
    return turn
  }

  private prepareTurn(turn: Turn): void {
    this.paintStatic()
    this.stage.classList.toggle('bookFlipSoftActive', !turn.hard)
    const { width, height, single, pages } = this.options
    const destination = this.spreads[turn.toSpread]
    destination.forEach((index, slot) => {
      const page = pages[index]
      const x = single ? 0 : destination.length === 1 ? (index === 0 ? width : 0) : slot * width
      this.placePage(page, x, height, destination.length === 1 && index === 0 ? 'right' : slot === 0 ? 'left' : 'right')
      page.style.zIndex = '2'
    })
    const from = this.spreads[turn.fromSpread]
    from.forEach((index, slot) => {
      const page = pages[index]
      const x = single ? 0 : from.length === 1 ? (index === 0 ? width : 0) : slot * width
      this.placePage(page, x, height, from.length === 1 && index === 0 ? 'right' : slot === 0 ? 'left' : 'right')
      page.style.zIndex = '3'
    })
    const frontX = single ? 0 : turn.direction === 'forward' ? width : 0
    const backX = single ? 0 : turn.direction === 'forward' ? 0 : width
    this.placePage(turn.front, frontX, height, single || turn.direction === 'forward' ? 'right' : 'left')
    this.placePage(turn.back, backX, height, single || turn.direction === 'back' ? 'right' : 'left')
    if (!turn.hard) {
      if (single) {
        const temporaryFace = turn.front.cloneNode(true) as HTMLElement
        const originalScrollers = turn.front.querySelectorAll<HTMLElement>('[data-book-scroll]')
        const copiedScrollers = temporaryFace.querySelectorAll<HTMLElement>('[data-book-scroll]')
        originalScrollers.forEach((scroller, index) => {
          copiedScrollers[index].scrollTop = scroller.scrollTop
          copiedScrollers[index].scrollLeft = scroller.scrollLeft
        })
        temporaryFace.inert = true
        temporaryFace.setAttribute('aria-hidden', 'true')
        temporaryFace.removeAttribute('id')
        temporaryFace.querySelectorAll('[id]').forEach((element) => element.removeAttribute('id'))
        temporaryFace.style.pointerEvents = 'none'
        this.stage.insertBefore(temporaryFace, this.shadowMask)
        this.placePage(temporaryFace, frontX, height, 'right')
        temporaryFace.style.zIndex = '6'
        temporaryFace.classList.add('bookFlipMirrorContent')
        turn.temporaryFace = temporaryFace
      } else {
        turn.back.style.left = `${frontX}px`
        turn.back.classList.add('bookFlipMirrorContent')
      }
    }
    turn.front.classList.remove('--simple')
    turn.back.classList.remove('--simple')
    turn.front.style.zIndex = '5'
    turn.back.style.zIndex = '6'
    turn.front.style.backfaceVisibility = 'hidden'
    turn.back.style.backfaceVisibility = 'hidden'
  }

  private paintTurn(turn: Turn): void {
    const { width, height, single } = this.options
    const p = clamp(turn.progress, 0, 1)
    turn.progress = p
    let hasShadow = true
    if (turn.hard) {
      const angle = 180 * p
      const closingBackCover =
        single &&
        turn.direction === 'forward' &&
        turn.toSpread === this.spreads.length - 1 &&
        turn.back.dataset.density === 'hard'
      const closingFrontCover =
        single && turn.direction === 'back' && turn.toSpread === 0 && turn.back.dataset.density === 'hard'
      turn.front.style.clipPath = ''
      turn.back.style.clipPath = ''
      if (closingBackCover) {
        // The back board swings in from the right; the last inside page stays beneath it.
        turn.front.style.transform = ''
        turn.front.style.zIndex = '2'
        turn.back.style.transformOrigin = '100% 50%'
        turn.back.style.transform = `rotateY(${180 - angle}deg)`
        turn.back.style.zIndex = '5'
        turn.back.style.visibility = 'visible'
      } else if (closingFrontCover) {
        // The front board swings in from the left without lifting the first inside page.
        turn.front.style.transform = ''
        turn.front.style.zIndex = '2'
        turn.back.style.transformOrigin = '0 50%'
        turn.back.style.transform = `rotateY(${-180 + angle}deg)`
        turn.back.style.zIndex = '5'
        turn.back.style.visibility = 'visible'
      } else if (single) {
        turn.front.style.transformOrigin = turn.direction === 'forward' ? '0 50%' : '100% 50%'
        turn.front.style.transform = `rotateY(${turn.direction === 'forward' ? -angle : angle}deg)`
        turn.back.style.transform = ''
        turn.back.style.zIndex = '2'
        turn.back.style.visibility = 'visible'
        turn.front.style.visibility = p < 0.995 ? 'visible' : 'hidden'
      } else if (turn.direction === 'forward') {
        turn.front.style.transformOrigin = '0 50%'
        turn.front.style.transform = `rotateY(${-angle}deg)`
        turn.back.style.transformOrigin = '100% 50%'
        turn.back.style.transform = `rotateY(${180 - angle}deg)`
      } else {
        turn.front.style.transformOrigin = '100% 50%'
        turn.front.style.transform = `rotateY(${angle}deg)`
        turn.back.style.transformOrigin = '0 50%'
        turn.back.style.transform = `rotateY(${-180 + angle}deg)`
      }
      this.shadow.style.left = `${closingBackCover ? width : closingFrontCover ? 0 : turn.direction === 'forward' ? width * (single ? 0 : 1) : width * (single ? 1 : 0)}px`
      this.shadow.style.top = '0'
      this.shadow.style.width = `${Math.max(2, width * 0.1)}px`
      this.shadow.style.height = `${height}px`
      this.shadow.style.transform = `translateX(${turn.direction === 'forward' ? -p * width : p * width}px)`
      this.shadow.style.background = `linear-gradient(${turn.direction === 'forward' && !closingBackCover ? 'to right' : 'to left'}, rgb(0 0 0 / ${0.18 * Math.sin(Math.PI * p)}), transparent)`
    } else {
      hasShadow = this.paintSoftTurn(turn)
    }
    this.shadow.style.display = hasShadow && p > 0.001 && p < 0.999 ? 'block' : 'none'
    this.options.onFrame({
      from: this.spreads[turn.fromSpread][0],
      to: this.spreads[turn.toSpread][0],
      direction: turn.direction,
      progress: p,
      preview: turn.preview,
    })
  }

  private paintSoftTurn(turn: Turn): boolean {
    const { width, height, single } = this.options
    const localX = width * (1 - 2 * turn.progress)
    const geometry = calculateBookCurl({
      pageWidth: width,
      pageHeight: height,
      corner: turn.corner,
      pointer: { x: localX, y: turn.pointerY },
      direction: turn.direction,
    })
    turn.front.style.clipPath = geometry.frontClipPath
    turn.front.style.transform = ''
    const fold = turn.temporaryFace ?? turn.back
    fold.style.clipPath = geometry.flapClipPath
    fold.style.transformOrigin = '0 0'
    fold.style.transform = geometry.flapTransform
    fold.style.backfaceVisibility = 'visible'
    if (single) {
      turn.back.style.zIndex = '2'
    }
    if (!geometry.shadow) return false
    this.shadow.style.left = `${geometry.shadow.center.x + (single ? 0 : turn.direction === 'forward' ? width : 0)}px`
    this.shadow.style.top = `${geometry.shadow.center.y}px`
    this.shadow.style.width = `${Math.max(16, width * 0.16)}px`
    this.shadow.style.height = `${geometry.shadow.length + 2}px`
    this.shadow.style.transform = `translate(-50%, -50%) rotate(${geometry.shadow.angle - Math.PI / 2}rad)`
    this.shadow.style.background = `linear-gradient(90deg, transparent, rgb(0 0 0 / ${0.22 * Math.sin(Math.PI * turn.progress)}), transparent)`
    return true
  }

  private paintStatic(): void {
    const { pages, width, height, single } = this.options
    this.stage.classList.remove('bookFlipSoftActive')
    const spread = this.spreads[this.spread] ?? []
    pages.forEach((page, index) => {
      page.style.display = 'none'
      page.style.visibility = ''
      page.style.transform = ''
      page.style.transformOrigin = ''
      page.style.clipPath = ''
      page.style.backfaceVisibility = ''
      page.style.zIndex = ''
      page.classList.remove('--left', '--right', '--simple', 'bookFlipMirrorContent')
      const visible = spread.includes(index)
      page.inert = !visible
      page.setAttribute('aria-hidden', String(!visible))
    })
    spread.forEach((index, slot) => {
      const x = single ? 0 : spread.length === 1 ? (index === 0 ? width : 0) : slot * width
      const side = single ? 'right' : spread.length === 1 && index === 0 ? 'right' : slot === 0 ? 'left' : 'right'
      this.placePage(pages[index], x, height, side)
      pages[index].classList.add('--simple')
      pages[index].style.zIndex = '1'
    })
    this.shadow.style.display = 'none'
    if (!this.turn) this.options.onFrame(null)
  }

  private placePage(page: HTMLElement, x: number, height: number, side: 'left' | 'right'): void {
    page.style.display = 'block'
    page.style.position = 'absolute'
    page.style.left = `${x}px`
    page.style.top = '0'
    page.style.width = `${this.options.width}px`
    page.style.height = `${height}px`
    page.classList.toggle('--left', side === 'left')
    page.classList.toggle('--right', side === 'right')
  }

  private animateTo(target: number, commit: boolean, duration: number): void {
    const turn = this.turn
    if (!turn) return
    this.cancelAnimation()
    const token = this.animationToken
    const begin = performance.now()
    const start = turn.progress
    const startY = turn.pointerY
    const cornerY = turn.corner === 'top' ? 0 : this.options.height
    const actualDuration = Math.max(80, duration * Math.abs(target - start))
    const tick = (now: number) => {
      if (this.destroyed || token !== this.animationToken || this.turn !== turn) return
      const t = clamp((now - begin) / actualDuration, 0, 1)
      const interpolation = ease(t)
      turn.progress = start + (target - start) * interpolation
      turn.pointerY = startY + (cornerY - startY) * interpolation
      this.paintTurn(turn)
      if (t < 1) {
        this.animationFrame = requestAnimationFrame(tick)
      } else if (commit) {
        this.finishTurn()
      } else {
        this.cancelTurn()
      }
    }
    this.animationFrame = requestAnimationFrame(tick)
  }

  private finishTurn(): void {
    const turn = this.turn
    if (!turn) return
    this.cancelAnimation()
    this.spread = turn.toSpread
    turn.temporaryFace?.remove()
    this.turn = null
    this.paintStatic()
    this.options.onPage(this.getPage())
    this.setTurning(false)
  }

  private cancelTurn(): void {
    this.cancelAnimation()
    this.turn?.temporaryFace?.remove()
    this.turn = null
    this.paintStatic()
    this.setTurning(false)
  }

  private cancelPreview(): void {
    if (this.turn?.preview && (!this.animationFrame || this.previewAnimating)) this.animateTo(0, false, 180)
  }

  private cancelAnimation(): void {
    this.animationToken++
    cancelAnimationFrame(this.animationFrame)
    this.animationFrame = 0
    this.previewAnimating = false
    this.previewTarget = null
  }

  private updatePreview(turn: Turn, point: Point): void {
    const { width, height, single } = this.options
    const outerEdge = width * (single ? 1 : 2)
    const distanceFromEdge = turn.direction === 'forward' ? outerEdge - point.x : point.x
    const minPull = Math.min(50, width * 0.24)
    const maxPull = Math.min(85, width * 0.4)
    const pull = clamp(minPull + distanceFromEdge * 0.3, minPull, maxPull)
    const minCornerInset = Math.min(50, height * 0.15)
    const maxCornerInset = Math.min(75, height / 3)
    const verticalDistance = turn.corner === 'top' ? point.y : height - point.y
    const cornerInset = clamp(verticalDistance, minCornerInset, maxCornerInset)
    const target = {
      progress: pull / (2 * width),
      pointerY: turn.corner === 'top' ? cornerInset : height - cornerInset,
    }

    if (this.previewAnimating) {
      this.previewTarget = target
      return
    }
    if (
      !this.animationFrame &&
      Math.abs(turn.progress - target.progress) < 0.0001 &&
      Math.abs(turn.pointerY - target.pointerY) < 0.1
    )
      return

    // A returning corner can resume from its current pose instead of restarting flat.
    this.cancelAnimation()
    this.previewTarget = target
    this.previewAnimating = true
    const token = this.animationToken
    let previous = performance.now()
    const tick = (now: number) => {
      if (this.destroyed || token !== this.animationToken || this.turn !== turn || !this.previewTarget) return
      const follow = ease(clamp((now - previous) / 150, 0, 1))
      turn.progress += (this.previewTarget.progress - turn.progress) * follow
      turn.pointerY += (this.previewTarget.pointerY - turn.pointerY) * follow
      previous = now
      const settled =
        Math.abs(turn.progress - this.previewTarget.progress) < 0.0001 &&
        Math.abs(turn.pointerY - this.previewTarget.pointerY) < 0.1
      if (settled) {
        turn.progress = this.previewTarget.progress
        turn.pointerY = this.previewTarget.pointerY
      }
      this.paintTurn(turn)
      if (settled) {
        this.animationFrame = 0
        this.previewAnimating = false
        this.previewTarget = null
      } else {
        this.animationFrame = requestAnimationFrame(tick)
      }
    }
    this.animationFrame = requestAnimationFrame(tick)
  }

  private setTurning(turning: boolean): void {
    if (this.turning === turning) return
    this.turning = turning
    this.options.onTurning(turning)
  }

  private point(event: PointerEvent): Point {
    const rect = this.stage.getBoundingClientRect()
    return { x: event.clientX - rect.left, y: event.clientY - rect.top }
  }

  private hitCorner(point: Point): { direction: Direction; corner: Corner } | null {
    const { width, height, single } = this.options
    const totalWidth = width * (single ? 1 : 2)
    const reach = Math.hypot(width, height) / 5
    if (point.x < 0 || point.x > totalWidth || point.y < 0 || point.y > height) return null
    if (point.y > reach && point.y < height - reach) return null
    const direction = point.x < reach ? 'back' : point.x > totalWidth - reach ? 'forward' : null
    if (!direction) return null
    const target = this.spread + (direction === 'forward' ? 1 : -1)
    if (target < 0 || target >= this.spreads.length) return null
    return { direction, corner: point.y < height / 2 ? 'top' : 'bottom' }
  }

  private excludedTarget(event: PointerEvent): boolean {
    const target = event.target
    if (!(target instanceof Element)) return false
    if (target.closest('button, a, input, textarea, select, [contenteditable="true"]')) return true
    const scroller = target.closest<HTMLElement>('[data-book-scroll]')
    return !!scroller && scroller.scrollHeight > scroller.clientHeight + 1
  }

  private onPointerDown = (event: PointerEvent): void => {
    if (!this.interactive || this.turning || this.destroyed || event.button !== 0 || !event.isPrimary) return
    if (this.excludedTarget(event)) return
    const point = this.point(event)
    const corner = this.hitCorner(point)
    if (!corner && event.pointerType !== 'touch') return
    const direction =
      corner?.direction ?? (point.x < this.options.width * (this.options.single ? 0.5 : 1) ? 'back' : 'forward')
    this.pointer = {
      id: event.pointerId,
      kind: event.pointerType,
      start: point,
      direction,
      corner: corner?.corner ?? (point.y < this.options.height / 2 ? 'top' : 'bottom'),
      cornerHit: !!corner,
      startedAt: performance.now(),
      dragging: false,
      verticalGesture: false,
    }
    this.stage.setPointerCapture(event.pointerId)
    if (corner) event.preventDefault()
  }

  private onPointerMove = (event: PointerEvent): void => {
    const point = this.point(event)
    const pointer = this.pointer
    if (pointer && pointer.id === event.pointerId) {
      if (pointer.verticalGesture) return
      const dx = point.x - pointer.start.x
      const dy = point.y - pointer.start.y
      if (!pointer.dragging && Math.hypot(dx, dy) > 5) {
        if (pointer.kind === 'touch' && Math.abs(dy) > Math.abs(dx)) {
          pointer.verticalGesture = true
          this.cancelPreview()
          return
        }
        // A touch starting away from a corner is a swipe, not a paper grab.
        // Wait for the same distance required to commit it before showing a fold.
        if (!pointer.cornerHit && Math.abs(dx) < 35) return
        const direction = pointer.cornerHit ? pointer.direction : dx < 0 ? 'forward' : 'back'
        pointer.direction = direction
        if (!this.startTurn(direction, pointer.corner, false)) return
        pointer.dragging = true
      }
      if (pointer.dragging && this.turn) {
        event.preventDefault()
        const totalWidth = this.options.width * (this.options.single ? 1 : 2)
        const startEdge = pointer.direction === 'forward' ? totalWidth : 0
        this.turn.progress = clamp(
          (pointer.direction === 'forward' ? startEdge - point.x : point.x - startEdge) / totalWidth,
          0,
          1
        )
        this.turn.pointerY = clamp(point.y, 0, this.options.height)
        this.paintTurn(this.turn)
      }
      return
    }
    if (
      !this.interactive ||
      !this.showCorners ||
      this.options.reducedMotion ||
      event.pointerType === 'touch' ||
      this.turning
    )
      return
    const corner = this.hitCorner(point)
    const closesBackCover =
      corner?.direction === 'forward' &&
      this.spread === this.spreads.length - 2 &&
      this.options.pages.at(-1)?.dataset.density === 'hard'
    const closesFrontCover =
      corner?.direction === 'back' && this.spread === 1 && this.options.pages[0]?.dataset.density === 'hard'
    if (
      !corner ||
      closesFrontCover ||
      closesBackCover ||
      this.getPage() === 0 ||
      this.getPage() === this.options.pages.length - 1
    ) {
      this.cancelPreview()
      return
    }
    if (this.turn?.preview && this.turn.direction === corner.direction && this.turn.corner === corner.corner) {
      this.updatePreview(this.turn, point)
      return
    }
    const turn = this.startTurn(corner.direction, corner.corner, true)
    if (turn) this.updatePreview(turn, point)
  }

  private onPointerUp = (event: PointerEvent): void => {
    const pointer = this.pointer
    if (!pointer || pointer.id !== event.pointerId) return
    this.pointer = null
    if (this.stage.hasPointerCapture(event.pointerId)) this.stage.releasePointerCapture(event.pointerId)
    const point = this.point(event)
    const dx = point.x - pointer.start.x
    const dy = point.y - pointer.start.y
    if (
      !pointer.dragging &&
      (pointer.verticalGesture || (pointer.kind === 'touch' && Math.abs(dy) > 5 && Math.abs(dy) > Math.abs(dx)))
    )
      return
    const swipe =
      pointer.kind === 'touch' && Math.abs(dx) >= 35 && Math.abs(dy) < 70 && performance.now() - pointer.startedAt < 250
    if (pointer.dragging && this.turn) {
      const movedEnough = pointer.kind !== 'touch' || pointer.cornerHit || Math.abs(dx) >= 35
      const commit =
        movedEnough && (this.turn.progress >= 0.5 || (swipe && (dx < 0 ? 'forward' : 'back') === this.turn.direction))
      this.animateTo(commit ? 1 : 0, commit, 900)
    } else if (pointer.cornerHit) {
      this.navigate(this.spread + (pointer.direction === 'forward' ? 1 : -1), true, pointer.corner)
    } else if (swipe) {
      const direction = dx < 0 ? 'forward' : 'back'
      this.navigate(this.spread + (direction === 'forward' ? 1 : -1), true, pointer.corner)
    }
  }

  private onPointerCancel = (event: PointerEvent): void => {
    if (this.pointer?.id !== event.pointerId) return
    this.pointer = null
    if (this.turn) this.animateTo(0, false, 180)
  }

  private onPointerLeave = (): void => {
    if (!this.pointer) this.cancelPreview()
  }
}
