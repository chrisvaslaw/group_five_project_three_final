var pressvprice = (function() {
var margin = {top: 20, right: 20, bottom: 150, left: 150},
    width = window.innerWidth - margin.left - margin.right,
    height = window.innerHeight - margin.top - margin.bottom;


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
            
var svg = d3.select("#pressvprice").append("svg")
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
    return d.press}) - 5,
    d3.max(data, function(d) {
    return d.press}) + 5
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
      .attr("cx", function(d) { return x(d.press); })
      .attr("cy", function(d) { return y(d.price / 1000000); })
      .style("fill", "#333")
      .on("mouseover", tip.show)
      .on("mouseout", tip.hide)

  // Add the X Axis
  svg.append("g")
      .style("font", "2em times")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

  // Add the Y Axis
  svg.append("g")
      .style("font", "2em times")
      .call(d3.axisLeft(y));
  
  svg.append("text")
     .attr("transform", "rotate(-90)")
     .attr("y", 0-margin.left)
     .attr("x", 0-(height/2))
     .attr("dy", "1em")
     .attr("text-anchor", "middle")
     .attr("font-size", "3em")
     .text("2021 Average Home Prices (m)")

  svg.append("text")             
  .attr("transform",
        "translate(" + (width/2) + " ," + 
                      (height + margin.top + 60) + ")")
  .style("text-anchor", "middle")
  .attr("font-size", "3em")
  .text("Pressure");

};
return process_data
})();