var humvprice = (function() {
var margin = {top: 20, right: 20, bottom: 50, left: 50},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;


var x = d3.scaleLinear().range([0, width]);
var y = d3.scaleLinear().range([height, 0]);

var tip = d3.tip()
            .attr("class", "d3-tip")
            .html(function(d){
              console.log(d)
            return `${d.name}`
            })
            .direction("nw")
            .offset([0,3])
            
var svg = d3.select("#humvprice").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")")
    .call(tip);

function process_data (data) {
  
    console.log("start:", data);
    data = data.result
    console.log(data);

  // Scale the range of the data
  x.domain([d3.min(data, function(d) {
    return d.hum}) - 5,
    d3.max(data, function(d) {
    return d.hum}) + 5
  ]);
  y.domain([d3.min(data, function(d) {
    return d.price / 1000000}) * .8,
    d3.max(data, function(d) {
    return d.price / 1000000}) * 1.2
  ]);
      
  // Add the scatterplot
  svg.selectAll("dot")
      .data(data)
      .enter()
      .append("circle")
      .attr("r", 4)
      .attr("cx", function(d) { return x(d.hum); })
      .attr("cy", function(d) { return y(d.price / 1000000); })
      .style("fill", "#333")
      .on("mouseover", tip.show)
      .on("mouseout", tip.hide)

  // svg.selectAll("text")
  //     .data(data)
  //     .enter()
  //     .append("text")
  //     .text((d) => d.abbr)
  //     .attr("x", function(d) { return x(d.temp); })
  //     .attr("y", function(d) { return y(d.poverty); })
  //     .attr("text-anchor", "middle")
  //     .attr("dy", ".35em")
  //     .style("stroke", "#fff")
  //     .on("mouseover", tip.show)
  //     .on("mouseout", tip.hide)

  // Add the X Axis
  svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

  // Add the Y Axis
  svg.append("g")
      .call(d3.axisLeft(y));
  
  svg.append("text")
     .attr("transform", "rotate(-90)")
     .attr("y", 0-margin.left)
     .attr("x", 0-(height/2))
     .attr("dy", "1em")
     .attr("text-anchor", "middle")
     .text("2021 Average Home Prices (m)")

  svg.append("text")             
  .attr("transform",
        "translate(" + (width/2) + " ," + 
                      (height + margin.top + 20) + ")")
  .style("text-anchor", "middle")
  .text("Humidity");

};
return process_data
})();