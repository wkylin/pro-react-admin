import React, { useEffect, useRef } from 'react'
import L from 'leaflet'
import { TiledMapLayer } from '@supermapgis/iclient-leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet.markercluster/dist/leaflet.markercluster-src.js'
import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'
import markerIcon from './icon.png'

import styles from './index.module.less'

const SuperMap = () => {
  const superMapRef = useRef(null)
  const tiledLayerRef = useRef(null)
  const markerClusterRef = useRef(null)

  const iconList = [
    {
      locationX: 121.44,
      locationY: 31.25
    },
    {
      locationX: 121.54,
      locationY: 31.14
    },
    {
      locationX: 121.473919,
      locationY: 30.955082
    },
    {
      locationX: 121.447153,
      locationY: 30.800443
    }
  ]

  useEffect(() => {
    initSuperMap()
  }, [])

  useEffect(() => {
    getResultLayer(iconList)
  }, [])
  const initSuperMap = () => {
    const url = 'https://iserver.supermap.io/iserver/services/map-china400/rest/maps/China_4326'

    const map = L.map('superMap', {
      preferCanvas: true,
      crs: L.CRS.EPSG4326,
      center: [30.92, 121.56],
      maxZoom: 18,
      minZoom: 3,
      zoom: 3,
      attributionControl: false,
      zoomControl: true
    })
    const layer = new TiledMapLayer(url)
    layer.addTo(map)
    superMapRef.current = map
    tiledLayerRef.current = layer

    // map.on('click', function (e) {
    //   console.log('e', e);
    // });
  }

  const getResultLayer = (projectList) => {
    if (markerClusterRef.current) {
      superMapRef?.current?.removeLayer(markerClusterRef.current)
    }

    const markerCluster = L.markerClusterGroup({
      spiderfyOnMaxZoom: true,
      showCoverageOnHover: false,
      zoomToBoundsOnClick: true
    })

    markerClusterRef.current = markerCluster

    projectList.forEach((element) => {
      const lat = element.locationY
      const lon = element.locationX

      const iconUrl = markerIcon

      const myIcon = L.icon({
        iconUrl,
        iconSize: [20, 24]
      })

      const marker = L.marker([lat, lon], {
        icon: myIcon
      })

      markerCluster.addLayer(marker)
    })

    superMapRef?.current?.addLayer(markerCluster)
  }

  return (
    <section className={styles.homeBox}>
      <div id='superMap' className={styles.superMap} ref={superMapRef} />
    </section>
  )
}

export default SuperMap
