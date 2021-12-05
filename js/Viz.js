// All three vizualizations are on this one page as an interactive
// dashboard

import * as d3 from "d3";

// draw 1st graph
var graphOne = function () {
  var promise = d3.json("data/ageCount.json");

  //This is a helpful function to make creating the translate strings easier
  var makeTranslateString = function (x, y) {
    return "translate(" + x + "," + y + ")";
  };

  var successFCN = function (covidData) {
    console.log(covidData);

    // set the dimensions and margins of the graph
    var margin = { top: 30, right: 30, bottom: 70, left: 60 },
      width = 460 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3
      .select("#my_dataviz")
      .append("svg")
      .classed("svg", true)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // X axis
    var x = d3
      .scaleBand()
      .range([0, width])
      .domain(
        covidData.map(function (d) {
          return d.Age;
        })
      )
      .padding(0.2);
    svg
      .append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

    // Add Y axis
    var y = d3.scaleLinear().domain([0, 35000]).range([height, 0]);
    svg.append("g").call(d3.axisLeft(y));

    // Bars
    svg
      .selectAll("mybar")
      .data(covidData)
      .enter()
      .append("g")
      .classed("bars", true);

    d3.selectAll(".bars")
      .append("rect")
      .attr("x", function (d) {
        return x(d.Age);
      })
      .attr("y", function (d) {
        return y(d.Count);
      })
      .attr("width", x.bandwidth())
      .attr("height", function (d) {
        return height - y(d.Count);
      })
      .attr("fill", "#69b3a2");

    d3.selectAll(".bars")
      .append("text")
      .classed("barText", true)
      .attr("x", function (data) {
        return x(data.Age);
      })
      .attr("width", function (data) {
        return x.bandwidth;
      })
      .attr("y", function (data) {
        return y(data.Count) - 5;
      })
      .attr("height", function (d) {
        return height - y(d.Count);
      })
      .text(function (d) {
        console.log(d.Count);
        return d.Count;
      })
      .style("display", "none");

    d3.selectAll(".bars").on("mouseenter", function () {
      d3.selectAll(".barText").style("display", "block");
    });
    d3.selectAll(".bars").on("mouseleave", function () {
      d3.selectAll(".barText").style("display", "none");
    });

    // Draw Labels
    var centerX = width / 2 + margin.left;
    var centerY = height / 2 + margin.top;

    var xLabel = d3
      .selectAll(".svg")
      .append("g")
      .attr("class", "label")
      .attr(
        "transform",
        makeTranslateString(centerX, height + margin.top + margin.bottom - 5)
      );

    xLabel.append("text").attr("text-anchor", "middle").text("Age Range");

    var yLabel = d3
      .selectAll(".svg")
      .append("g")
      .attr("class", "label")
      .attr("transform", "translate( 5," + centerY + ") rotate(90)");

    yLabel.append("text").attr("text-anchor", "middle").text("Cases");

    var tLabel = d3.selectAll(".svg").append("g").attr("class", "label");
    tLabel
      .append("text")
      .attr("text-anchor", "middle")
      .text("Covid Cases Vs Age")
      .attr("transform", "translate(" + centerX + ", 25)");
  };

  var failFCN = function (error) {
    console.log(error);
  };

  promise.then(successFCN, failFCN);
};

// draw graph 2
var graphTwo = function () {
  var promise1 = d3.json("data/Hospitalization.json");

  //This is a helpful function to make creating the translate strings easier
  var makeTranslateString = function (x, y) {
    return "translate(" + x + "," + y + ")";
  };

  var successFCN1 = function (covidData) {
    console.log(covidData);

    // set the dimensions and margins of the graph
    var margin1 = { top: 30, right: 30, bottom: 70, left: 60 },
      width = 460 - margin1.left - margin1.right,
      height = 400 - margin1.top - margin1.bottom;

    // append the svg object to the body of the page
    var svg1 = d3
      .select("#my_dataviz1")
      .append("svg")
      .classed("svg1", true)
      .attr("width", width + margin1.left + margin1.right)
      .attr("height", height + margin1.top + margin1.bottom)
      .append("g")
      .attr("transform", "translate(" + margin1.left + "," + margin1.top + ")");

    // X axis
    var x1 = d3
      .scaleBand()
      .range([0, width])
      .domain(
        covidData.map(function (d) {
          return d.race;
        })
      )
      .padding(0.2);
    svg1
      .append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x1))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

    // Add Y axis
    var y1 = d3.scaleLinear().domain([0, 8]).range([height, 0]);
    svg1.append("g").call(d3.axisLeft(y1));

    // Bars
    svg1
      .selectAll("mybar")
      .data(covidData)
      .enter()
      .append("g")
      .classed("bars1", true);

    d3.selectAll(".bars1")
      .append("rect")
      .attr("x", function (d) {
        return x1(d.race);
      })
      .attr("y", function (d) {
        return y1(d.percentage);
      })
      .attr("width", x1.bandwidth())
      .attr("height", function (d) {
        return height - y1(d.percentage);
      })
      .attr("fill", "#69b3a2");

    d3.selectAll(".bars1")
      .append("text")
      .classed("barText1", true)
      .attr("x", function (data) {
        return x1(data.race);
      })
      .attr("width", function (data) {
        return x1.bandwidth;
      })
      .attr("y", function (data) {
        return y1(data.percentage) - 5;
      })
      .attr("height", function (d) {
        return height - y1(d.percentage);
      })
      .text(function (d) {
        return d.percentage;
      })
      .style("display", "none");

    d3.selectAll(".bars1").on("mouseenter", function () {
      d3.selectAll(".barText1").style("display", "block");
    });
    d3.selectAll(".bars1").on("mouseleave", function () {
      d3.selectAll(".barText1").style("display", "none");
    });

    // Draw Labels
    var centerX = width / 2 + margin1.left;
    var centerY = height / 2 + margin1.top;

    var xLabel1 = d3
      .selectAll(".svg1")
      .append("g")
      .attr("class", "label")
      .attr(
        "transform",
        makeTranslateString(centerX, height + margin1.top + margin1.bottom - 5)
      );

    xLabel1.append("text").attr("text-anchor", "middle").text("Race");

    var yLabel1 = d3
      .selectAll(".svg1")
      .append("g")
      .attr("class", "label")
      .attr("transform", "translate( 5," + centerY + ") rotate(90)");

    yLabel1.append("text").attr("text-anchor", "middle").text("Percentage");

    var tLabel1 = d3.selectAll(".svg1").append("g").attr("class", "label");
    tLabel1
      .append("text")
      .attr("text-anchor", "middle")
      .text("Percentage vs Race")
      .attr("transform", "translate(" + centerX + ", 25)");
  };

  var failFCN1 = function (error) {
    console.log(error);
  };

  promise1.then(successFCN1, failFCN1);
};

var graphThree = function () {
  var promise2 = d3.json("data/casesCounty.json");

  var successFCN2 = function (data) {
    for (var x in data) {
      d3.select("#" + data[x].County)
        .append("title")
        .text("County: " + data[x].County + " | Cases: " + data[x].Cases);
    }

    for (var i in data) {
      var node = d3.selectAll("#" + data[i].County);
      if (data[i].Cases <= 1000) {
        node.attr("fill", "#289e00");
      } else if (data[i].Cases > 1000 && data[i].Cases <= 2500) {
        node.attr("fill", "#3cf000");
      } else if (data[i].Cases > 2500 && data[i].Cases <= 6500) {
        node.attr("fill", "#EFFF00");
      } else if (data[i].Cases > 6500 && data[i].Cases <= 10000) {
        node.attr("fill", "#FF5E00");
      } else {
        node.attr("fill", "#FF0000");
      }
    }
  };

  var failFCN2 = function (error) {
    console.log(error);
  };

  promise2.then(successFCN2, failFCN2);
};

var edaOne = function () {
  var promise3 = d3.json("data/mask.json");

  var successFCN3 = function (data) {
    // set the dimensions and margins of the graph
    var width = 450;
    var height = 450;
    var margin = 40;

    // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
    var radius = Math.min(width, height) / 2 - margin;

    // append the svg object to the div called 'my_EDA'
    var svg = d3
      .select("#my_EDA")
      .append("svg")
      .classed("eda", true)
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    // set the color scale
    var color = d3.scaleOrdinal().domain(data).range(["red", "blue"]);

    // Compute the position of each group on the pie:
    var pie = d3.pie().value(function (d) {
      return d.percentage;
    });

    // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
    svg
      .selectAll("whatever")
      .data(pie(data))
      .enter()
      .append("path")
      .attr("d", d3.arc().innerRadius(0).outerRadius(radius))
      .attr("fill", function (d) {
        return color(d.data);
      })
      .attr("stroke", "black")
      .style("stroke-width", "2px")
      .style("opacity", 0.7)
      .append("title")
      .text(function (d) {
        return d.data.percentage;
      });

    // Labels
    // Now add the annotation. Use the centroid method to get the best coordinates
    svg
      .selectAll("mySlices")
      .data(pie(data))
      .enter()
      .append("text")
      .text(function (d) {
        return d.data.id;
      })
      .attr("transform", function (d) {
        return (
          "translate(" +
          d3.arc().innerRadius(0).outerRadius(radius).centroid(d) +
          ")"
        );
      })
      .style("text-anchor", "middle")
      .style("font-size", 17);

    // Draw Title
    var centerX2 = width / 2;

    var tLabel2 = d3.selectAll(".eda").append("g").attr("class", "label");
    tLabel2
      .append("text")
      .attr("text-anchor", "middle")
      .text("Percentage of Stores Requiring Masks")
      .attr("transform", "translate(" + centerX2 + ", 25)");
  };
  var failFCN3 = function (error) {
    console.log(error);
  };

  promise3.then(successFCN3, failFCN3);
};

var edaTwo = function () {
  var promise4 = d3.json("data/access.json");

  var successFCN4 = function (data) {
    // set the dimensions and margins of the graph
    var margin4 = { top: 30, right: 30, bottom: 70, left: 60 },
      width4 = 460 - margin4.left - margin4.right,
      height4 = 400 - margin4.top - margin4.bottom;

    // append the svg object to the body of the page
    var svg4 = d3
      .select("#my_EDA1")
      .append("svg")
      .classed("svg4", true)
      .attr("width", width4 + margin4.left + margin4.right)
      .attr("height", height4 + margin4.top + margin4.bottom)
      .append("g")
      .attr("transform", "translate(" + margin4.left + "," + margin4.top + ")");

    // X axis
    var x4 = d3
      .scaleBand()
      .range([0, width4])
      .domain(
        data.map(function (d) {
          return d.race;
        })
      )
      .padding(0.2);
    svg4
      .append("g")
      .attr("transform", "translate(0," + height4 + ")")
      .call(d3.axisBottom(x4))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

    // Add Y axis
    var y4 = d3.scaleLinear().domain([0, 100]).range([height4, 0]);
    svg4.append("g").call(d3.axisLeft(y4));

    // Bars
    svg4
      .selectAll("mybar")
      .data(data)
      .enter()
      .append("rect")
      .classed("A", true)
      .attr("x", function (d) {
        return x4(d.race);
      })
      .attr("y", function (d) {
        return y4(d.access);
      })
      .attr("width", x4.bandwidth())
      .attr("height", function (d) {
        return height4 - y4(d.access);
      })
      .attr("fill", "#69b3a2")
      .append("title")
      .text(function (d) {
        return d.access;
      });

    svg4
      .selectAll("mybar")
      .data(data)
      .enter()
      .append("rect")
      .classed("N", true)
      .attr("x", function (d) {
        return x4(d.race);
      })
      .attr("y", function (d) {
        return y4(d.noAccess);
      })
      .attr("width", x4.bandwidth())
      .attr("height", function (d) {
        return height4 - y4(d.noAccess);
      })
      .attr("fill", "red")
      .append("title")
      .text(function (d) {
        return d.noAccess;
      });

    // Draw Labels
    var makeTranslateString4 = function (x, y) {
      return "translate(" + x + "," + y + ")";
    };

    var centerX4 = width4 / 2 + margin4.left;
    var centerY4 = height4 / 2 + margin4.top;

    var xLabel1 = d3
      .selectAll(".svg4")
      .append("g")
      .attr("class", "label")
      .attr(
        "transform",
        makeTranslateString4(
          centerX4,
          height4 + margin4.top + margin4.bottom - 5
        )
      );

    xLabel1.append("text").attr("text-anchor", "middle").text("Race");

    var yLabel1 = d3
      .selectAll(".svg4")
      .append("g")
      .attr("class", "label")
      .attr("transform", "translate( 5," + centerY4 + ") rotate(90)");

    yLabel1.append("text").attr("text-anchor", "middle").text("Percentage");

    var tLabel4 = d3.selectAll(".svg4").append("g").attr("class", "label");
    tLabel4
      .append("text")
      .attr("text-anchor", "middle")
      .text("Percent Access to Primary Healthcare by Race")
      .attr("transform", "translate(" + centerX4 + ", 25)");

    // Legend
    d3.select(".svg4")
      .append("circle")
      .attr("cx", width4 - 20)
      .attr("cy", height4 - 260)
      .attr("r", 6)
      .style("fill", "#69b3a2");
    d3.select(".svg4")
      .append("circle")
      .attr("cx", width4 - 20)
      .attr("cy", height4 - 245)
      .attr("r", 6)
      .style("fill", "red");
    d3.select(".svg4")
      .append("text")
      .attr("x", width4 - 10)
      .attr("y", height4 - 260)
      .text("Access")
      .style("font-size", "15px")
      .attr("alignment-baseline", "middle");
    d3.select(".svg4")
      .append("text")
      .attr("x", width4 - 10)
      .attr("y", height4 - 245)
      .text("No Access")
      .style("font-size", "15px")
      .attr("alignment-baseline", "middle");
  };

  var failFCN4 = function (error) {
    console.log(error);
  };

  promise4.then(successFCN4, failFCN4);
};

var edaThree = function () {
  var promise5 = d3.json("data/countyDensity.json");

  var successFCN5 = function (data) {
    for (var x in data) {
      d3.select("#" + data[x].CTYNAME + "1")
        .append("title")
        .text(
          "County: " + data[x].CTYNAME + " | population: " + data[x].pop2021
        );
    }

    for (var i in data) {
      var node = d3.selectAll("#" + data[i].CTYNAME + "1");
      if (data[i].pop2021 <= 50000) {
        node.attr("fill", "#289e00");
      } else if (data[i].pop2021 > 50000 && data[i].pop2021 <= 100000) {
        node.attr("fill", "#3cf000");
      } else if (data[i].pop2021 > 100000 && data[i].pop2021 <= 200000) {
        node.attr("fill", "#EFFF00");
      } else if (data[i].pop2021 > 200000 && data[i].pop2021 <= 300000) {
        node.attr("fill", "#FF5E00");
      } else {
        node.attr("fill", "#FF0000");
      }
    }
  };

  var failFCN5 = function (error) {
    console.log(error);
  };

  promise5.then(successFCN5, failFCN5);
};

graphOne();
graphTwo();
graphThree();
edaOne();
edaTwo();
edaThree();
