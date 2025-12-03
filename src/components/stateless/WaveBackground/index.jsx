import React from 'react'
import Wave from 'react-wavify'

/**
 * WaveBackground Component
 * A customizable wave background component using react-wavify.
 * Supports multiple wave layers, custom colors, and configuration.
 *
 * @param {string} backgroundColor - CSS background property for the container
 * @param {number|string} height - Height of the container
 * @param {Array} waves - Array of wave configurations
 * @param {React.ReactNode} children - Content to render above the waves
 */
const WaveBackground = ({
  backgroundColor = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  height = 300,
  waves = [
    {
      fill: 'rgba(255, 255, 255, 0.2)',
      options: { height: 20, amplitude: 20, speed: 0.15, points: 3 },
    },
    {
      fill: 'rgba(255, 255, 255, 0.4)',
      options: { height: 15, amplitude: 30, speed: 0.2, points: 4 },
    },
    {
      fill: '#ffffff',
      options: { height: 10, amplitude: 40, speed: 0.25, points: 5 },
    },
  ],
  className,
  style,
  children,
}) => {
  return (
    <section
      className={className}
      style={{
        position: 'relative',
        background: backgroundColor,
        height: height,
        overflow: 'hidden',
        width: '100%',
        ...style,
      }}
    >
      {children && (
        <div
          style={{
            position: 'relative',
            zIndex: 10,
            height: '100%',
            width: '100%',
          }}
        >
          {children}
        </div>
      )}
      {waves.map((wave, index) => (
        <div
          key={index}
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            zIndex: index + 1,
          }}
        >
          <Wave
            fill={wave.fill}
            paused={false}
            options={{
              height: 20,
              amplitude: 20,
              speed: 0.15,
              points: 3,
              ...wave.options,
            }}
            style={{ display: 'block', width: '100%' }}
          />
        </div>
      ))}
    </section>
  )
}

export default WaveBackground
