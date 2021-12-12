// ----- MAKE YOUR CHANGES BETWEEN THESE LINES FOR #9 -----
const bars = d3.select("svg#bars");

let barArea = bars.append("g")
                     .attr('class', 'chart');
let axis = bars.append("g")
                  .attr('class', 'axis')
                  .attr("transform","translate("+0+","+100+")");

const barData = async function() {
    let penguins = await d3.csv("penguin_flippers.csv");
    console.log(penguins);

    penguins = penguins.filter( d =>  d['count'] != "HANDLE_THIS_BAD_VALUE_BY_ELIMINATING_THIS_ENTIRE_ROW!");
    penguins = penguins.filter( d =>  d['flipper_length'] != "HANDLE_THIS_BAD_VALUE_BY_ELIMINATING_THIS_ENTIRE_ROW!");

    console.log(penguins);
    penguins.forEach( (d, i) => {
        d['flipper_length'] = Number(d['flipper_length']);
        d['count'] = Number(d['count']);
    });

    // extents and scales
    const flipperExtent = d3.extent(penguins, d => d['flipper_length']);
    console.log(flipperExtent);
    const flipperScale = d3.scaleLinear().domain(flipperExtent).range([10,490]);
    const countExtent = d3.extent(penguins, d => d['count']);
    const countScale = d3.scaleLinear().domain(countExtent).range([100, 0]);
    const colorScale = d3.scaleOrdinal().domain(["Adelie","Gentoo","Chinstrap"]).range(["crimson","chartreuse","royalblue"]);

    let barBottomAxis = d3.axisBottom(flipperScale);

    axis.append("g")
          .attr("class", "x axis")
          .call(barBottomAxis);

    barArea.selectAll('rect.bar')
           .data(penguins)
           .join('rect')
           .attr('class', 'bar')
           .attr('x', d => flipperScale(d['flipper_length']) )
           .attr('y', d => countScale(d['count']) )
           .attr('height', d => countScale(0) - countScale(d['count']) )
           .attr('width', 14)
           .attr('fill', d => colorScale(d['species']))
           .attr('stroke', 'none')
           .attr('opacity', 0.8);

}


// end of barData
barData();







// ----- MAKE YOUR CHANGES BETWEEN THESE LINES FOR #9 -----
