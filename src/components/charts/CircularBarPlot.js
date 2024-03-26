import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const CircularBarPlot = ({ selectedCountry, data }) => {
    const chartRef = useRef();

    useEffect(() => {
        drawChart(data);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, selectedCountry]);

    const drawChart = (data) => {
        d3.select(chartRef.current).selectAll("*").remove();

        // Convert countryDictionary to an array of objects for D3 data binding
        const countryData = Object.entries(data).map(([country, count]) => ({ country, count }));

        // Set up dimensions for the chart
        const width = 300;
        const height = 300;
        const radius = Math.min(width, height) / 2;

        // Create SVG element
        const svg = d3.select(chartRef.current)
            .append('svg')
            .attr('width', width)
            .attr('height', height)
            .append('g')
            .attr('transform', `translate(${width / 2},${height / 2})`);

        // Define the scale for the circular bar plot
        const scale = d3.scaleLinear()
            .domain([0, d3.max(countryData, d => d.count)])
            .range([0, radius]);

        // Create bars
        svg.selectAll('rect')
            .data(countryData)
            .enter()
            .append('rect')
            .attr('x', -5)
            .attr('y', -radius)
            .attr('width', 10)
            .attr('height', d => scale(d.count))
            .attr('transform', (_d, i) => `rotate(${(i * 360) / countryData.length})`)
            .attr('fill', d => d.country === selectedCountry ? 'green' : 'steelblue')
            .attr('scale', d => d.country === selectedCountry ? 1.5 : 1)
            .on('mouseover', function (event, d) {
                // Increase scale on mouseover
                d3.select(this)
                    .transition()
                    .duration(200)

                tooltip.style('opacity', 1)
                    .html(`<strong>${d.country}</strong>: ${d.count}`)
                    .style('left', `${event.pageX}px`)
                    .style('top', `${event.pageY}px`);
            })
            .on('mouseout', function () {
                d3.select(this)
                    .transition()
                    .duration(200)



                tooltip.style('opacity', 0);
            });

        const tooltip = d3.select(chartRef.current)
            .append('div')
            .attr('class', 'tooltip')
            .style('opacity', 0)
            .style('position', 'absolute')
            .style('background-color', 'white')
            .style('border', '1px solid #ddd')
            .style('border-radius', '5px')
            .style('cursor', 'pointer')
            .style('padding', '10px');
    };


    return (
        <div ref={chartRef}></div>
    );
};

export default CircularBarPlot;
