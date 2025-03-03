"use client";

import React, { useEffect, useRef, useState } from "react";
import { select, axisBottom, axisLeft, scaleTime, scaleLinear, max, timeFormat, timeMonth } from "d3";

const ArticleBarChart = ({data}) => {
  const wrapperRef = useRef(null);
  const svgRef = useRef(null);
  const [dimensions, setDimensions] = useState({width: 0, height: 0});

  useEffect(() => {
    const updateDimensions = () => {
      if (wrapperRef.current) {
        const {width, height} = wrapperRef.current.getBoundingClientRect();
        setDimensions({width, height});
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  useEffect(() => {
    if (!data || data.length === 0 || dimensions.width === 0 || dimensions.height === 0) return;

    const {width, height} = dimensions;
    const svg = select(svgRef.current);

    // Convert 'YYYY-MM-DD' strings to Date objects
    const parsedData = data.map(d => ({
      ...d,
      date: new Date(d.date)
    }));

    // Find max value for y-axis
    const yMax = max(parsedData, (d) => Math.max(d.articles_count, d.analysed_count)) || 0;

    // X Scale (Time-based)
    const xScale = scaleTime()
    .domain([parsedData[0].date, parsedData[parsedData.length - 1].date])
    .range([50, width - 10]);

    // Y Scale
    const yScale = scaleLinear()
    .domain([0, yMax])
    .range([height - 50, 10]);

    // X Axis (Monthly Ticks)
    const xAxis = axisBottom(xScale)
    .ticks(timeMonth, 1)  // Alternative to `timeMonth.every(1)`
    .tickFormat(timeFormat("%b"));

    svg.select<SVGGElement>(".x-axis")
    .attr("transform", `translate(0, ${ height - 50 })`)
    .call(xAxis);

    // Y Axis
    const yAxis = axisLeft(yScale).ticks(5);
    svg.select<SVGGElement>(".y-axis")
    .attr("transform", "translate(50, 0)")
    .call(yAxis);

    // Bar width
    const barWidth = (width - 60) / parsedData.length;

    // Draw 'articles_count' bars (bottom layer)
    svg
    .selectAll(".articles-bar")
    .data(parsedData)
    .join("rect")
    .attr("class", "articles-bar")
    .attr("x", (d) => xScale(d.date) - barWidth / 2)
    .attr("width", barWidth * 0.9) // Slightly narrower
    .attr("y", (d) => yScale(d.articles_count))
    .attr("height", (d) => height - 50 - yScale(d.articles_count))
    .attr("fill", "gray");

    // Draw 'analysed_count' bars (top layer)
    svg
    .selectAll(".analysed-bar")
    .data(parsedData)
    .join("rect")
    .attr("class", "analysed-bar")
    .attr("x", (d) => xScale(d.date) - barWidth / 2 + barWidth * 0.05) // Slight shift for visibility
    .attr("width", barWidth * 0.8) // Slightly narrower than bottom bars
    .attr("y", (d) => yScale(d.analysed_count))
    .attr("height", (d) => height - 50 - yScale(d.analysed_count))
    .attr("fill", "blue");

  }, [data, dimensions]);

  return (
    <div ref={ wrapperRef } style={ {height: 500, width: "100%", position: "relative"} }>
      <svg
        ref={ svgRef }
        style={ {width: "100%", height: "100%"} }
        viewBox={ `0 0 ${ dimensions.width } ${ dimensions.height }` }
        preserveAspectRatio="xMidYMid meet"
      >
        <g className="x-axis"/>
        <g className="y-axis"/>
      </svg>
    </div>
  );
};

export default ArticleBarChart;