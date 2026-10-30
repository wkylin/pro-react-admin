import { BookTurnAudio } from './BookTurnAudio'

test.each([true, false])('a page journey shares one voice and fades (native hold: %s)', (nativeHold) => {
  const parameter = () => ({
    value: 0,
    cancelAndHoldAtTime: nativeHold ? jest.fn() : undefined,
    cancelScheduledValues: jest.fn(),
    setValueAtTime: jest.fn(),
    linearRampToValueAtTime: jest.fn(),
    exponentialRampToValueAtTime: jest.fn(),
    setTargetAtTime: jest.fn(),
  })
  const gain = { gain: parameter(), connect: jest.fn().mockReturnThis(), disconnect: jest.fn() }
  const filter = { Q: parameter(), frequency: parameter(), connect: jest.fn().mockReturnThis(), disconnect: jest.fn() }
  const source = {
    connect: jest.fn(() => filter),
    start: jest.fn(),
    stop: jest.fn(),
    disconnect: jest.fn(),
    loop: false,
    onended: null as null | (() => void),
  }
  const context = {
    state: 'suspended',
    currentTime: 0,
    sampleRate: 100,
    destination: {},
    resume: jest.fn().mockResolvedValue(undefined),
    close: jest.fn().mockResolvedValue(undefined),
    createBuffer: jest.fn(() => ({ getChannelData: () => new Float32Array(50) })),
    createBufferSource: jest.fn(() => source),
    createGain: jest.fn(() => gain),
    createBiquadFilter: jest.fn(() => filter),
  }
  const original = window.AudioContext
  Object.defineProperty(window, 'AudioContext', { configurable: true, writable: true, value: jest.fn(() => context) })
  try {
    const audio = new BookTurnAudio()
    for (let page = 0; page < 4; page++) audio.play({ kind: 'page', sequence: true, duration: 200 }, '/single.mp3')
    expect(context.createBufferSource).toHaveBeenCalledTimes(1)
    expect(source.loop).toBe(true)
    expect(gain.gain.linearRampToValueAtTime).toHaveBeenCalledTimes(4)
    audio.stop()
    expect(source.stop).toHaveBeenCalledWith(0.04)
    expect(gain.gain.linearRampToValueAtTime).toHaveBeenLastCalledWith(0, 0.035)
    source.onended?.()
    expect(source.disconnect).toHaveBeenCalledTimes(1)
    audio.dispose()
    expect(context.close).toHaveBeenCalledTimes(1)
  } finally {
    window.AudioContext = original
  }
})
