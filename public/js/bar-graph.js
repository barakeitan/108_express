// set the dimensions and margins of the graph
const barGrapahWidth = 460, barGraphHeight = 400;
var margin = {top: 30, right: 30, bottom: 70, left: 60},
    width = barGrapahWidth - margin.left - margin.right,
    height = barGraphHeight - margin.top - margin.bottom;

var graphData;
$.get("/user/admin/bar-data", (data, status) =>{graphData = data; console.log(data)});
console.log(graphData);
// append the svg object to the body of the page
var svg = d3.select("#bar-svg")
    // .append("svg")
    .attr("width", barGrapahWidth)
    .attr("height", barGraphHeight)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Parse the Data - Just testing !!
d3.json(/*"../js/test.json"*/graphData, function(data) {

  console.log("data : ", graphData)
  // sort data
  // data.sort(function(b, a) {
  //   return a.Value - b.Value;
  // });

  // X axis
  var x = d3.scaleBand()
    .range([ 0, width ])
    .domain(graphData.map(function(d) { return d.status; }))
    .padding(0.2);
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

  // Add Y axis
  var y = d3.scaleLinear()
    .domain([0, 12])
    .range([ height, 0]);
  svg.append("g")
    .call(d3.axisLeft(y));

  // Bars
  svg.selectAll("mybar")
    .data(graphData)
    .enter()
    .append("rect")
      .attr("x", function(d) { return x(d.status); })
      .attr("y", function(d) { return y(d.value); })
      .attr("width", x.bandwidth())
      .attr("height", function(d) { return height - y(d.value); })
      .attr("fill", "#69b3a2")
      .on("mouseover", function(){d3.select(this).style("fill", "orange");})
      .on("mouseout", function(){d3.select(this).style("fill", "#69b3a2");})
})
