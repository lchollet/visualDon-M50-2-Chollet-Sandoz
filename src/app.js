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
      .domain(topCountries.map(function(d) { return d.country; }))
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
    chartGroup.selectAll("rect")
      .data(topCountries)
      .enter()
      .append("rect")
      .attr("x", 0)
      .attr("y", function(d) { return yScale(d.country); })
      .attr("width", function(d) { return xScale(d.priceDiff); })
      .attr("height", yScale.bandwidth())
      .attr("fill", "steelblue");

    chartGroup.selectAll("text")
      .data(topCountries)
      .enter()
      .append("text")
      .text(function(d) { return `${d.country} - ${d.priceDiff}%`; })
      .attr("x", function(d) { return xScale(d.priceDiff) + 5; })
      .attr("y", function(d) { return yScale(d.country) + yScale.bandwidth() / 2; })
      .attr("dy", "0.35em");

    //ajustement de la taille de la police
    chartGroup.selectAll("text").style("font-size", "14px");

  });
}
addChart(5, "Beef meat", "beef");
addChart(5, "Milk", "wheat");
addChart(5, "Maize", "corn");
addChart(5, "Sugar", "sugar");
addChart(5, "Rice", "rice");