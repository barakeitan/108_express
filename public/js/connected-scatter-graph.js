
      const scatGraphWidth = 460, scatGraphHeight = 400;
      
      // set the dimensions and margins of the graph
      var margin = {top: 10, right: 30, bottom: 30, left: 60},
          width = scatGraphWidth - margin.left - margin.right,
          height = scatGraphHeight - margin.top - margin.bottom;
      
      // append the svg object to the body of the page
      var svg2 = d3.select("#scatter-svg")
        .attr("width", scatGraphWidth)
        .attr("height", scatGraphHeight)
        .append("g")
        .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");
      
      var scatterData;
      $.get("/user/admin/scatter-data", (data, status) =>{scatterData = data; console.log("data in scatter : ", scatterData)});

      //Read the data - Just testing!! 
      d3.json(scatterData, function(data) {

          // Add X axis
          var x = d3.scaleBand()
          .range([ 0, width ])
          .domain(scatterData.map(function(d) { return d.slug; }))
          .padding(0.9);
        svg2.append("g")
          .attr("transform", "translate(0," + height + ")")
          .call(d3.axisBottom(x))
          .selectAll("text")
            .attr("transform", "translate(-10,0)rotate(-45)")
            .style("text-anchor", "end");

          // Add Y axis
          var y = d3.scaleLinear()
          .domain([0, 20])
          .range([ height, 0]);
        svg2.append("g")
          .call(d3.axisLeft(y));

          // Add the line
          svg2.append("path")
            .datum(scatterData)
            .attr("fill", "none")
            .attr("stroke", "#69b3a2")
            .attr("stroke-width", 1.5)
            .attr("d", d3.line()
              .x(function(d) { return x(d.slug) })
              .y(function(d) { return y(d.value) })
              )
            .on("mouseover", function(){d3.select(this).style("stroke", "orange");})
            .on("mouseout", function(){d3.select(this).style("stroke", "#69b3a2");})
          // Add the points
          svg2
            .append("g")
            .selectAll("dot")
            .data(scatterData)
            .enter()
            .append("circle")
              .attr("cx", function(d) { return x(d.slug) } )
              .attr("cy", function(d) { return y(d.value) } )
              .attr("r", 5)
              .attr("fill", "#69b3a2")
            .on("mouseover", function(){d3.select(this).style("fill", "orange");})
            .on("mouseout", function(){d3.select(this).style("fill", "#69b3a2");})
      })
     