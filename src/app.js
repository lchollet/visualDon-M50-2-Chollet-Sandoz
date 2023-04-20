
d3.csv("../Datas/dom_clean_data.csv").then(function(data) {

  //filter data to only include beef meat and dates between 2019-01-01 and 2020-07-01
  let filteredData = data.filter(function(d) {
    return (d.commodity === "Beef meat") && (d.month >= "1/1/2019") && (d.month <= "7/1/2020");
  });
  console.log(filteredData);

  //group data by country and create a new array
  let groupedData = d3.group(filteredData, function(d) { return d.country; });
  console.log(groupedData);


  //create an array of objects with country and price difference
  let priceDiffByCountry = [];
  groupedData.forEach(function(data, country) {
    let prices = data.map(function(d) { return d.price; });
    let priceDiff = prices[prices.length-1] - prices[0];
    priceDiffByCountry.push({ country: country, priceDiff: priceDiff });
  });
  console.log(priceDiffByCountry);

  //trier les 5 pays avec la plus grande différence de prix
  let topFiveCountries = priceDiffByCountry.sort(function(a,b) {
    return d3.descending(a.priceDiff, b.priceDiff);
  }).slice(0, 5);


  //affichage du resultat final
  console.log(topFiveCountries);

  //affichage dans le html
  let list = document.createElement("ul");

  topFiveCountries.forEach(function(country) {
    let item = document.createElement("li");
    item.innerText = `${country.country} - ${country.priceDiff}`;
    list.appendChild(item);
  });

  let beefDiv = document.getElementById("beef");
  beefDiv.appendChild(list);

  });
