import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const CircularBarPlot = ({ selectedCountry }) => {
    console.log(selectedCountry);
    const chartRef = useRef();

    const fetchDataFromAPI = async () => {
        const response = await fetch('http://localhost:5000/filterData?country=');
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        // Filter out null country values
        return data.filter(item => item.country !== null);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const drawChart = (data) => {
        d3.select(chartRef.current).selectAll("*").remove();
        // Count occurrences of each country
        const countryMap = {};
        data.forEach(item => {
            const country = item.country;
            if (country) {
                countryMap[country] = (countryMap[country] || 0) + 1;
            }
        });

        // Convert countryMap to array of objects for D3 data binding
        const countryData = Object.entries(countryMap).map(([country, count]) => ({ country, count }));

        // Set up dimensions for the chart
        const width = 400;
        const height = 400;
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
            .range([0, radius]); // Adjust the range based on the radius

        // Create bars
        svg.selectAll('rect')
            .data(countryData)
            .enter()
            .append('rect')
            .attr('x', -5) // Shift the bars slightly inward
            .attr('y', -radius) // Start at the top
            .attr('width', 10) // Width of the bars
            .attr('height', d => scale(d.count)) // Height proportional to the data value
            .attr('transform', (_d, i) => `rotate(${(i * 360) / countryData.length})`) // Rotate each bar
            .attr('fill', d => d.country === selectedCountry ? 'green' : 'steelblue')
            .on('mouseover', (event, d) => {
                // Show tooltip on mouseover
                tooltip.style('left', `${event.pageX}px`)
                    .style('top', `${event.pageY}px`)
                    .style('opacity', 1)
                    .html(`<strong>${d.country}</strong>: ${d.count}`);
            })
            .on('mouseout', () => {
                // Hide tooltip on mouseout
                tooltip.style('opacity', 0);
            });

        const tooltip = d3.select('body')
            .append('div')
            .attr('class', 'tooltip')
            .style('opacity', 0)
            .style('position', 'absolute')
            .style('background-color', 'white')
            .style('border', '1px solid #ddd')
            .style('border-radius', '5px')
            .style('padding', '10px')
            .style('top', 0) // Set initial top position to 0
            .style('left', 0);
    };

    useEffect(() => {
        fetchDataFromAPI()
            .then(data => {
                drawChart(data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, [drawChart, selectedCountry]);

    return (
        <div ref={chartRef}></div>
    );
};

export default CircularBarPlot;
