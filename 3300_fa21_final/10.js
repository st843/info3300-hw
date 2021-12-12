// ----- MAKE YOUR CHANGES BETWEEN THESE LINES FOR #10 -----
 
const map = d3.select("svg#map");
const mapWidth = map.attr('width');
const mapHeight = map.attr('height');

const mapData = async function() {

    const europeTopo = await d3.json('europe.topojson');

    var countries = topojson.feature(europeTopo, europeTopo.objects.europe);

    var projection = d3.geoMercator().fitSize([mapWidth, mapHeight], countries);
    var path = d3.geoPath().projection(projection);

    // scales
    const giniExtent = d3.extent(countries.features, d => d.properties.gini);
    const giniScale = d3.scaleSequential(d3.interpolatePlasma).domain(giniExtent);

    map.selectAll("path.country").data(countries.features)
      .join("path")
      .attr("class", "country")
      .attr("d", path)
      .style('fill', d => giniScale(d.properties.gini))
      .attr('stroke', 'none');


}

// end of mapData
mapData();







// ----- MAKE YOUR CHANGES BETWEEN THESE LINES FOR #10 -----
