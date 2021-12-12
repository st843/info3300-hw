// ----- MAKE YOUR CHANGES BETWEEN THESE LINES FOR #7 -----

// setting up svg
const scatter = d3.select("svg#scatter");
const scatterWidth = scatter.attr("width");
const scatterHeight = scatter.attr("height");
const scatterMargin = {bottom: 32, left: 32, top: 10, right: 10};

const scatterChartWidth = scatterWidth - scatterMargin.left - scatterMargin.right;
const scatterChartHeight = scatterHeight - scatterMargin.top - scatterMargin.bottom;

let scatterArea = scatter.append("g")
                         .attr("transform","translate("+scatterMargin.left+","+scatterMargin.top+")")
                         .attr('id', 'points');
let labels = scatter.append('g').attr('id', 'labels');

const scatterData = async function() {
    let ages = await d3.json('olympic_ages.json');
    console.log(ages);

    const parseYear = d3.timeParse("%Y");
    ages.forEach( d => {
        d['date'] = parseYear(d['date']).getFullYear();
    } );
    console.log(ages);

    // extents and scales
    const timeExtent = d3.extent(ages, d => d['date']);
    console.log(timeExtent);

    




}


// end of scatterData
scatterData();




// ----- MAKE YOUR CHANGES BETWEEN THESE LINES FOR #7 -----
