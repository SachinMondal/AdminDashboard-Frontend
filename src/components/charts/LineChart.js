import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const LineGraph = ({ data }) => {
    const chartRef = useRef();



    useEffect(() => {
        drawGraph();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    const drawGraph = () => {
        d3.select(chartRef.current).selectAll("*").remove();
        const margin = { top: -0.5, right: 20, bottom: 20, left: 5 };
        const width = 7000 - margin.left - margin.right;
        const height = 60 - margin.top - margin.bottom;

        const svg = d3.select(chartRef.current)
            .append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

        const line = d3.line()
            .x((d, i) => i * (width / (data.length - 1)))
            .y(d => height - d.relevance)
            .curve(d3.curveMonotoneX);

        svg.append('path')
            .datum(data)
            .attr('class', 'line')
            .attr('d', line)
            .attr('fill', 'none')
            .attr('stroke', 'steelblue')
            .attr('stroke-width', 2);

        // Append circles for each data point
        svg.selectAll('.dot')
            .data(data)
            .enter()
            .append('circle')
            .attr('class', 'dot')
            .attr('cx', (d, i) => i * (width / (data.length - 1)))
            .attr('cy', d => height - d.relevance)
            .attr('r', 5)
            .attr('fill', 'steelblue')
            .style('opacity', 0)
            .on('mouseover', function (event, d) {
                d3.select(this)
                    .style('opacity', 1);

                // Show tooltiptoo
                tooltip.transition()
                    .duration(200)
                    .style('opacity', .9);
                tooltip.html(`<strong>Relevance:</strong> ${d.relevance}`)
                    .style('left', (event.pageX + 10) + 'px')
                    .style('top', (event.pageY - 28) + 'px');
            })
            .on('mouseout', function () {
                d3.select(this)
                    .style('opacity', 0);

                // Hide tooltip
                tooltip.transition()
                    .duration(500)
                    .style('opacity', 0);
            });

        // Append tooltip
        const tooltip = d3.select('body')
            .append('div')
            .attr('class', 'tooltip')
            .style('opacity', 0)
            .style('position', 'absolute')
            .style('background-color', 'white')
            .style('border', '1px solid #ddd')
            .style('border-radius', '5px')
            .style('padding', '10px')
            .style('top', 0)
            .style('left', 0);
    };

    return <div ref={chartRef}></div>;
};

export default LineGraph;
