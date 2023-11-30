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
        { long: 9.083, lat: 42.149 },   // Corsica
        { long: 7.26, lat: 43.71 },      // Nice
        { long: 2.349, lat: 48.864 },    // Paris
        { long: -1.397, lat: 43.664 },   // Hossegor
        { long: 3.075, lat: 50.64 },     // Lille
        { long: -3.83, lat: 58 },        // Morlaix
    ];

    svg.selectAll("myCircles")
        .data(markers)
        .join("circle")
        .attr("cx", d => projection([d.long, d.lat])[0])
        .attr("cy", d => projection([d.long, d.lat])[1])
        .attr("r", 14)
        .style("fill", "#69b3a2")
        .attr("stroke", "#69b3a2")
        .attr("stroke-width", 3)
        .attr("fill-opacity", 0.4);
});
