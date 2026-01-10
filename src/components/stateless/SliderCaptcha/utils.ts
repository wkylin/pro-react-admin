export type Difficulty = 'easy' | 'medium' | 'hard'

export const CaptchaUtils = {
  random: (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1) + min)
  },

  randomColor: (): string => {
    return `hsl(${CaptchaUtils.random(0, 360)}, 70%, 80%)`
  },

  generateBgCanvas: (width: number, height: number, difficulty: Difficulty = 'medium'): string => {
    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    const ctx = canvas.getContext('2d')

    if (!ctx) return ''

    const bgStyle = CaptchaUtils.random(0, 5)

    if (bgStyle === 0) {
      const gradient = ctx.createLinearGradient(0, 0, width, height)
      gradient.addColorStop(0, CaptchaUtils.randomColor())
      gradient.addColorStop(1, CaptchaUtils.randomColor())
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, width, height)
    } else if (bgStyle === 1) {
      const gradient = ctx.createRadialGradient(
        width / 2,
        height / 2,
        0,
        width / 2,
        height / 2,
        Math.max(width, height)
      )
      gradient.addColorStop(0, CaptchaUtils.randomColor())
      gradient.addColorStop(1, CaptchaUtils.randomColor())
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, width, height)
    } else if (bgStyle === 2) {
      ctx.fillStyle = CaptchaUtils.randomColor()
      ctx.fillRect(0, 0, width, height)
      for (let i = 0; i < 20; i++) {
        ctx.fillStyle = CaptchaUtils.randomColor()
        ctx.fillRect(
          CaptchaUtils.random(0, width),
          CaptchaUtils.random(0, height),
          CaptchaUtils.random(20, 80),
          CaptchaUtils.random(20, 80)
        )
      }
    } else if (bgStyle === 3) {
      ctx.fillStyle = CaptchaUtils.randomColor()
      ctx.fillRect(0, 0, width, height)
      for (let i = 0; i < 40; i++) {
        ctx.strokeStyle = `rgba(255, 255, 255, ${Math.random() * 0.3})`
        ctx.lineWidth = CaptchaUtils.random(1, 3)
        const x = CaptchaUtils.random(0, width)
        const y = CaptchaUtils.random(0, height)
        ctx.beginPath()
        ctx.moveTo(x, y)
        ctx.lineTo(x + CaptchaUtils.random(-30, 30), y + CaptchaUtils.random(-30, 30))
        ctx.stroke()
      }
    } else if (bgStyle === 4) {
      const bgColor1 = CaptchaUtils.randomColor()
      const bgColor2 = CaptchaUtils.randomColor()
      for (let y = 0; y < height; y += 20) {
        ctx.fillStyle = y % 40 === 0 ? bgColor1 : bgColor2
        ctx.fillRect(0, y, width, 20)
      }
    } else {
      ctx.fillStyle = CaptchaUtils.randomColor()
      ctx.fillRect(0, 0, width, height)
      for (let i = 0; i < 30; i++) {
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.2})`
        ctx.beginPath()
        ctx.arc(
          CaptchaUtils.random(0, width),
          CaptchaUtils.random(0, height),
          CaptchaUtils.random(2, 8),
          0,
          Math.PI * 2
        )
        ctx.fill()
      }
    }

    const dotCount = difficulty === 'easy' ? 8 : difficulty === 'medium' ? 15 : 25
    for (let i = 0; i < dotCount; i++) {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.15)'
      ctx.beginPath()
      ctx.arc(CaptchaUtils.random(0, width), CaptchaUtils.random(0, height), CaptchaUtils.random(5, 25), 0, Math.PI * 2)
      ctx.fill()
    }

    return canvas.toDataURL()
  },

  drawPath: (ctx: CanvasRenderingContext2D, type: number, x: number, y: number, w: number, h: number): void => {
    ctx.beginPath()
    ctx.moveTo(x, y)

    if (type === 0) {
      ctx.lineTo(x + w - 20, y)
      ctx.arc(x + w - 20, y + 10, 10, 1.5 * Math.PI, 0.5 * Math.PI, true)
      ctx.lineTo(x + w, y + h - 20)
      ctx.arc(x + w - 10, y + h - 20, 10, 1.0 * Math.PI, 0, false)
    } else if (type === 1) {
      ctx.lineTo(x + w, y)
      ctx.lineTo(x + w, y + h / 2 - 10)
      ctx.arc(x + w, y + h / 2, 10, 0.5 * Math.PI, 1.5 * Math.PI, true)
      ctx.lineTo(x + w, y + h)
    } else if (type === 2) {
      ctx.lineTo(x + w / 2 - 10, y)
      ctx.arc(x + w / 2, y, 10, Math.PI, 0, true)
      ctx.lineTo(x + w, y)
      ctx.lineTo(x + w, y + h - 10)
      ctx.arc(x + w - 10, y + h - 10, 10, 1.5 * Math.PI, 0.5 * Math.PI, true)
    } else if (type === 3) {
      ctx.lineTo(x + w, y)
      ctx.lineTo(x + w, y + h / 2 - 8)
      ctx.arc(x + w, y + h / 2, 8, 0.5 * Math.PI, 1.5 * Math.PI, false)
      ctx.lineTo(x + w, y + h)
    } else if (type === 4) {
      ctx.lineTo(x + w / 2 - 8, y)
      ctx.arc(x + w / 2, y, 8, Math.PI, 0, false)
      ctx.lineTo(x + w, y)
      ctx.lineTo(x + w, y + h - 8)
      ctx.arc(x + w - 8, y + h - 8, 8, 1.5 * Math.PI, 0.5 * Math.PI, false)
    } else if (type === 5) {
      ctx.lineTo(x + w - 15, y)
      ctx.arc(x + w - 15, y + 8, 8, 1.75 * Math.PI, 0.25 * Math.PI, true)
      ctx.lineTo(x + w, y + h - 15)
      ctx.arc(x + w - 8, y + h - 15, 8, Math.PI, 0, true)
    }

    ctx.lineTo(x, y + h)
    ctx.lineTo(x, y)
    ctx.closePath()
  },

  generatePiece: (bgUrl: string, tx: number, ty: number, size: number, type: number): Promise<string> => {
    return new Promise((resolve) => {
      const img = new Image()
      img.onload = () => {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')

        if (!ctx) {
          resolve('')
          return
        }

        canvas.width = size
        canvas.height = size

        ctx.save()
        CaptchaUtils.drawPath(ctx, type, 0, 0, size, size)
        ctx.clip()
        ctx.drawImage(img, tx, ty, size, size, 0, 0, size, size)
        ctx.restore()

        ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)'
        ctx.lineWidth = 2
        CaptchaUtils.drawPath(ctx, type, 0, 0, size, size)
        ctx.stroke()

        resolve(canvas.toDataURL())
      }
      img.src = bgUrl
    })
  },

  cutHole: (bgUrl: string, tx: number, ty: number, size: number, type: number): Promise<string> => {
    return new Promise((resolve) => {
      const img = new Image()
      img.onload = () => {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')

        if (!ctx) {
          resolve('')
          return
        }

        canvas.width = 300
        canvas.height = 180

        ctx.drawImage(img, 0, 0)

        ctx.save()
        ctx.globalCompositeOperation = 'destination-out'
        CaptchaUtils.drawPath(ctx, type, tx, ty, size, size)
        ctx.fill()
        ctx.restore()

        ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)'
        ctx.lineWidth = 2
        CaptchaUtils.drawPath(ctx, type, tx, ty, size, size)
        ctx.stroke()

        resolve(canvas.toDataURL())
      }
      img.src = bgUrl
    })
  },
}
