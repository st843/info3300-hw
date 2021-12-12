// ----- MAKE YOUR CHANGES BETWEEN THESE LINES FOR #7 -----


// setting up svg
const scatter = d3.select("svg#scatter");
const scatterWidth = scatter.attr("width");
const scatterHeight = scatter.attr("height");
const scatterMargin = {bottom: 32, left: 32, top: 10, right: 10};

const scatterChartWidth = scatterWidth - scatterMargin.left - scatterMargin.right;
const scatterChartHeight = scatterHeight - scatterMargin.top - scatterMargin.bottom;

let scatterArea = scatter.append("g")
                         .attr("transform","translate("+scatterMargin.right+","+scatterMargin.top+")")
                         .attr('class', 'chart');
let labels = scatter.append('g').attr('id', 'labels');


const scatterData = async function() {
    let ages = await d3.json('olympic_ages.json');


    const parseYear = d3.timeParse("%Y");
    ages.forEach( d => {
        d['date'] = parseYear(d['date']); 
    } );
    console.log(ages);

    // extents and scales
    const timeExtent = d3.extent(ages, d => d['date']);
    console.log(timeExtent);
    const ageExtent = d3.extent(ages, d=> d['age']);
    console.log(ageExtent);
    const timeScale = d3.scaleTime().domain(timeExtent).range([scatterMargin.left, scatterChartWidth+20]);
    const ageScale = d3.scaleLinear().domain(ageExtent).range([scatterChartHeight, scatterMargin.top]);
    const sportScale = d3.scaleOrdinal(d3.schemeCategory10);


    //setting up axes
    let leftAxis = d3.axisLeft(ageScale);
    let leftGridlines = d3.axisLeft(ageScale)
                          .tickSize(-scatterChartWidth-5)
                          .tickFormat("");

    labels.append("g")
               .attr("class", "y gridlines")
               .attr("transform","translate("+(scatterMargin.left)+","+scatterMargin.top+")")
               .call(leftGridlines);
    labels.append("g")
               .attr("class", "y axis")
               .attr("transform","translate("+(scatterMargin.left)+","+scatterMargin.top+")")
               .call(leftAxis);


    let bottomAxis = d3.axisBottom(timeScale);
    let bottomGridlines = d3.axisBottom(timeScale).tickSize(-scatterChartHeight)
                            .tickFormat("");

    labels.append("g")
          .attr("class", "x gridlines")
          .attr("transform","translate("+scatterMargin.right+","+(scatterChartHeight+scatterMargin.top+10)+")")
          .call(bottomGridlines);
    labels.append("g")
          .attr("class", "x axis")
          .attr("transform","translate("+scatterMargin.right+","+(scatterChartHeight+scatterMargin.top+10)+")")
          .call(bottomAxis);

    // jitter function
    function jitter () {
        return Math.floor(Math.random() * (6) + (-3)) ;
    }

    scatterArea.selectAll("circle").data(ages)
        .join("circle")
        .attr('cx', d => timeScale(d['date']) + jitter())
        .attr('cy', d=> ageScale(d['age']))
        .attr('r', 5)
        .style('fill', d => sportScale(d['sport']))
        .attr('opacity', 0.4);

}


// end of scatterData
scatterData();




// ----- MAKE YOUR CHANGES BETWEEN THESE LINES FOR #7 -----
