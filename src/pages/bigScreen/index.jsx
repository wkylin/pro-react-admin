import React, { useState, useEffect, useRef } from 'react'
import FixTabPanel from '@stateless/FixTabPanel'
import EChartsCommon from '@stateless/EChartsCommon'
import PieNestCharts from '@stateless/PieNestCharts'
import DonutCharts from '@stateless/DonutCharts'
import previewFitScale from '@utils/previewScale'
import BigHeader from './bigHeader'

import styles from './index.module.less'
import ChinaMap from './chinaMap'
import { OfflinePortalOptions, pieNestOptions, subordOptions } from './offlinePortalOptions'

const BigScreen = () => {
  const scaleDom = useRef(null)

  const [feedbackData] = useState({
    data1: [80, 152, 101, 134, 90, 130],
    data2: [120, 182, 191, 210, 170, 110],
    data3: [110, 132, 201, 154, 150, 80],
    data4: [90, 142, 161, 114, 190, 170],
    xData: ['9:00', '12:00', '15:00', '18:00', '21:00', '00:00'],
    barData: [32.2, 60.0, 32.6, 36.4, 53.3, 35.0]
  })
  useEffect(() => {
    const { calcRate, windowResize, unWindowResize } = previewFitScale(1200, 800, scaleDom.current)
    calcRate()
    windowResize()
    return () => {
      unWindowResize()
    }
  }, [])

  const chartData = {
    chartAllData: [
      {
        bidderCode: '91130131694657380A',
        bidderName: '平山县万达公路工程有限公司',
        bizDate: '2019-01',
        bidCount: '1',
        winRate: 0
      },
      {
        bidderCode: '91130183784094817J',
        bidderName: '石家庄通畅公路工程有限公司',
        bizDate: '2019-03',
        bidCount: '2',
        winRate: 50
      },
      {
        bidderCode: '91130104681399108D',
        bidderName: '河北君邦公路工程有限公司',
        bizDate: '2019-03',
        bidCount: '1',
        winRate: 100
      },
      {
        bidderCode: '91130108673216180T',
        bidderName: '河北盛创公路工程有限公司',
        bizDate: '2019-04',
        bidCount: '1',
        winRate: 0
      },
      {
        bidderCode: '91130104681399108D',
        bidderName: '河北君邦公路工程有限公司',
        bizDate: '2019-07',
        bidCount: '1',
        winRate: 100
      },
      {
        bidderCode: '91130927319947095N',
        bidderName: '河北广润建筑工程有限公司',
        bizDate: '2019-08',
        bidCount: '1',
        winRate: 0
      },
      {
        bidderCode: '91130183784094817J',
        bidderName: '石家庄通畅公路工程有限公司',
        bizDate: '2019-09',
        bidCount: '1',
        winRate: 100
      },
      {
        bidderCode: '91130183784094817J',
        bidderName: '石家庄通畅公路工程有限公司',
        bizDate: '2019-10',
        bidCount: '1',
        winRate: 100
      },
      {
        bidderCode: '91130183784094817J',
        bidderName: '石家庄通畅公路工程有限公司',
        bizDate: '2020-03',
        bidCount: '5',
        winRate: 60
      },
      {
        bidderCode: '91130108673216180T',
        bidderName: '河北盛创公路工程有限公司',
        bizDate: '2020-03',
        bidCount: '7',
        winRate: 28.57
      },
      {
        bidderCode: '91130927319947095N',
        bidderName: '河北广润建筑工程有限公司',
        bizDate: '2020-04',
        bidCount: '1',
        winRate: 0
      },
      {
        bidderCode: '91130183784094817J',
        bidderName: '石家庄通畅公路工程有限公司',
        bizDate: '2020-05',
        bidCount: '1',
        winRate: 100
      },
      {
        bidderCode: '91130183784094817J',
        bidderName: '石家庄通畅公路工程有限公司',
        bizDate: '2020-08',
        bidCount: '1',
        winRate: 0
      },
      {
        bidderCode: '91130104681399108D',
        bidderName: '河北君邦公路工程有限公司',
        bizDate: '2020-08',
        bidCount: '1',
        winRate: 0
      },
      {
        bidderCode: '91130927319947095N',
        bidderName: '河北广润建筑工程有限公司',
        bizDate: '2020-08',
        bidCount: '1',
        winRate: 0
      },
      {
        bidderCode: '91130104681399108D',
        bidderName: '河北君邦公路工程有限公司',
        bizDate: '2020-12',
        bidCount: '1',
        winRate: 0
      },
      {
        bidderCode: '91130183784094817J',
        bidderName: '石家庄通畅公路工程有限公司',
        bizDate: '2021-03',
        bidCount: '1',
        winRate: 0
      },
      {
        bidderCode: '91130104681399108D',
        bidderName: '河北君邦公路工程有限公司',
        bizDate: '2021-04',
        bidCount: '1',
        winRate: 0
      },
      {
        bidderCode: '91130183784094817J',
        bidderName: '石家庄通畅公路工程有限公司',
        bizDate: '2021-05',
        bidCount: '2',
        winRate: 0
      },
      {
        bidderCode: '91130927319947095N',
        bidderName: '河北广润建筑工程有限公司',
        bizDate: '2021-05',
        bidCount: '2',
        winRate: 50
      },
      {
        bidderCode: '91130927319947095N',
        bidderName: '河北广润建筑工程有限公司',
        bizDate: '2021-11',
        bidCount: '1',
        winRate: 0
      },
      {
        bidderCode: '91130927319947095N',
        bidderName: '河北广润建筑工程有限公司',
        bizDate: '2021-12',
        bidCount: '1',
        winRate: 0
      },
      {
        bidderCode: '91130183784094817J',
        bidderName: '石家庄通畅公路工程有限公司',
        bizDate: '2022-04',
        bidCount: '1',
        winRate: 100
      },
      {
        bidderCode: '91130183784094817J',
        bidderName: '石家庄通畅公路工程有限公司',
        bizDate: '2022-06',
        bidCount: '1',
        winRate: 100
      },
      {
        bidderCode: '91130183784094817J',
        bidderName: '石家庄通畅公路工程有限公司',
        bizDate: '2022-07',
        bidCount: '1',
        winRate: 0
      },
      {
        bidderCode: '91130183784094817J',
        bidderName: '石家庄通畅公路工程有限公司',
        bizDate: '2022-08',
        bidCount: '2',
        winRate: 50
      },
      {
        bidderCode: '91130927319947095N',
        bidderName: '河北广润建筑工程有限公司',
        bizDate: '2022-08',
        bidCount: '1',
        winRate: 0
      },
      {
        bidderCode: '91130131694657380A',
        bidderName: '平山县万达公路工程有限公司',
        bizDate: '2022-08',
        bidCount: '1',
        winRate: 100
      },
      {
        bidderCode: '91130927319947095N',
        bidderName: '河北广润建筑工程有限公司',
        bizDate: '2022-10',
        bidCount: '1',
        winRate: 0
      },
      {
        bidderCode: '91130183784094817J',
        bidderName: '石家庄通畅公路工程有限公司',
        bizDate: '2022-11',
        bidCount: '1',
        winRate: 0
      },
      {
        bidderCode: '91130121096822075A',
        bidderName: '井陉县兴通公路养护工程有限公司',
        bizDate: '2022-11',
        bidCount: '1',
        winRate: 100
      },
      {
        bidderCode: '91130121096822075A',
        bidderName: '井陉县兴通公路养护工程有限公司',
        bizDate: '2023-02',
        bidCount: '1',
        winRate: 100
      },
      {
        bidderCode: '91130927319947095N',
        bidderName: '河北广润建筑工程有限公司',
        bizDate: '2023-02',
        bidCount: '1',
        winRate: 0
      },
      {
        bidderCode: '91130131694657380A',
        bidderName: '平山县万达公路工程有限公司',
        bizDate: '2023-02',
        bidCount: '1',
        winRate: 100
      },
      {
        bidderCode: '91130104681399108D',
        bidderName: '河北君邦公路工程有限公司',
        bizDate: '2023-04',
        bidCount: '1',
        winRate: 0
      },
      {
        bidderCode: '91130183784094817J',
        bidderName: '石家庄通畅公路工程有限公司',
        bizDate: '2023-05',
        bidCount: '1',
        winRate: 0
      },
      {
        bidderCode: '91130121096822075A',
        bidderName: '井陉县兴通公路养护工程有限公司',
        bizDate: '2023-05',
        bidCount: '1',
        winRate: 100
      },
      {
        bidderCode: '91130927319947095N',
        bidderName: '河北广润建筑工程有限公司',
        bizDate: '2023-05',
        bidCount: '1',
        winRate: 0
      },
      {
        bidderCode: '9113018579415799XW',
        bidderName: '河北昕辰路桥工程有限公司',
        bizDate: '2023-05',
        bidCount: '1',
        winRate: 0
      },
      {
        bidderCode: '91130104681399108D',
        bidderName: '河北君邦公路工程有限公司',
        bizDate: '2023-05',
        bidCount: '1',
        winRate: 0
      },
      {
        bidderCode: '91130183784094817J',
        bidderName: '石家庄通畅公路工程有限公司',
        bizDate: '2023-06',
        bidCount: '3',
        winRate: 66.67
      },
      {
        bidderCode: '91130104681399108D',
        bidderName: '河北君邦公路工程有限公司',
        bizDate: '2023-06',
        bidCount: '1',
        winRate: 0
      },
      {
        bidderCode: '91510129MA6CWGNC1F',
        bidderName: '四川联天望海建筑工程有限公司',
        bizDate: '2023-06',
        bidCount: '1',
        winRate: 0
      },
      {
        bidderCode: '91130183784094817J',
        bidderName: '石家庄通畅公路工程有限公司',
        bizDate: '2023-07',
        bidCount: '1',
        winRate: 100
      },
      {
        bidderCode: '91130121096822075A',
        bidderName: '井陉县兴通公路养护工程有限公司',
        bizDate: '2023-08',
        bidCount: '1',
        winRate: 100
      },
      {
        bidderCode: '91510129MA6CWGNC1F',
        bidderName: '四川联天望海建筑工程有限公司',
        bizDate: '2023-08',
        bidCount: '1',
        winRate: 0
      },
      {
        bidderCode: '91130131694657380A',
        bidderName: '平山县万达公路工程有限公司',
        bizDate: '2023-08',
        bidCount: '1',
        winRate: 0
      },
      {
        bidderCode: '91130183784094817J',
        bidderName: '石家庄通畅公路工程有限公司',
        bizDate: '2023-09',
        bidCount: '1',
        winRate: 0
      },
      {
        bidderCode: '91130183784094817J',
        bidderName: '石家庄通畅公路工程有限公司',
        bizDate: '2023-10',
        bidCount: '2',
        winRate: 50
      },
      {
        bidderCode: '91130121096822075A',
        bidderName: '井陉县兴通公路养护工程有限公司',
        bizDate: '2023-10',
        bidCount: '1',
        winRate: 100
      },
      {
        bidderCode: '91130104681399108D',
        bidderName: '河北君邦公路工程有限公司',
        bizDate: '2023-10',
        bidCount: '1',
        winRate: 0
      },
      {
        bidderCode: '91510129MA6CWGNC1F',
        bidderName: '四川联天望海建筑工程有限公司',
        bizDate: '2023-10',
        bidCount: '1',
        winRate: 0
      },
      {
        bidderCode: '91130183784094817J',
        bidderName: '石家庄通畅公路工程有限公司',
        bizDate: '2023-11',
        bidCount: '3',
        winRate: 33.33
      },
      {
        bidderCode: '91130121096822075A',
        bidderName: '井陉县兴通公路养护工程有限公司',
        bizDate: '2023-11',
        bidCount: '4',
        winRate: 100
      },
      {
        bidderCode: '91130927319947095N',
        bidderName: '河北广润建筑工程有限公司',
        bizDate: '2023-11',
        bidCount: '1',
        winRate: 0
      },
      {
        bidderCode: '9113018579415799XW',
        bidderName: '河北昕辰路桥工程有限公司',
        bizDate: '2023-11',
        bidCount: '1',
        winRate: 0
      },
      {
        bidderCode: '91130104681399108D',
        bidderName: '河北君邦公路工程有限公司',
        bizDate: '2023-11',
        bidCount: '1',
        winRate: 0
      },
      {
        bidderCode: '91510129MA6CWGNC1F',
        bidderName: '四川联天望海建筑工程有限公司',
        bizDate: '2023-11',
        bidCount: '1',
        winRate: 0
      },
      {
        bidderCode: '91130131694657380A',
        bidderName: '平山县万达公路工程有限公司',
        bizDate: '2023-11',
        bidCount: '1',
        winRate: 0
      },
      {
        bidderCode: '91130108673216180T',
        bidderName: '河北盛创公路工程有限公司',
        bizDate: '2023-11',
        bidCount: '1',
        winRate: 0
      },
      {
        bidderCode: '91130927319947095N',
        bidderName: '河北广润建筑工程有限公司',
        bizDate: '2023-12',
        bidCount: '3',
        winRate: 0
      },
      {
        bidderCode: '9113018579415799XW',
        bidderName: '河北昕辰路桥工程有限公司',
        bizDate: '2023-12',
        bidCount: '1',
        winRate: 0
      },
      {
        bidderCode: '91510129MA6CWGNC1F',
        bidderName: '四川联天望海建筑工程有限公司',
        bizDate: '2023-12',
        bidCount: '2',
        winRate: 0
      },
      {
        bidderCode: '91130183784094817J',
        bidderName: '石家庄通畅公路工程有限公司',
        bizDate: '2024-01',
        bidCount: '4',
        winRate: 75
      },
      {
        bidderCode: '91130121096822075A',
        bidderName: '井陉县兴通公路养护工程有限公司',
        bizDate: '2024-01',
        bidCount: '2',
        winRate: 50
      },
      {
        bidderCode: '9113018579415799XW',
        bidderName: '河北昕辰路桥工程有限公司',
        bizDate: '2024-01',
        bidCount: '1',
        winRate: 100
      },
      {
        bidderCode: '91130183784094817J',
        bidderName: '石家庄通畅公路工程有限公司',
        bizDate: '2024-02',
        bidCount: '1',
        winRate: 0
      },
      {
        bidderCode: '91510129MA6CWGNC1F',
        bidderName: '四川联天望海建筑工程有限公司',
        bizDate: '2024-02',
        bidCount: '1',
        winRate: 100
      }
    ],
    chartDate: [
      '2019-01',
      '2019-03',
      '2019-04',
      '2019-07',
      '2019-08',
      '2019-09',
      '2019-10',
      '2020-03',
      '2020-04',
      '2020-05',
      '2020-08',
      '2020-12',
      '2021-03',
      '2021-04',
      '2021-05',
      '2021-11',
      '2021-12',
      '2022-04',
      '2022-06',
      '2022-07',
      '2022-08',
      '2022-10',
      '2022-11',
      '2023-02',
      '2023-04',
      '2023-05',
      '2023-06',
      '2023-07',
      '2023-08',
      '2023-09',
      '2023-10',
      '2023-11',
      '2023-12',
      '2024-01',
      '2024-02'
    ],
    chartLegend: [
      '井陉县兴通公路养护工程有限公司',
      '平山县万达公路工程有限公司',
      '石家庄通畅公路工程有限公司',
      '河北盛创公路工程有限公司',
      '河北广润建筑工程有限公司',
      '河北君邦公路工程有限公司',
      '河北昕辰路桥工程有限公司',
      '四川联天望海建筑工程有限公司'
    ],
    seriesData: [
      {
        name: '平山县万达公路工程有限公司',
        type: 'scatter',
        symbolSize: () => 25,
        data: [
          '1',
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          '1',
          0,
          0,
          '1',
          0,
          0,
          0,
          0,
          '1',
          0,
          0,
          '1',
          0,
          0,
          0
        ]
      },
      {
        name: '石家庄通畅公路工程有限公司',
        type: 'scatter',
        data: [
          0,
          '2',
          0,
          0,
          0,
          '1',
          '1',
          '5',
          0,
          '1',
          '1',
          0,
          '1',
          0,
          '2',
          0,
          0,
          '1',
          '1',
          '1',
          '2',
          0,
          '1',
          0,
          0,
          '1',
          '3',
          '1',
          0,
          '1',
          '2',
          '3',
          0,
          '4',
          '1'
        ]
      },
      {
        name: '河北君邦公路工程有限公司',
        type: 'scatter',
        symbolSize: () => 15,
        data: [
          0,
          '1',
          0,
          '1',
          0,
          0,
          0,
          0,
          0,
          0,
          '1',
          '1',
          0,
          '1',
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          '1',
          '1',
          '1',
          0,
          0,
          0,
          '1',
          '1',
          0,
          0,
          0
        ]
      },
      {
        name: '河北盛创公路工程有限公司',
        type: 'scatter',
        data: [
          0,
          0,
          '1',
          0,
          0,
          0,
          0,
          '7',
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          '1',
          0,
          0,
          0
        ]
      },
      {
        name: '河北广润建筑工程有限公司',
        type: 'scatter',
        symbolSize: () => 15,
        data: [
          0,
          0,
          0,
          0,
          '1',
          0,
          0,
          0,
          '1',
          0,
          '1',
          0,
          0,
          0,
          '2',
          '1',
          '1',
          0,
          0,
          0,
          '1',
          '1',
          0,
          '1',
          0,
          '1',
          0,
          0,
          0,
          0,
          0,
          '1',
          '3',
          0,
          0
        ]
      },
      {
        name: '井陉县兴通公路养护工程有限公司',
        type: 'scatter',
        data: [
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          '1',
          '1',
          0,
          '1',
          0,
          0,
          '1',
          0,
          '1',
          '4',
          0,
          '2',
          0
        ]
      },
      {
        name: '河北昕辰路桥工程有限公司',
        type: 'scatter',
        symbolSize: () => 10,
        data: [
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          '1',
          0,
          0,
          0,
          0,
          0,
          '1',
          '1',
          '1',
          0
        ]
      },
      {
        name: '四川联天望海建筑工程有限公司',
        type: 'scatter',
        symbolSize: () => 15,
        data: [
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          '1',
          0,
          '1',
          0,
          '1',
          '1',
          '2',
          0,
          '1'
        ]
      }
    ]
  }
  const options = {
    enlarge: false,
    tooltip: {
      trigger: 'axis',
      formatter: (params) => {
        const formatterText = params.map((param, index) => {
          const bizData = chartData?.chartAllData?.find(
            (item) => item.bizDate === param.name && item.bidderName === param.seriesName
          )
          const winRate = bizData?.winRate ?? 0
          const bidCount = bizData?.bidCount ?? 0
          const temp =
            bidCount !== 0
              ? `${param.marker}【${param.seriesName}】 投标次数: ${param.data} 平均中标率：${winRate}<br/>`
              : ''
          return index === 0 ? `${param.name}<br/>${temp}` : temp
        })
        return formatterText.join('')
      }
    },
    options: {
      legend: {
        show: true,
        type: 'scroll',
        icon: 'circle',
        data: chartData?.chartLegend ?? []
      }
    },
    grid: {
      top: 40,
      right: 30,
      bottom: 30,
      left: 40,
      containLabel: true
    },
    xAxis: {
      axisLabel: {
        rotate: 45,
        margin: 20
      },
      data: chartData?.chartDate ?? []
    },
    yAxis: [
      {
        name: '投标（次）',
        nameGap: 5,
        nameTextStyle: {
          padding: [0, 0, 10, 0],
          verticalAlign: 'bottom'
        }
      }
    ],
    series: chartData?.seriesData ?? []
  }
  return (
    <FixTabPanel style={{ backgroundColor: '#04060D' }}>
      <section ref={scaleDom} className={styles.bigScreen} style={{ backgroundColor: '#04060D' }}>
        <BigHeader />
        <section className='flex justify-between text-white'>
          <div
            style={{
              width: '30%',
              height: '30vh'
            }}
          >
            <PieNestCharts eOptions={pieNestOptions} />
          </div>
          <div
            style={{
              width: '40%',
              height: '30vh'
            }}
          >
            <ChinaMap />
          </div>
          <div
            style={{
              width: '30%',
              height: '30vh'
            }}
          >
            <EChartsCommon option={OfflinePortalOptions(feedbackData)} />
          </div>
        </section>
        <section style={{ marginTop: 20, color: '#fff' }}>某市项目投标数据统计</section>
        <section className='flex justify-between text-white'>
          <section style={{ height: '40vh', width: '56%' }}>
            <EChartsCommon option={options} />
          </section>
          <section style={{ height: '40vh', width: '40%' }}>
            <DonutCharts eOptions={subordOptions} />
          </section>
        </section>
      </section>
    </FixTabPanel>
  )
}

export default BigScreen
