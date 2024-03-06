import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const PieChart = ({ selectedYear, yearData }) => {
    const chartRef = useRef();

    useEffect(() => {
        if (yearData) {
            drawPieChart();
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [yearData, selectedYear]);

    const drawPieChart = () => {
        // Clear previous chart
        d3.select(chartRef.current).selectAll("*").remove();

        const width = 300;
        const height = 300;
        const radius = Math.min(width, height) / 2;

        const svg = d3.select(chartRef.current)
            .append('svg')
            .attr('width', width)
            .attr('height', height)
            .append('g')
            .attr('transform', `translate(${width / 2}, ${height / 2})`);

        const color = d3.scaleOrdinal(d3.schemeCategory10);

        const pie = d3.pie()
            .value(d => d.value);

        let filteredData;
        if (selectedYear) {
            // Filter data based on selectedYear
            filteredData = [{ label: selectedYear, value: yearData[selectedYear] }];
        } else {
            // Use all data
            filteredData = Object.entries(yearData).map(([key, value]) => ({ label: key, value }));
        }

        const arcs = pie(filteredData);

        const arc = d3.arc()
            .innerRadius(0)
            .outerRadius(radius);

        // Draw the original pie chart
        svg.selectAll('path')
            .data(arcs)
            .enter()
            .append('path')
            .attr('d', arc)
            .attr('fill', (d, i) => color(i))
            .attr('stroke', 'white')
            .style('stroke-width', '2px')
            .style('opacity', d => selectedYear ? (d.data.label === selectedYear ? 1 : 0.5) : 1); // Adjust opacity based on selectedYear

        // Highlight the selected year by cutting out its section
        if (selectedYear) {
            const highlightArc = d3.arc()
                .innerRadius(radius) // Adjust the inner radius to create a cut-out effect
                .outerRadius(radius)
                .cornerRadius(10); // Add corner radius for a smoother cut-out

            svg.append('path')
                .attr('d', highlightArc(arcs.find(d => d.data.label === selectedYear)))
                .attr('fill', '#ffffff') // Use white color to make it look like a cut-out
                .attr('stroke', '#ffffff') // Hide the stroke
                .style('stroke-width', '2px')
                .attr('pointer-events', 'none'); // Disable pointer events to allow interaction with underlying chart
        }
    };




    return (
        <div ref={chartRef}></div>
    );
};

export default PieChart;
