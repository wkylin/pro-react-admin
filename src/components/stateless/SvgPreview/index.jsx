import AnimatedIcon from '@stateless/AnimatedIcon'
import React, { useEffect, useRef, useState } from 'react'
import { Button, message } from 'antd'
import {
  ZoomInOutlined,
  ZoomOutOutlined,
  SyncOutlined,
  DownloadOutlined,
  FullscreenOutlined,
  FullscreenExitOutlined,
} from '@ant-design/icons'

const defaultBg = '#1e1e1e'

function SvgPreview({
  svgSource = '',
  svgUrl = '',
  SvgComponent = null,
  downloadName = 'diagram.svg',
  background = defaultBg,
}) {
  const containerRef = useRef(null)
  const innerRef = useRef(null)

  const [content, setContent] = useState(svgSource || '')
  const [scale, setScale] = useState(0.6)
  const scaleRef = useRef(scale)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const positionRef = useRef(position)
  const [isDragging, setIsDragging] = useState(false)
  const isDraggingRef = useRef(isDragging)
  const [startPos, setStartPos] = useState({ x: 0, y: 0 })
  const startPosRef = useRef(startPos)

  useEffect(() => {
    scaleRef.current = scale
  }, [scale])
  useEffect(() => {
    positionRef.current = position
  }, [position])
  useEffect(() => {
    isDraggingRef.current = isDragging
  }, [isDragging])
  useEffect(() => {
    startPosRef.current = startPos
  }, [startPos])

  // load remote svg if svgUrl provided
  useEffect(() => {
    let mounted = true
    // if a React SvgComponent is provided, prefer rendering it instead of loading string
    if (SvgComponent) {
      if (mounted) setContent('')
      return () => {
        mounted = false
      }
    }

    if (svgUrl) {
      fetch(svgUrl)
        .then((r) => r.text())
        .then((t) => {
          if (mounted) setContent(t)
        })
        .catch((e) => console.log('error', e.message))
    } else {
      setContent(svgSource)
    }
    return () => (mounted = false)
  }, [svgUrl, svgSource])

  // center on mount / when content changes
  useEffect(() => {
    const el = containerRef.current
    const inner = innerRef.current
    if (!el || !inner) return
    const svg = inner.querySelector('svg')
    if (!svg) return
    // apply rendering hints
    try {
      svg.setAttribute('shape-rendering', 'geometricPrecision')
      svg.setAttribute('text-rendering', 'geometricPrecision')
      svg.style.imageRendering = 'optimizeQuality'
    } catch (e) {
      console.log('error', e.message)
    }

    const cRect = el.getBoundingClientRect()
    const sRect = svg.getBoundingClientRect()
    const cx = (cRect.width - sRect.width) / 2
    const cy = (cRect.height - sRect.height) / 2
    positionRef.current = { x: cx, y: cy }
    setPosition({ x: cx, y: cy })
    positionRef.current.__scale = scaleRef.current
  }, [content, SvgComponent])

  // native handlers for drag/touch/wheel
  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const onMouseDown = (e) => {
      setIsDragging(true)
      isDraggingRef.current = true
      const x = e.clientX - positionRef.current.x
      const y = e.clientY - positionRef.current.y
      setStartPos({ x, y })
      startPosRef.current = { x, y }
    }

    const onTouchStart = (e) => {
      if (!e.touches || e.touches.length === 0) return
      const t = e.touches[0]
      setIsDragging(true)
      isDraggingRef.current = true
      const x = t.clientX - positionRef.current.x
      const y = t.clientY - positionRef.current.y
      setStartPos({ x, y })
      startPosRef.current = { x, y }
    }

    const onTouchMove = (e) => {
      if (!isDraggingRef.current || !e.touches || e.touches.length === 0) return
      e.preventDefault()
      const t = e.touches[0]
      setPosition({ x: t.clientX - startPosRef.current.x, y: t.clientY - startPosRef.current.y })
    }

    const onTouchEnd = () => {
      setIsDragging(false)
      isDraggingRef.current = false
    }

    const onWheel = (e) => {
      e.preventDefault()
      const rect = el.getBoundingClientRect()
      const mx = e.clientX - rect.left
      const my = e.clientY - rect.top
      const curScale = positionRef.current?.__scale || scaleRef.current || scale
      const factor = e.deltaY < 0 ? 1.12 : 0.88
      const ns = Math.min(5, Math.max(0.1, curScale * factor))
      const ratio = ns / curScale
      const curPos = positionRef.current || { x: 0, y: 0 }
      const newX = mx - (mx - curPos.x) * ratio
      const newY = my - (my - curPos.y) * ratio
      positionRef.current = { x: newX, y: newY }
      setPosition({ x: newX, y: newY })
      positionRef.current.__scale = ns
      scaleRef.current = ns
      setScale(ns)
    }

    el.addEventListener('mousedown', onMouseDown)
    el.addEventListener('touchstart', onTouchStart, { passive: true })
    el.addEventListener('touchmove', onTouchMove, { passive: false })
    el.addEventListener('touchend', onTouchEnd)
    el.addEventListener('wheel', onWheel, { passive: false })

    // mousemove / up on window to track dragging
    const onMouseMove = (e) => {
      if (!isDraggingRef.current) return
      setPosition({ x: e.clientX - startPosRef.current.x, y: e.clientY - startPosRef.current.y })
    }
    const onMouseUp = () => setIsDragging(false)
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)

    return () => {
      el.removeEventListener('mousedown', onMouseDown)
      el.removeEventListener('touchstart', onTouchStart)
      el.removeEventListener('touchmove', onTouchMove)
      el.removeEventListener('touchend', onTouchEnd)
      el.removeEventListener('wheel', onWheel)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
    }
  }, [])

  const handleZoomIn = () => {
    setScale((prev) => {
      const ns = Math.min(prev + 0.2, 5)
      scaleRef.current = ns
      return ns
    })
  }
  const handleZoomOut = () => {
    setScale((prev) => {
      const ns = Math.max(prev - 0.2, 0.1)
      scaleRef.current = ns
      return ns
    })
  }
  const handleReset = () => {
    setScale(0.6)
    scaleRef.current = 0.6
    setPosition({ x: 0, y: 0 })
    message.info('视图已重置')
  }

  const prepareSvgForDownload = (raw) => {
    try {
      let svg = raw.replace(/<br>/g, '<br/>')
      if (!/xmlns="http:\/\/www.w3.org\/2000\/svg"/.test(svg)) {
        svg = svg.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"')
      }
      if (!/id="__download_bg__"/.test(svg)) {
        svg = svg.replace(
          /(<svg[^>]*>)/i,
          `$1<rect id="__download_bg__" width="100%" height="100%" fill="${background}"/>`
        )
      }
      return svg
    } catch (e) {
      console.log('error', e.message)
      return raw
    }
  }

  const handleDownload = async () => {
    try {
      let raw = content
      if (!raw && svgUrl) {
        const r = await fetch(svgUrl)
        raw = await r.text()
      }
      // if no raw string but a SvgComponent is rendered, serialize the rendered SVG DOM
      if (!raw && SvgComponent && innerRef.current) {
        try {
          const svgNode = innerRef?.current?.querySelector('svg')
          if (svgNode) {
            const cloned = svgNode.cloneNode(true)
            if (!cloned.getAttribute('xmlns')) {
              cloned.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
            }
            const ser = new XMLSerializer().serializeToString(cloned)
            raw = ser
          }
        } catch (e) {
          console.log('error', e.message)
        }
      }
      if (!raw) throw new Error('no svg content')
      const svg = prepareSvgForDownload(raw)
      const blob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = downloadName
      document.body.appendChild(a)
      a.click()
      a.remove()
      URL.revokeObjectURL(url)
      message.success('SVG 下载已开始')
    } catch (e) {
      console.log('error', e.message)
      message.error('下载失败')
    }
  }

  // fullscreen handling
  const [isFullscreen, setIsFullscreen] = useState(false)

  useEffect(() => {
    const onFsChange = () => {
      try {
        const isFs = !!(document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement)
        // temporarily disable transform transitions to avoid layout/paint thrash when entering/exiting fullscreen
        try {
          const el = innerRef.current
          if (el) {
            const prev = el.style.transition
            el.style.transition = 'none'
            requestAnimationFrame(() => {
              // restore after frame to allow browser to finish fullscreen layout
              el.style.transition = prev || ''
            })
          }
        } catch (e) {
          console.log('error', e.message)
        }
        setIsFullscreen(isFs)
      } catch (e) {
        console.log('error', e.message)
      }
    }
    document.addEventListener('fullscreenchange', onFsChange)
    document.addEventListener('webkitfullscreenchange', onFsChange)
    document.addEventListener('mozfullscreenchange', onFsChange)
    document.addEventListener('MSFullscreenChange', onFsChange)
    return () => {
      document.removeEventListener('fullscreenchange', onFsChange)
      document.removeEventListener('webkitfullscreenchange', onFsChange)
      document.removeEventListener('mozfullscreenchange', onFsChange)
      document.removeEventListener('MSFullscreenChange', onFsChange)
    }
  }, [])

  const enterFullscreen = async (el) => {
    if (!el) return
    const req = el.requestFullscreen || el.webkitRequestFullscreen || el.mozRequestFullScreen || el.msRequestFullscreen
    if (req) {
      try {
        await req.call(el)
      } catch (e) {
        console.log('error', e.message)
      }
    }
  }

  const exitFullscreen = async () => {
    const exit =
      document.exitFullscreen ||
      document.webkitExitFullscreen ||
      document.mozCancelFullScreen ||
      document.msExitFullscreen
    if (exit) {
      try {
        await exit.call(document)
      } catch (e) {
        console.log('error', e.message)
      }
    }
  }

  const toggleFullscreen = async () => {
    try {
      const el = innerRef.current
      if (el) {
        const prev = el.style.transition
        el.style.transition = 'none'
        if (!isFullscreen) {
          await enterFullscreen(containerRef.current || document.documentElement)
        } else {
          await exitFullscreen()
        }
        requestAnimationFrame(() => {
          el.style.transition = prev || ''
        })
        return
      }
    } catch (e) {
      console.log('error', e.message)
    }

    if (!isFullscreen) {
      await enterFullscreen(containerRef.current || document.documentElement)
    } else {
      await exitFullscreen()
    }
  }

  return (
    <div style={{ height: '100%', position: 'relative' }}>
      <div
        ref={containerRef}
        role="application"
        aria-label="SVG viewer"
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: background,
          overflow: 'hidden',
          cursor: isDragging ? 'grabbing' : 'grab',
          position: 'relative',
        }}
      >
        <div
          ref={innerRef}
          style={{
            transformOrigin: '0 0',
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
            transition: isDragging ? 'none' : 'transform 0.1s ease-out',
            willChange: 'transform',
          }}
        >
          {SvgComponent ? (
            <SvgComponent style={{ width: '100%', height: '100%' }} />
          ) : (
            <div dangerouslySetInnerHTML={{ __html: content ? content.replace(/<br>/g, '<br/>') : '' }} />
          )}
        </div>
      </div>
      <div
        aria-hidden
        style={{
          position: 'absolute',
          bottom: 12,
          right: 12,
          zIndex: 1200,
          background: 'rgba(0,0,0,0.45)',
          padding: '6px 10px',
          borderRadius: 10,
          backdropFilter: 'blur(6px)',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          boxShadow: '0 6px 18px rgba(0,0,0,0.35)',
        }}
      >
        <Button
          icon={
            <AnimatedIcon variant="spin" mode="hover">
              <ZoomOutOutlined />
            </AnimatedIcon>
          }
          onClick={handleZoomOut}
          type="text"
          style={{ color: '#fff' }}
        />
        <div style={{ color: '#fff', minWidth: 56, textAlign: 'center', fontWeight: 500 }}>
          {Math.round(scale * 100)}%
        </div>
        <Button
          icon={
            <AnimatedIcon variant="spin" mode="hover">
              <ZoomInOutlined />
            </AnimatedIcon>
          }
          onClick={handleZoomIn}
          type="text"
          style={{ color: '#fff' }}
        />
        <Button
          icon={
            <AnimatedIcon variant="spin" mode="hover">
              <SyncOutlined />
            </AnimatedIcon>
          }
          onClick={handleReset}
          type="text"
          style={{ color: '#fff' }}
        />
        <Button
          icon={
            isFullscreen ? (
              <AnimatedIcon variant="spin" mode="hover">
                <FullscreenExitOutlined />
              </AnimatedIcon>
            ) : (
              <AnimatedIcon variant="spin" mode="hover">
                <FullscreenOutlined />
              </AnimatedIcon>
            )
          }
          onClick={toggleFullscreen}
          type="text"
          style={{ color: '#fff' }}
        />
        <Button
          icon={
            <AnimatedIcon variant="spin" mode="hover">
              <DownloadOutlined />
            </AnimatedIcon>
          }
          onClick={handleDownload}
          type="primary"
          size="small"
        >
          下载
        </Button>
      </div>
    </div>
  )
}

export default SvgPreview
