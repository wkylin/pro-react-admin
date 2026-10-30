import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Component, useEffect, useId, useMemo, useRef, useState, type ReactNode, type RefObject } from 'react'
import {
  BufferGeometry,
  BoxGeometry,
  CanvasTexture,
  Color,
  DoubleSide,
  ExtrudeGeometry,
  Float32BufferAttribute,
  MeshBasicMaterial,
  MeshStandardMaterial,
  Shape,
  SRGBColorSpace,
  type Group,
} from 'three'
import styles from './hardcoverScene.module.less'

const DEG = Math.PI / 180
const CAMERA_DISTANCE = 1800
const BOARD_DEPTH = 2
const COVER_OVERHANG = 4
const SPINE_WIDTH = 7
const SPINE_SHOULDER = 2
const END_BEVEL_SIZE = 0.5
const END_BEVEL_DEPTH = 2.5
const SPINE_WALL = 3

function getSpineBow(depth: number) {
  return Math.min(10, Math.max(0, depth - 18) * 0.2)
}

function getBindingCurve(depth: number) {
  return getSpineBow(depth) * 0.8
}

function getBindingLeft(width: number, depth: number) {
  return -width / 2 - SPINE_WIDTH / 2 + SPINE_SHOULDER - getSpineBow(depth) + SPINE_WALL
}

function getBindingInset(z: number, halfDepth: number, curve: number) {
  const ratio = Math.min(1, Math.abs(z) / halfDepth)
  return curve * (1 - Math.sqrt(1 - ratio * ratio))
}

function getHingeWidth(width: number) {
  return Math.min(64, Math.max(28, width * 0.14))
}

export interface HardcoverSnapshot {
  src: string
  width: number
  height: number
  left: number
  top: number
}

interface HardcoverSceneProps {
  width: number
  height: number
  depth: number
  viewportWidth: number
  front: ReactNode
  back: ReactNode
  spine: ReactNode
  coverColor: string
  backCoverColor: string
  spineColor: string
  active: boolean
  pitch: number
  yaw: number
  dragging?: boolean
  captureBackCover?: boolean
  captureFrontCover?: boolean
  snapshotRequest?: number
  textureKey: string
  turningToFront?: boolean
  frontYaw?: number
  onTurnComplete?: () => void
  onPending?: () => void
  onReady?: (snapshot?: HardcoverSnapshot) => void
  onFailure?: () => void
}

class CanvasFallback extends Component<{ children: ReactNode; onFailure: () => void }, { failed: boolean }> {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  componentDidCatch() {
    this.props.onFailure()
  }

  render() {
    return this.state.failed ? null : this.props.children
  }
}

function ContextLossFallback({ onFailure }: { onFailure: () => void }) {
  const renderer = useThree((state) => state.gl)
  const onFailureRef = useRef(onFailure)
  onFailureRef.current = onFailure
  useEffect(() => {
    const canvas = renderer.domElement
    const handleContextLost = (event: Event) => {
      event.preventDefault()
      onFailureRef.current()
    }
    canvas.addEventListener('webglcontextlost', handleContextLost)
    return () => canvas.removeEventListener('webglcontextlost', handleContextLost)
  }, [renderer])
  return null
}

function SceneReady({
  onReady,
  captureSide,
  width,
  height,
  viewportWidth,
  bleed,
  revision,
  snapshotRequest,
  modelRef,
}: {
  onReady: (snapshot?: HardcoverSnapshot) => void
  captureSide?: 'front' | 'back'
  width: number
  height: number
  viewportWidth: number
  bleed: number
  revision: object
  snapshotRequest: number
  modelRef: RefObject<Group | null>
}) {
  const captureKey = useMemo(
    () => ({ captureSide, width, height, viewportWidth, bleed, revision, snapshotRequest }),
    [captureSide, width, height, viewportWidth, bleed, revision, snapshotRequest]
  )
  const invalidate = useThree((state) => state.invalidate)
  // The prepared scene uses demand rendering. A new snapshot request can leave
  // every mesh property unchanged, so explicitly schedule its capture frame.
  useEffect(() => invalidate(), [captureKey, invalidate])
  const reported = useRef<object | null>(null)
  const generation = useRef(0)
  const frame = useRef(0)
  const onReadyRef = useRef(onReady)
  onReadyRef.current = onReady
  useFrame(({ gl, scene, camera }) => {
    if (reported.current === captureKey) return
    reported.current = captureKey
    const token = ++generation.current
    cancelAnimationFrame(frame.current)
    const notify = (snapshot?: HardcoverSnapshot) => {
      if (token !== generation.current) return
      frame.current = requestAnimationFrame(() => onReadyRef.current(snapshot))
    }
    if (!captureSide) {
      notify()
      return
    }
    const model = modelRef.current
    if (!model) {
      notify()
      return
    }
    // Capture the canonical flat board, including after edits at a rotated viewing angle.
    // Restore the user's pose before R3F paints the visible frame.
    // Preserve Euler axes as well as orientation: quaternion restoration can rewrite
    // a back-facing pose as X/Z = PI, which changes the per-axis preview animation.
    const rotation = model.rotation.clone()
    const position = model.position.clone()
    let snapshot: HardcoverSnapshot
    try {
      model.rotation.set(0, captureSide === 'back' ? Math.PI : 0, 0)
      model.position.set(0, 0, 0)
      gl.render(scene, camera)
      snapshot = {
        src: gl.domElement.toDataURL(),
        width: viewportWidth,
        height: height + 2 * bleed,
        left: (width - viewportWidth) / 2,
        top: -bleed,
      }
    } catch {
      notify()
      return
    } finally {
      model.rotation.copy(rotation)
      model.position.copy(position)
    }
    const image = new Image()
    image.src = snapshot.src
    void image.decode().then(
      () => notify(snapshot),
      () => notify()
    )
  })
  useEffect(
    () => () => {
      generation.current++
      cancelAnimationFrame(frame.current)
    },
    []
  )
  return null
}

function makePageTexture(vertical: boolean, bindingColor?: string, pageWidth?: number) {
  const canvas = document.createElement('canvas')
  canvas.width = 128
  canvas.height = 128
  const context = canvas.getContext('2d')!
  context.fillStyle = '#f6f3eb'
  context.fillRect(0, 0, 128, 128)
  for (let position = 0; position < 128; position += 4) {
    context.fillStyle = position % 16 === 0 ? '#cfcac0' : '#e1ddd4'
    if (vertical) context.fillRect(position, 0, 1, 128)
    else context.fillRect(0, position, 128, 1)
  }
  if (!vertical && bindingColor && pageWidth) {
    const bandWidth = Math.max(0.5, Math.min(2, (128 * 2.5) / pageWidth))
    const headband = context.createLinearGradient(0, 0, bandWidth, 0)
    headband.addColorStop(0, bindingColor)
    headband.addColorStop(0.45, bindingColor)
    headband.addColorStop(1, '#f6f3eb')
    context.fillStyle = headband
    context.fillRect(0, 0, bandWidth, 128)
  }
  const texture = new CanvasTexture(canvas)
  texture.colorSpace = SRGBColorSpace
  return texture
}

function makeHingeTexture(spineCanvas: HTMLCanvasElement, front: boolean) {
  const canvas = document.createElement('canvas')
  canvas.width = 128
  canvas.height = spineCanvas.height
  const context = canvas.getContext('2d')!
  const edge = front ? spineCanvas.width - 1 : 0
  context.drawImage(spineCanvas, edge, 0, 1, spineCanvas.height, 0, 0, canvas.width, canvas.height)

  const from = front ? 0 : canvas.width
  const to = front ? canvas.width : 0
  const opacity = context.createLinearGradient(from, 0, to, 0)
  opacity.addColorStop(0, 'rgba(255, 255, 255, 0.88)')
  opacity.addColorStop(0.12, 'rgba(255, 255, 255, 0.8)')
  opacity.addColorStop(0.36, 'rgba(255, 255, 255, 0.56)')
  opacity.addColorStop(0.68, 'rgba(255, 255, 255, 0.2)')
  opacity.addColorStop(1, 'rgba(255, 255, 255, 0)')
  context.globalCompositeOperation = 'destination-in'
  context.fillStyle = opacity
  context.fillRect(0, 0, canvas.width, canvas.height)

  context.globalCompositeOperation = 'source-over'
  const fold = context.createLinearGradient(from, 0, to, 0)
  fold.addColorStop(0, 'rgba(0, 0, 0, 0.08)')
  fold.addColorStop(0.12, 'rgba(0, 0, 0, 0.03)')
  fold.addColorStop(0.22, 'rgba(255, 255, 255, 0.1)')
  fold.addColorStop(0.36, 'rgba(0, 0, 0, 0.07)')
  fold.addColorStop(0.72, 'rgba(0, 0, 0, 0.02)')
  fold.addColorStop(1, 'rgba(0, 0, 0, 0)')
  context.fillStyle = fold
  context.fillRect(0, 0, canvas.width, canvas.height)

  const texture = new CanvasTexture(canvas)
  texture.colorSpace = SRGBColorSpace
  texture.anisotropy = 8
  return texture
}

function makeHingeGeometry(width: number, height: number, depth: number, front: boolean) {
  const shoulder = -width / 2 - SPINE_WIDTH / 2 + SPINE_SHOULDER
  const outer = depth / 2 + BOARD_DEPTH
  const bow = getSpineBow(depth)
  const hingeWidth = getHingeWidth(width)
  const side = front ? 1 : -1
  const arcAngle = bow > 1 ? Math.min(0.46, 0.16 + bow * 0.03) * Math.min(1, (bow - 1) / 2) : 0
  const arcLength = bow * arcAngle
  const columns: Array<{ x: number; z: number; normalX: number; normalZ: number; u: number; opacity: number }> = []

  if (arcAngle > 0) {
    for (let step = 0; step < 8; step += 1) {
      const delta = arcAngle * (1 - step / 8)
      const normalX = -Math.sin(delta) / bow
      const normalZ = (side * Math.cos(delta)) / outer
      const length = Math.hypot(normalX, normalZ)
      columns.push({
        x: shoulder - bow * Math.sin(delta),
        z: side * outer * Math.cos(delta),
        normalX: normalX / length,
        normalZ: normalZ / length,
        u: (arcLength * (step / 8)) / (arcLength + hingeWidth),
        opacity: Math.sin(((step / 8) * Math.PI) / 2),
      })
    }
  }
  for (let step = 0; step <= 8; step += 1) {
    const distance = (hingeWidth * step) / 8
    columns.push({
      x: shoulder + distance,
      z: side * outer,
      normalX: 0,
      normalZ: side,
      u: (arcLength + distance) / (arcLength + hingeWidth),
      opacity: 1,
    })
  }

  const straightHalfHeight = (height + 2 * COVER_OVERHANG - 2 * END_BEVEL_DEPTH) / 2
  const shellHalfHeight = height / 2 + COVER_OVERHANG
  const bevelRows = [Math.PI / 2, Math.PI / 3, Math.PI / 6]
  const rows = [
    ...bevelRows.map((angle) => ({
      y: -straightHalfHeight - END_BEVEL_DEPTH * Math.sin(angle),
      offset: END_BEVEL_SIZE * Math.cos(angle),
      opacity: Math.cos(angle),
    })),
    { y: -straightHalfHeight, offset: END_BEVEL_SIZE, opacity: 1 },
    { y: straightHalfHeight, offset: END_BEVEL_SIZE, opacity: 1 },
    ...[...bevelRows].reverse().map((angle) => ({
      y: straightHalfHeight + END_BEVEL_DEPTH * Math.sin(angle),
      offset: END_BEVEL_SIZE * Math.cos(angle),
      opacity: Math.cos(angle),
    })),
  ]
  const positions: number[] = []
  const uvs: number[] = []
  const colors: number[] = []
  const indices: number[] = []
  for (const row of rows) {
    for (const column of columns) {
      const offset = row.offset + 0.12
      positions.push(column.x + column.normalX * offset, row.y, column.z + column.normalZ * offset)
      uvs.push(front ? column.u : 1 - column.u, (row.y + shellHalfHeight) / (2 * shellHalfHeight))
      colors.push(1, 1, 1, row.opacity * column.opacity)
    }
  }
  for (let row = 0; row < rows.length - 1; row += 1) {
    for (let column = 0; column < columns.length - 1; column += 1) {
      const lower = row * columns.length + column
      const upper = lower + columns.length
      if (front) indices.push(lower, lower + 1, upper, lower + 1, upper + 1, upper)
      else indices.push(lower, upper, lower + 1, lower + 1, upper, upper + 1)
    }
  }
  const geometry = new BufferGeometry()
  geometry.setAttribute('position', new Float32BufferAttribute(positions, 3))
  geometry.setAttribute('uv', new Float32BufferAttribute(uvs, 2))
  geometry.setAttribute('color', new Float32BufferAttribute(colors, 4))
  geometry.setIndex(indices)
  geometry.computeVertexNormals()
  return geometry
}

function useCanvasTexture(canvas: HTMLCanvasElement | null) {
  const texture = useMemo(() => {
    if (!canvas) return null
    const next = new CanvasTexture(canvas)
    next.colorSpace = SRGBColorSpace
    next.anisotropy = 8
    return next
  }, [canvas])
  useEffect(() => () => texture?.dispose(), [texture])
  return texture
}

function HardcoverModel({
  groupRef,
  width,
  height,
  depth,
  coverColor,
  backCoverColor,
  spineColor,
  frontCanvas,
  backCanvas,
  spineCanvas,
  pitch,
  yaw,
  dragging,
  turningToFront,
  frontYaw,
  onTurnComplete,
}: Pick<
  HardcoverSceneProps,
  | 'width'
  | 'height'
  | 'depth'
  | 'coverColor'
  | 'backCoverColor'
  | 'spineColor'
  | 'pitch'
  | 'yaw'
  | 'dragging'
  | 'turningToFront'
  | 'frontYaw'
  | 'onTurnComplete'
> & {
  groupRef: RefObject<Group | null>
  frontCanvas: HTMLCanvasElement | null
  backCanvas: HTMLCanvasElement | null
  spineCanvas: HTMLCanvasElement | null
}) {
  const initializedRef = useRef(false)
  const turnRef = useRef<{ start: number; from: number; to: number } | null>(null)
  const completedRef = useRef(false)
  const onTurnCompleteRef = useRef(onTurnComplete)
  onTurnCompleteRef.current = onTurnComplete
  const { invalidate } = useThree()
  const frontTexture = useCanvasTexture(frontCanvas)
  const backTexture = useCanvasTexture(backCanvas)
  const spineTexture = useCanvasTexture(spineCanvas)
  const frontHingeTexture = useMemo(() => (spineCanvas ? makeHingeTexture(spineCanvas, true) : null), [spineCanvas])
  const backHingeTexture = useMemo(() => (spineCanvas ? makeHingeTexture(spineCanvas, false) : null), [spineCanvas])
  const frontHingeGeometry = useMemo(() => makeHingeGeometry(width, height, depth, true), [width, height, depth])
  const backHingeGeometry = useMemo(() => makeHingeGeometry(width, height, depth, false), [width, height, depth])
  useEffect(() => () => frontHingeTexture?.dispose(), [frontHingeTexture])
  useEffect(() => () => backHingeTexture?.dispose(), [backHingeTexture])
  useEffect(() => () => frontHingeGeometry.dispose(), [frontHingeGeometry])
  useEffect(() => () => backHingeGeometry.dispose(), [backHingeGeometry])
  const foreedgeTexture = useMemo(() => makePageTexture(true), [])
  const headTexture = useMemo(
    () => makePageTexture(false, spineColor, width / 2 - 1 - getBindingLeft(width, depth)),
    [spineColor, width, depth]
  )
  useEffect(
    () => () => {
      foreedgeTexture.dispose()
      headTexture.dispose()
    },
    [foreedgeTexture, headTexture]
  )

  const geometry = useMemo(() => {
    const left = -width / 2 - SPINE_WIDTH / 2
    const shoulder = left + SPINE_SHOULDER
    const innerLeft = getBindingLeft(width, depth)
    const right = width / 2 + COVER_OVERHANG
    const frontOuter = depth / 2 + BOARD_DEPTH
    const frontInner = depth / 2
    const backInner = -depth / 2
    const backOuter = -depth / 2 - BOARD_DEPTH
    const spineBow = getSpineBow(depth)
    const bindingCurve = getBindingCurve(depth)
    const shellHeight = height + 2 * COVER_OVERHANG
    const straightHeight = height + 2 * COVER_OVERHANG - 2 * END_BEVEL_DEPTH
    const outline = new Shape()
    outline.moveTo(shoulder, frontOuter)
    outline.lineTo(right, frontOuter)
    outline.lineTo(right, frontInner)
    outline.lineTo(innerLeft + bindingCurve, frontInner)
    if (bindingCurve > 0)
      outline.absellipse(innerLeft + bindingCurve, 0, bindingCurve, frontInner, Math.PI / 2, (3 * Math.PI) / 2)
    else outline.lineTo(innerLeft, backInner)
    outline.lineTo(right, backInner)
    outline.lineTo(right, backOuter)
    outline.lineTo(shoulder, backOuter)
    if (spineBow > 0) outline.absellipse(shoulder, 0, spineBow, frontOuter, -Math.PI / 2, (-3 * Math.PI) / 2, true)
    else outline.lineTo(shoulder, frontOuter)
    outline.closePath()
    const mesh = new ExtrudeGeometry(outline, {
      depth: straightHeight,
      bevelEnabled: true,
      bevelThickness: END_BEVEL_DEPTH,
      bevelSize: END_BEVEL_SIZE,
      bevelSegments: 3,
      curveSegments: 24,
      steps: 1,
    })
    mesh.rotateX(Math.PI / 2)
    mesh.translate(0, straightHeight / 2, 0)
    const positions = mesh.getAttribute('position')
    const uvs = mesh.getAttribute('uv')
    const surfaceNormals = mesh.getAttribute('normal')
    const outerZ = frontOuter + END_BEVEL_SIZE
    const sideGroups = mesh.groups.filter((group) => group.materialIndex === 1)
    mesh.clearGroups()
    let groupStart = 0
    let currentSurface = -1
    for (let start = 0; start < positions.count; start += 3) {
      const onPlane = (axis: 'x' | 'z', coordinate: number) =>
        [0, 1, 2].every(
          (offset) =>
            Math.abs((axis === 'x' ? positions.getX(start + offset) : positions.getZ(start + offset)) - coordinate) <
            0.01
        )
      const isSide = sideGroups.some((group) => start >= group.start && start < group.start + group.count)
      const onSpine =
        [0, 1, 2].every((offset) => positions.getX(start + offset) <= shoulder + 0.1) &&
        [0, 1, 2].some((offset) => surfaceNormals.getX(start + offset) < -0.01)
      const surface = !isSide ? 0 : onPlane('z', outerZ) ? 1 : onPlane('z', -outerZ) ? 2 : onSpine ? 3 : 0
      if (surface !== currentSurface) {
        if (currentSurface >= 0) mesh.addGroup(groupStart, start - groupStart, currentSurface)
        groupStart = start
        currentSurface = surface
      }
      if (surface === 0) continue
      for (let offset = 0; offset < 3; offset += 1) {
        const vertex = start + offset
        const x = positions.getX(vertex)
        const y = positions.getY(vertex)
        const z = positions.getZ(vertex)
        const u =
          surface === 1
            ? (x - left) / (right - left)
            : surface === 2
              ? (right - x) / (right - left)
              : Math.max(0, Math.min(1, (z + outerZ) / (2 * outerZ)))
        uvs.setXY(vertex, u, (y + shellHeight / 2) / shellHeight)
      }
    }
    mesh.addGroup(groupStart, positions.count - groupStart, currentSurface)
    uvs.needsUpdate = true
    mesh.computeVertexNormals()
    const normals = mesh.getAttribute('normal')
    for (const group of mesh.groups) {
      if (group.materialIndex !== 3) continue
      for (let vertex = group.start; vertex < group.start + group.count; vertex += 1) {
        const x = positions.getX(vertex)
        const y = positions.getY(vertex)
        const z = positions.getZ(vertex)
        const normalX = spineBow > 0 ? (x - shoulder) / (spineBow + END_BEVEL_SIZE) ** 2 : -1
        const normalZ = spineBow > 0 ? z / outerZ ** 2 : 0
        const length = Math.hypot(normalX, normalZ) || 1
        const endProgress = Math.min(1, Math.max(0, (Math.abs(y) - straightHeight / 2) / END_BEVEL_DEPTH))
        const sideWeight = Math.cos((endProgress * Math.PI) / 2)
        normals.setXYZ(
          vertex,
          (normalX / length) * sideWeight,
          Math.sign(y) * Math.sin((endProgress * Math.PI) / 2),
          (normalZ / length) * sideWeight
        )
      }
    }
    normals.needsUpdate = true
    const frontBoardColor = new Color(coverColor)
    const backBoardColor = new Color(backCoverColor)
    const bindingColor = new Color(spineColor)
    const vertexColor = new Color()
    const hingeWidth = getHingeWidth(width)
    const colors = new Float32Array(positions.count * 3)
    for (let vertex = 0; vertex < positions.count; vertex += 1) {
      const blend = Math.min(1, Math.max(0, (positions.getX(vertex) - shoulder) / hingeWidth))
      vertexColor.copy(bindingColor).lerp(positions.getZ(vertex) >= 0 ? frontBoardColor : backBoardColor, blend)
      colors[vertex * 3] = vertexColor.r
      colors[vertex * 3 + 1] = vertexColor.g
      colors[vertex * 3 + 2] = vertexColor.b
    }
    mesh.setAttribute('color', new Float32BufferAttribute(colors, 3))
    return mesh
  }, [width, height, depth, coverColor, backCoverColor, spineColor])
  useEffect(() => () => geometry.dispose(), [geometry])

  const coverMaterials = useMemo(
    () => [
      new MeshStandardMaterial({ vertexColors: true, roughness: 0.82, metalness: 0.02, side: DoubleSide }),
      new MeshBasicMaterial({
        map: frontTexture,
        color: frontTexture ? '#fff' : coverColor,
        toneMapped: false,
        side: DoubleSide,
      }),
      new MeshBasicMaterial({
        map: backTexture,
        color: backTexture ? '#fff' : coverColor,
        toneMapped: false,
        side: DoubleSide,
      }),
      new MeshStandardMaterial({
        map: spineTexture,
        color: spineTexture ? '#fff' : coverColor,
        roughness: 0.92,
        metalness: 0,
        side: DoubleSide,
      }),
    ],
    [coverColor, frontTexture, backTexture, spineTexture]
  )
  useEffect(() => () => coverMaterials.forEach((material) => material.dispose()), [coverMaterials])

  const paperMaterials = useMemo(
    () => [
      new MeshBasicMaterial({ map: foreedgeTexture, toneMapped: false }),
      new MeshBasicMaterial({ color: '#f6f3eb', toneMapped: false }),
      new MeshBasicMaterial({ map: headTexture, toneMapped: false }),
      new MeshBasicMaterial({ map: headTexture, toneMapped: false }),
      new MeshBasicMaterial({ color: '#f6f3eb', toneMapped: false }),
      new MeshBasicMaterial({ color: '#f6f3eb', toneMapped: false }),
    ],
    [foreedgeTexture, headTexture]
  )
  useEffect(() => () => paperMaterials.forEach((material) => material.dispose()), [paperMaterials])

  const targetPitch = -pitch * DEG
  const targetYaw = yaw * DEG
  useEffect(() => {
    const group = groupRef.current
    if (!group) return
    if (!initializedRef.current) {
      group.rotation.set(targetPitch, targetYaw, 0, 'XYZ')
      initializedRef.current = true
    }
    invalidate()
  }, [targetPitch, targetYaw, invalidate, groupRef])

  useEffect(() => {
    if (!turningToFront) {
      turnRef.current = null
      completedRef.current = false
      return
    }
    const group = groupRef.current
    if (!group) return
    const from = group.rotation.y
    let to = (frontYaw ?? 0) * DEG
    while (to < from) to += 2 * Math.PI
    turnRef.current = { start: performance.now(), from, to }
    completedRef.current = false
    invalidate()
  }, [turningToFront, frontYaw, invalidate, groupRef])

  useFrame((state, delta) => {
    const group = groupRef.current
    if (!group) return
    const turn = turnRef.current
    if (turn) {
      const progress = Math.min(1, (performance.now() - turn.start) / 850)
      const eased = 1 - (1 - progress) ** 3
      group.rotation.y = turn.from + (turn.to - turn.from) * eased
      group.rotation.x += (targetPitch - group.rotation.x) * Math.min(1, delta * 12)
      group.position.y = 8 * Math.sin(Math.PI * progress)
      if (progress < 1) state.invalidate()
      else if (!completedRef.current) {
        completedRef.current = true
        onTurnCompleteRef.current?.()
      }
      return
    }
    // A demand-rendered scene can resume after seconds of idle time.
    // Treat that first frame as an animation frame, not time to skip through.
    const factor = dragging ? 1 : 1 - Math.exp(-6 * Math.min(delta, 1 / 30))
    group.rotation.x += (targetPitch - group.rotation.x) * factor
    group.rotation.y += (targetYaw - group.rotation.y) * factor
    group.position.y = 0
    if (Math.abs(group.rotation.x - targetPitch) > 0.001 || Math.abs(group.rotation.y - targetYaw) > 0.001)
      state.invalidate()
  })

  const innerLeft = getBindingLeft(width, depth)
  const right = width / 2 + COVER_OVERHANG
  const paperWidth = width / 2 - 1 - innerLeft
  const paperCenter = (innerLeft + right - COVER_OVERHANG - 1) / 2
  const paperGeometry = useMemo(() => {
    const mesh = new BoxGeometry(paperWidth, height - 2, depth - 0.8, 1, 1, 32)
    const positions = mesh.getAttribute('position')
    const bindingCurve = getBindingCurve(depth)
    for (let vertex = 0; vertex < positions.count; vertex += 1) {
      if (Math.abs(positions.getX(vertex) + paperWidth / 2) > 0.001) continue
      // Keep the two differently sampled curves slightly overlapped so no light leaks through the binding.
      positions.setX(vertex, -paperWidth / 2 + getBindingInset(positions.getZ(vertex), depth / 2, bindingCurve) - 0.3)
    }
    positions.needsUpdate = true
    mesh.computeVertexNormals()
    mesh.computeBoundingSphere()
    return mesh
  }, [paperWidth, height, depth])
  useEffect(() => () => paperGeometry.dispose(), [paperGeometry])

  // Match the flat flip-engine cover's projected size at the renderer handoff.
  const projectionScale = 1 - (depth / 2 + BOARD_DEPTH + END_BEVEL_SIZE) / CAMERA_DISTANCE
  const coverWidth = width + COVER_OVERHANG + SPINE_WIDTH / 2 - SPINE_SHOULDER + END_BEVEL_SIZE

  return (
    <group
      ref={groupRef}
      scale={[(projectionScale * width) / coverWidth, (projectionScale * height) / (height + 2 * COVER_OVERHANG), 1]}
    >
      <mesh geometry={geometry} material={coverMaterials} />
      <mesh geometry={paperGeometry} position={[paperCenter, 0, 0]} material={paperMaterials} />
      {frontHingeTexture && (
        <mesh geometry={frontHingeGeometry}>
          <meshStandardMaterial
            map={frontHingeTexture}
            transparent
            vertexColors
            roughness={0.92}
            metalness={0}
            side={DoubleSide}
            depthWrite={false}
          />
        </mesh>
      )}
      {backHingeTexture && (
        <mesh geometry={backHingeGeometry}>
          <meshStandardMaterial
            map={backHingeTexture}
            transparent
            vertexColors
            roughness={0.92}
            metalness={0}
            side={DoubleSide}
            depthWrite={false}
          />
        </mesh>
      )}
    </group>
  )
}

export function HardcoverScene({
  width,
  height,
  depth,
  viewportWidth,
  front,
  back,
  spine,
  coverColor,
  backCoverColor,
  spineColor,
  active,
  pitch,
  yaw,
  dragging = false,
  captureBackCover = false,
  captureFrontCover = false,
  snapshotRequest = 0,
  textureKey,
  turningToFront = false,
  frontYaw,
  onTurnComplete,
  onPending,
  onReady,
  onFailure,
}: HardcoverSceneProps) {
  const sourceId = useId().replaceAll(':', '')
  const frontId = `${sourceId}-front`
  const backId = `${sourceId}-back`
  const spineId = `${sourceId}-spine`
  const frontRef = useRef<HTMLDivElement>(null)
  const backRef = useRef<HTMLDivElement>(null)
  const spineRef = useRef<HTMLDivElement>(null)
  const modelRef = useRef<Group>(null)
  const [canRender, setCanRender] = useState(false)
  const [painted, setPainted] = useState(false)
  const [capturePending, setCapturePending] = useState(false)
  const [canvases, setCanvases] = useState<{
    front: HTMLCanvasElement
    back: HTMLCanvasElement
    spine: HTMLCanvasElement
  } | null>(null)
  const onReadyRef = useRef(onReady)
  onReadyRef.current = onReady
  const onPendingRef = useRef(onPending)
  onPendingRef.current = onPending
  const onFailureRef = useRef(onFailure)
  onFailureRef.current = onFailure
  const failedRef = useRef(false)

  useEffect(() => {
    onPendingRef.current?.()
    try {
      const probe = document.createElement('canvas')
      const context = probe.getContext('webgl2')
      const supported = Boolean(context)
      context?.getExtension('WEBGL_lose_context')?.loseContext()
      setCanRender(supported)
      if (!supported) {
        failedRef.current = true
        onFailureRef.current?.()
      }
    } catch {
      failedRef.current = true
      onFailureRef.current?.()
    }
  }, [])

  useEffect(() => {
    if (!canRender) return
    let cancelled = false
    let timer = 0
    let latestCapture = 0
    for (const node of [frontRef.current, backRef.current, spineRef.current]) {
      for (const image of node?.querySelectorAll('img') ?? []) image.loading = 'eager'
    }
    const capture = async (captureId: number) => {
      const nodes = [frontRef.current, backRef.current, spineRef.current].filter((node): node is HTMLDivElement =>
        Boolean(node)
      )
      if (nodes.length !== 3) return
      try {
        for (const image of nodes.flatMap((node) => Array.from(node?.querySelectorAll('img') ?? []))) {
          if (image.loading !== 'eager') image.loading = 'eager'
        }
        await document.fonts.ready
        await Promise.all(
          nodes.flatMap((node) =>
            Array.from(node?.querySelectorAll('img') ?? [], (image) => image.decode().catch(() => undefined))
          )
        )
        const { toCanvas } = await import('html-to-image')
        const result = await Promise.all(
          nodes.map((node) =>
            toCanvas(node, {
              pixelRatio: Math.min(2, window.devicePixelRatio || 1),
            })
          )
        )
        if (cancelled || captureId !== latestCapture) return
        setCanvases({ front: result[0], back: result[1], spine: result[2] })
        setCapturePending(false)
      } catch (error) {
        if (cancelled || captureId !== latestCapture) return
        console.error('InteractiveBook 3D texture capture failed', error)
        setCanvases(null)
        setPainted(false)
        failedRef.current = true
        onFailureRef.current?.()
      }
    }
    const schedule = () => {
      window.clearTimeout(timer)
      setCapturePending(true)
      onPendingRef.current?.()
      const captureId = ++latestCapture
      timer = window.setTimeout(() => capture(captureId), 50)
    }
    const observer = new MutationObserver(schedule)
    for (const node of [frontRef.current, backRef.current, spineRef.current]) {
      if (node) observer.observe(node, { childList: true, characterData: true, attributes: true, subtree: true })
    }
    schedule()
    return () => {
      cancelled = true
      observer.disconnect()
      window.clearTimeout(timer)
    }
  }, [canRender, width, height, depth, textureKey, frontId, backId, spineId])

  const cameraDistance = CAMERA_DISTANCE
  // Keep the WebGL raster and its DOM snapshot on the same pixel grid.
  // Fractional canvas heights make Chromium resample the two surfaces differently.
  const bleed = Math.ceil(Math.max(90, height * 0.3))
  // A rotated board and its spine extend beyond a single page's layout box.
  // Widen the raster symmetrically without changing the model's pixel scale.
  const horizontalBleed = Math.ceil(Math.max(48, width * 0.3, depth))
  const canvasWidth = viewportWidth + 2 * horizontalBleed
  const canvasHeight = height + 2 * bleed
  const fov = (2 * Math.atan(canvasHeight / (2 * cameraDistance))) / DEG

  return (
    <div className={styles.scene} data-book-mesh data-book-mesh-ready={painted} data-book-mesh-active={active}>
      <div className={styles.textureSources} aria-hidden="true" inert>
        <div
          id={frontId}
          ref={frontRef}
          className={styles.textureFace}
          style={{ width: width + COVER_OVERHANG + SPINE_WIDTH / 2, height: height + 2 * COVER_OVERHANG }}
        >
          {front}
        </div>
        <div
          id={backId}
          ref={backRef}
          className={styles.textureFace}
          style={{ width: width + COVER_OVERHANG + SPINE_WIDTH / 2, height: height + 2 * COVER_OVERHANG }}
        >
          {back}
        </div>
        <div
          id={spineId}
          ref={spineRef}
          className={styles.textureFace}
          data-book-spine-texture
          data-book-thin-spine={depth < 18 ? 'true' : undefined}
          style={{ width: depth + 2 * BOARD_DEPTH, height: height + 2 * COVER_OVERHANG }}
        >
          {spine}
        </div>
      </div>
      {canRender && canvases && (
        <CanvasFallback
          onFailure={() => {
            failedRef.current = true
            setPainted(false)
            onFailureRef.current?.()
          }}
        >
          <Canvas
            className={styles.canvas}
            camera={{ position: [0, 0, cameraDistance], fov, near: cameraDistance / 2, far: cameraDistance * 1.5 }}
            dpr={[1, 2]}
            frameloop="demand"
            gl={{ alpha: true, antialias: true }}
            // Override R3F's inline `auto`: input belongs to the reader and cover button,
            // including while this transparent scene is prewarmed above the pages.
            style={{
              width: canvasWidth,
              height: canvasHeight,
              left: -horizontalBleed,
              top: -bleed,
              pointerEvents: 'none',
            }}
          >
            <ContextLossFallback
              onFailure={() => {
                failedRef.current = true
                setPainted(false)
                onFailureRef.current?.()
              }}
            />
            <ambientLight intensity={2.2} />
            <directionalLight position={[-width, height, cameraDistance / 2]} intensity={1.2} />
            <directionalLight position={[width, -height, -cameraDistance / 3]} intensity={0.4} />
            <HardcoverModel
              groupRef={modelRef}
              width={width}
              height={height}
              depth={depth}
              coverColor={coverColor}
              backCoverColor={backCoverColor}
              spineColor={spineColor}
              frontCanvas={canvases?.front ?? null}
              backCanvas={canvases?.back ?? null}
              spineCanvas={canvases?.spine ?? null}
              pitch={pitch}
              yaw={yaw}
              dragging={dragging}
              turningToFront={turningToFront}
              frontYaw={frontYaw}
              onTurnComplete={onTurnComplete}
            />
            {!capturePending && (
              <SceneReady
                captureSide={captureBackCover ? 'back' : captureFrontCover ? 'front' : undefined}
                width={width}
                height={height}
                viewportWidth={canvasWidth}
                bleed={bleed}
                revision={canvases}
                snapshotRequest={snapshotRequest}
                modelRef={modelRef}
                onReady={(snapshot) => {
                  if (failedRef.current) return
                  setPainted(true)
                  onReadyRef.current?.(snapshot)
                }}
              />
            )}
          </Canvas>
        </CanvasFallback>
      )}
    </div>
  )
}
