import type { BookTurnSoundEvent } from './BookFlipEngine'

function hold(parameter: AudioParam, time: number): void {
  if (typeof parameter.cancelAndHoldAtTime === 'function') parameter.cancelAndHoldAtTime(time)
  else {
    const value = parameter.value
    parameter.cancelScheduledValues(time)
    parameter.setValueAtTime(value, time)
  }
}

/** One continuous paper bed for a journey, with an envelope for each real turn. */
export class BookTurnAudio {
  private context: AudioContext | null = null
  private noise: AudioBuffer | null = null
  private voice: { source: AudioBufferSourceNode; gain: GainNode; filter: BiquadFilterNode } | null = null
  private clip: HTMLAudioElement | null = null

  unlock(): void {
    if (typeof window === 'undefined' || !window.AudioContext) return
    try {
      this.context ??= new AudioContext()
      if (this.context.state === 'suspended') void this.context.resume().catch(() => {})
    } catch {
      // Sound is optional; unsupported or blocked audio never blocks reading.
    }
  }

  play(turn: BookTurnSoundEvent, customSource?: string): void {
    try {
      this.playSound(turn, customSource)
    } catch {
      this.stop()
    }
  }

  private playSound(turn: BookTurnSoundEvent, customSource?: string): void {
    if (!turn.sequence && customSource && turn.kind === 'page') {
      this.stop()
      this.clip = new Audio(customSource)
      this.clip.volume = 0.45
      void this.clip.play().catch(() => {})
      return
    }
    this.unlock()
    const context = this.context
    if (!context || context.state === 'closed') return
    if (!turn.sequence) this.stop()
    if (!this.noise) {
      this.noise = context.createBuffer(1, Math.ceil(context.sampleRate * 0.5), context.sampleRate)
      const samples = this.noise.getChannelData(0)
      for (let index = 0; index < samples.length; index++) samples[index] = Math.random() * 2 - 1
    }
    if (!this.voice) {
      const source = context.createBufferSource()
      const gain = context.createGain()
      const filter = context.createBiquadFilter()
      source.buffer = this.noise
      source.loop = true
      gain.gain.value = 0
      filter.Q.value = 0.55
      source.connect(filter).connect(gain).connect(context.destination)
      this.voice = { source, gain, filter }
      source.start()
    }
    const { gain, filter } = this.voice
    const now = context.currentTime
    const duration = Math.max(0.08, turn.duration / 1000)
    filter.type = turn.kind === 'cover' ? 'lowpass' : 'bandpass'
    filter.frequency.setTargetAtTime(turn.kind === 'cover' ? 650 : turn.sequence ? 1250 : 1800, now, 0.025)
    hold(gain.gain, now)
    gain.gain.linearRampToValueAtTime(turn.kind === 'cover' ? 0.08 : 0.13, now + Math.min(0.045, duration * 0.15))
    gain.gain.exponentialRampToValueAtTime(turn.sequence ? 0.012 : 0.0001, now + duration * 0.95)
  }

  stop(): void {
    if (this.clip) {
      this.clip.pause()
      this.clip.removeAttribute('src')
      this.clip.load()
      this.clip = null
    }
    const voice = this.voice
    const context = this.context
    this.voice = null
    if (!voice || !context) return
    const now = context.currentTime
    const disconnect = () => {
      voice.source.disconnect()
      voice.filter.disconnect()
      voice.gain.disconnect()
    }
    try {
      hold(voice.gain.gain, now)
      voice.gain.gain.linearRampToValueAtTime(0, now + 0.035)
      voice.source.onended = disconnect
      voice.source.stop(now + 0.04)
    } catch {
      disconnect()
    }
  }

  dispose(): void {
    this.stop()
    const context = this.context
    this.context = null
    this.noise = null
    if (context && context.state !== 'closed') void context.close().catch(() => {})
  }
}
