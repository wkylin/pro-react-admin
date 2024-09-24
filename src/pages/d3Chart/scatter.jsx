import React, { useEffect, useRef } from 'react'
import * as d3 from 'd3'

const ScatterPlot = ({ data }) => {
  const svgRef = useRef()
  useEffect(() => {
    const svg = d3.select(svgRef.current)
    const width = 500
    const height = 500
    const margin = { top: 20, right: 20, bottom: 30, left: 40 }

    svg
      .attr('width', width)
      .attr('height', height)
      .style('background', '#f0f0f0')
      .style('margin', '50px')
      .style('overflow', 'visible')
    const x = d3
      .scaleLinear()
      .domain([0, 100])
      .range([margin.left, width - margin.right])

    const y = d3
      .scaleLinear()
      .domain([0, 100])
      .range([height - margin.bottom, margin.top])

    svg
      .append('g')
      .attr('transform', `translate(0, ${height - margin.bottom})`)
      .call(d3.axisBottom(x))

    svg.append('g').attr('transform', `translate(${margin.left}, 0)`).call(d3.axisLeft(y))

    svg
      .selectAll('circle')
      .data(data)
      .enter()
      .append('circle')
      .attr('cx', (d) => x(d.x))
      .attr('cy', (d) => y(d.y))
      .attr('r', 5)
      .attr('fill', 'blue')
  }, [data])

  return <svg ref={svgRef}></svg>
}

export default ScatterPlot
