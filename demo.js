// The svg
const svg = d3.select("#my_dataviz"),
    width = 800,  // Adjust the width to your preference
    height = 600; // Adjust the height to your preference

// Update SVG dimensions
svg.attr("width", width).attr("height", height);

// Map and projection
const projection = d3.geoMercator()
    .center([0, 0])                // Centered at [0, 0] to show the whole world
    .scale(150)                     // Adjust the scale for better visibility
    .translate([width / 2, height / 2]);

// Load external data and boot
d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson").then(function (data) {
    // Draw the map
    svg.append("g")
        .selectAll("path")
        .data(data.features)
        .join("path")
        .attr("fill", "#b8b8b8")
        .attr("d", d3.geoPath().projection(projection))
        .style("stroke", "black")
        .style("opacity", 0.3);

    // Add circles for specified locations
    const markers = [
        { long: 9.083, lat: 42.149, name: "Corsica" },
        { long: 7.26, lat: 43.71, name: "Nice" },
        { long: 2.349, lat: 48.864, name: "Paris" },
        { long: -1.397, lat: 43.664, name: "Hossegor" },
        { long: 3.075, lat: 50.64, name: "Lille" },
        { long: -3.83, lat: 58, name: "Morlaix" },
        { long: 77.209, lat: 28.6139, name: "New Delhi" },
        { long: 77.5946, lat: 12.9716, name: "Bangalore" },
        { long: 80.2707, lat: 13.0827, name: "Chennai" },
        { long: -121.9552, lat: 37.3541, name: "Santa Clara" },
        { long: -119.4179, lat: 36.7783, name: "California" },
        { long: -74.0059, lat: 40.7128, name: "New York" },
        { long: -0.1276, lat: 51.5074, name: "London" }
    ];

    // Add circles with tooltips
    const circles = svg.selectAll("circle")
        .data(markers)
        .enter()
        .append("circle")
        .attr("cx", d => projection([d.long, d.lat])[0])
        .attr("cy", d => projection([d.long, d.lat])[1])
        .attr("r", 14)
        .style("fill", "#69b3a2")
        .attr("stroke", "#69b3a2")
        .attr("stroke-width", 3)
        .attr("fill-opacity", 0.4)
        .on("mouseover", function (event, d) {
            // Show tooltip on mouseover
            svg.append("text")
                .attr("class", "tooltip")
                .attr("x", projection([d.long, d.lat])[0])
                .attr("y", projection([d.long, d.lat])[1] - 20)
                .attr("text-anchor", "middle")
                .attr("font-size", "12px")
                .text(d.name);
        })
        .on("mouseout", function () {
            // Remove tooltip on mouseout
            svg.select(".tooltip").remove();
        });
});
