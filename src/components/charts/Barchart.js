import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const BarChart = ({ sector, topic, data }) => {
    const chartRef = useRef();



    useEffect(() => {
        if (!data) return;

        drawChart();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, sector, topic]);

    const drawChart = () => {
        d3.select(chartRef.current).selectAll("*").remove();
        // Find the index of the bar to highlight
        let highlightIndex = -1;
        if (sector && !topic) {
            // Show sector wise only
            highlightIndex = data.findIndex(item => item.sector === sector);
        } else if (!sector && topic) {
            // Show topic wise only
            highlightIndex = data.findIndex(item => item.topic === topic);
        } else if (sector && topic) {
            // Show both sector and topic
            // eslint-disable-next-line no-unused-vars
            highlightIndex = data.findIndex(item => item.sector === sector && item.topic === topic);
        }



        // Set up dimensions for the chart
        const width = 800;
        const height = 300;
        const margin = { top: 20, right: 20, bottom: 10, left: 40 };

        // Create scales for x and y axes
        const x = d3.scaleBand()
            .domain(data.map(d => d.topic))
            .range([0, width])
            .padding(0.4);

        const y = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.intensity)])
            .range([height, 0]);

        // Create SVG element
        const svg = d3.select(chartRef.current)
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`);

        // Add x axis
        svg.append("g")
            .attr("transform", `translate(0, ${height})`)
            .call(d3.axisBottom(x).tickSize(0));

        // Remove x-axis label text
        svg.selectAll('.tick text').remove();

        // Add y axis
        svg.append("g")
            .call(d3.axisLeft(y));

        // Add bars to the chart
        // eslint-disable-next-line no-unused-vars
        const bars = svg.selectAll(".bar")
            .data(data)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", d => x(d.topic))
            .attr("y", d => y(d.intensity))
            .attr("width", x.bandwidth())
            .attr("height", d => height - y(d.intensity))
            .attr("fill", "steelblue")
            .on("mouseover", function (event, d) {
                d3.select(this).attr("fill", "orange");

                // Show tooltip alongside the mouse
                tooltip.style("left", (event.pageX + 10) + "px")
                    .style("top", (event.pageY - 10) + "px")
                    .style("opacity", 1)
                    .html(`<strong>Sector:</strong> ${d.sector}<br><strong>Topic:</strong> ${d.topic}`);
            })
            .on("mouseout", function (event, d) {
                d3.select(this).attr("fill", "steelblue");

                // Hide tooltip
                tooltip.style("opacity", 0);
            });

        // Tooltip
        const tooltip = d3.select(chartRef.current)
            .append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);
    }


    return (
        <div ref={chartRef}></div>
    );
};

export default BarChart;
