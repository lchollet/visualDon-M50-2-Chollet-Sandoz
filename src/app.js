//method to create a graph taking 3 parameters (number of countries, commodity and Id of the div where the graph will be displayed)
function addChart(numCountries, commodity, chartId) {
    d3.csv("../Datas/dom_clean_data.csv").then(function(data) {

      // filter data to only include specified commodity and dates between 2019-01-01 and 2020-07-01
      let filteredData = data.filter(function(d) {
        return (d.commodity === commodity) && (d.month >= "1/1/2019") && (d.month <= "7/1/2020");
      });

      // group data by country and create a new array
      let groupedData = d3.group(filteredData, function(d) { return d.country; });

      // create an array of objects with country and price difference
      let priceDiffByCountry = [];
      groupedData.forEach(function(data, country) {
        let prices = data.map(function(d) { return d.price; });
        let priceDiff = prices[prices.length-1] - prices[0];
        priceDiffByCountry.push({ country: country, priceDiff: priceDiff });
      });

      // sort the top numCountries countries by price difference
      let topCountries = priceDiffByCountry.sort(function(a,b) {
        return d3.descending(a.priceDiff, b.priceDiff);
      }).slice(0, numCountries);

      // call of the function to create the graph
      createBarChart(chartId, topCountries);
    });
}

const createConclusion = () => {
  d3.csv("../Datas/dom_clean_data.csv").then(function(data) {
    // filter data to dates between 2019-01-01 and 2020-07-01
    let filteredData = data.filter(function(d) {
      return (d.month >= "1/1/2019") && (d.month <= "7/1/2020");
    });

    // group data by commodity and create a new array
    let groupedData = d3.group(filteredData, function(d) { return d.commodity; });

    // create an array of objects with commodity, price difference
    let priceDiffByCommodity = [];
    groupedData.forEach(function(data, commodity) {
      let prices = data.map(function(d) { return d.price; });
      let priceDiff = prices[prices.length-1] - prices[0];
      priceDiffByCommodity.push({ commodity: commodity, priceDiff: priceDiff });
    });

    // create a list of the top 5 commodities with price difference
    let topCommodities = priceDiffByCommodity.sort(function(a,b) {
      return d3.descending(a.priceDiff, b.priceDiff);
    }).slice(0, 5);
    
    // log the top 5 commodities
    console.log(topCommodities);

  // initialize chart dimensions
  let svgWidth = 1200;
  let svgHeight = 400;
  let margin = { top: 20, right: 20, bottom: 20, left: 60 };
  let chartWidth = svgWidth - margin.left - margin.right;
  let chartHeight = svgHeight - margin.top - margin.bottom;

  // create x and y scales
  let xScale = d3.scaleLinear()
    .domain([0, 15])
    .range([0, chartWidth]);

  let yScale = d3.scaleBand()
    .domain(topCommodities.map(function(d) { return d.commodity; }))
    .range([0, chartHeight])
    .paddingInner(0.1)
    .paddingOuter(0.2);
    
  // create SVG and chart group
  let svg = d3.select("#conclusion").append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

  let chartGroup = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  // create bars and labels
  let bars = chartGroup.selectAll("rect")
    .data(topCommodities);

  //animate the bars
  bars.enter()
    .append("rect")
    .merge(bars)
    .transition()
    .duration(2000) // duration of the transition in milliseconds
    .attr("x", 0)
    .attr("y", function(d) { return yScale(d.commodity); })
    .attr("width", function(d) { return xScale(d.priceDiff); })
    .attr("height", yScale.bandwidth())
    .attr("fill", "steelblue");

  bars.exit()
    .remove();

  let labels = chartGroup.selectAll("text")
    .data(topCommodities);

  labels.enter()
    .append("text")
    .merge(labels)
    .transition()
    .duration(800) // duration of the transition in milliseconds
    .text(function(d) { return `${d.commodity} - ${d.priceDiff}%`; })
    .attr("x", function(d) { return xScale(d.priceDiff) + 5; })
    .attr("y", function(d) { return yScale(d.commodity) + yScale.bandwidth() / 2; })
    .attr("dy", "0.35em")
    .style("font-size", "14px");

  labels.exit()
    .remove();
  });
}

//method to create a graph taking 2 parameters (Id of the div where the graph will be displayed and the data to display)
const createBarChart = (chartId, dataToDislpay) => {

  //console.log(dataToDislpay);
  // initialize chart dimensions
  let svgWidth = 1200;
  let svgHeight = 400;
  let margin = { top: 20, right: 20, bottom: 20, left: 60 };
  let chartWidth = svgWidth - margin.left - margin.right;
  let chartHeight = svgHeight - margin.top - margin.bottom;

  // create x and y scales
  let xScale = d3.scaleLinear()
    .domain([0, 15])
    .range([0, chartWidth]);

  let yScale = d3.scaleBand()
    .domain(dataToDislpay.map(function(d) { return d.country; }))
    .range([0, chartHeight])
    .paddingInner(0.1)
    .paddingOuter(0.2);
    
  // create SVG and chart group
  let svg = d3.select(`#${chartId}`).append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

  let chartGroup = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  // create bars and labels
  let bars = chartGroup.selectAll("rect")
    .data(dataToDislpay);

  //animate the bars
  bars.enter()
    .append("rect")
    .merge(bars)
    .transition()
    .duration(2000) // duration of the transition in milliseconds
    .attr("x", 0)
    .attr("y", function(d) { return yScale(d.country); })
    .attr("width", function(d) { return xScale(d.priceDiff); })
    .attr("height", yScale.bandwidth())
    .attr("fill", "steelblue");

  bars.exit()
    .remove();

  let labels = chartGroup.selectAll("text")
    .data(dataToDislpay);

  labels.enter()
    .append("text")
    .merge(labels)
    .transition()
    .duration(800) // duration of the transition in milliseconds
    .text(function(d) { return `${d.country} - ${d.priceDiff}%`; })
    .attr("x", function(d) { return xScale(d.priceDiff) + 5; })
    .attr("y", function(d) { return yScale(d.country) + yScale.bandwidth() / 2; })
    .attr("dy", "0.35em")
    .style("font-size", "14px");

  labels.exit()
    .remove();
}

addChart(5, "Beef meat", "beef");
addChart(6, "Milk", "wheat");
addChart(6, "Maize", "corn");
addChart(6, "Sugar", "sugar");
addChart(6, "Rice", "rice");
createConclusion();
