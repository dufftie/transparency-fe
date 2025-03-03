'use client'

import { useEffect, useRef } from 'react'
import * as d3 from 'd3'
import { debounce } from 'lodash'
import './d3-graph.scss'

// Mock data for the graph
const mockData = [
  { name: 'A', value: 20 },
  { name: 'B', value: 35 },
  { name: 'C', value: 15 },
  { name: 'D', value: 40 },
  { name: 'E', value: 25 },
]

export default function D3Graph() {
  const svgRef = useRef<SVGSVGElement>(null)

  const drawChart = () => {
    if (!svgRef.current) return

    // Clear previous chart
    d3.select(svgRef.current).selectAll('*').remove()

    const svg = d3.select(svgRef.current)
    const width = svgRef.current.clientWidth
    const height = svgRef.current.clientHeight
    const margin = { top: 20, right: 30, bottom: 40, left: 40 }
    const innerWidth = width - margin.left - margin.right
    const innerHeight = height - margin.top - margin.bottom

    // Create scales
    const xScale = d3
    .scaleBand()
    .domain(mockData.map((d) => d.name))
    .range([0, innerWidth])
    .padding(0.2)

    const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(mockData, (d) => d.value) || 0])
    .nice()
    .range([innerHeight, 0])

    // Create group element
    const g = svg.append('g').attr('transform', `translate(${ margin.left },${ margin.top })`)

    // Add x-axis
    g.append('g')
    .attr('transform', `translate(0,${ innerHeight })`)
    .call(d3.axisBottom(xScale))
    .append('text')
    .attr('y', 30)
    .attr('x', innerWidth / 2)
    .attr('fill', 'black')
    .attr('text-anchor', 'middle')

    // Add y-axis
    g.append('g')
    .call(d3.axisLeft(yScale))
    .append('text')
    .attr('transform', 'rotate(-90)')
    .attr('y', -30)
    .attr('x', -innerHeight / 2)
    .attr('fill', 'black')
    .attr('text-anchor', 'middle')

    // Add bars
    g.selectAll('.bar')
    .data(mockData)
    .enter()
    .append('rect')
    .attr('class', 'bar')
    .attr('x', (d) => xScale(d.name) || 0)
    .attr('y', (d) => yScale(d.value))
    .attr('width', xScale.bandwidth())
    .attr('height', (d) => innerHeight - yScale(d.value))
    .attr('fill', '#1890ff')

    // Add title
    svg
    .append('text')
    .attr('x', width / 2)
    .attr('y', margin.top / 2)
    .attr('text-anchor', 'middle')
    .attr('class', 'graph-title')
  }

  useEffect(() => {
    drawChart()

    const handleResize = debounce(() => {
      drawChart()
    }, 300)

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, []) // Removed drawChart from dependencies

  return (
    <div className="d3-graph-container">
      <svg ref={ svgRef } className="d3-graph" />
    </div>
  )
}

