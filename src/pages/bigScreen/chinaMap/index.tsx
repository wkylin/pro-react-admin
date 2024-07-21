import React, { useState } from 'react'
import EChartsCommon from '@stateless/EChartsCommon'
import mapOptions from './options'

const ChinaMap = () => {
  const [mapData] = useState({
    moveLines: [
      {
        fromName: '黑龙江',
        toName: '珠海',
        coords: [
          [126.661669, 45.742347],
          [113.576726, 22.270715],
        ],
      },
      {
        fromName: '黑龙江',
        toName: '舒兰',
        coords: [
          [126.661669, 45.742347],
          [126.965607, 44.406106],
        ],
      },
      {
        fromName: '黑龙江',
        toName: '大连',
        coords: [
          [126.661669, 45.742347],
          [121.614682, 38.914003],
        ],
      },
      {
        fromName: '辽宁',
        toName: '集安',
        coords: [
          [123.42944, 41.835441],
          [126.194031, 41.125307],
        ],
      },
      {
        fromName: '吉林',
        toName: '抚顺',
        coords: [
          [126.549572, 43.837883],
          [123.957208, 41.880872],
        ],
      },
      {
        fromName: '山东',
        toName: '南京',
        coords: [
          [117.020359, 36.66853],
          [118.796877, 32.060255],
        ],
      },
      {
        fromName: '北京',
        toName: '沈阳',
        coords: [
          [116.407526, 39.90403],
          [123.431475, 41.805698],
        ],
      },
      {
        fromName: '黑龙江',
        toName: '环翠',
        coords: [
          [126.661669, 45.742347],
          [122.123444, 37.501991],
        ],
      },
      {
        fromName: '天津',
        toName: '大连',
        coords: [
          [117.200983, 39.084158],
          [121.614682, 38.914003],
        ],
      },
      {
        fromName: '吉林',
        toName: '兴和',
        coords: [
          [126.549572, 43.837883],
          [113.834173, 40.872301],
        ],
      },
    ],
  })

  return (
    <div
      style={{
        width: '600px',
        height: '400px',
      }}
    >
      <EChartsCommon option={mapOptions(mapData)} />
    </div>
  )
}

export default ChinaMap
