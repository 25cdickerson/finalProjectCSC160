// Had to Trim Down data to upload to code sandbox
// Sliced data to make the code run faster, so it doesn't
// Display all data at this point.

import * as d3 from "d3";

var promise = d3.json("data/CovidData.json");

var drawTable = function (cases) {
  var table = d3
    .selectAll("tbody")
    .selectAll("tr")
    .data(cases)
    .enter()
    .append("tr")
    .classed("bodyRows", true);

  table.append("td").text(function (covidCase) {
    return covidCase.County;
  });

  table.append("td").text(function (covidCase) {
    return covidCase.Age;
  });

  table.append("td").text(function (covidCase) {
    return covidCase.Gender;
  });

  table.append("td").text(function (covidCase) {
    return covidCase.Race;
  });

  table.append("td").text(function (covidCase) {
    return covidCase.Hospitalized;
  });

  table.append("td").text(function (covidCase) {
    return covidCase.Death;
  });
};

var clearTable = function () {
  d3.selectAll(".bodyRows").remove();
};

var successFCN = function (covidData) {
  console.log(covidData);
  drawTable(covidData.slice(1, 100));

  d3.select("#county").on("click", function () {
    var filtered = covidData.slice(1, 100).filter(function (covidCase) {
      if (
        covidCase.County.toUpperCase() === document.getElementById("in").value
      ) {
        return true;
      } else {
        return false;
      }
    });
    clearTable();
    drawTable(filtered);
  });

  d3.select("#age").on("click", function () {
    var sorted = covidData.slice(1, 100).sort(function (a, b) {
      var aSliced = a.Age.substring(0, 2);
      var bSliced = b.Age.substring(0, 2);
      if (parseInt(aSliced) < parseInt(bSliced)) {
        return -1;
      } else if (parseInt(aSliced) > parseInt(bSliced)) {
        return 1;
      } else {
        return 0;
      }
    });
    clearTable();
    drawTable(sorted);
  });

  d3.select("#gender").on("click", function () {
    var sorted = covidData.slice(1, 100).sort(function (a, b) {
      if (a.Gender > b.Gender) {
        return 1;
      } else if (b.Gender > a.Gender) {
        return -1;
      } else {
        return 0;
      }
    });
    clearTable();
    drawTable(sorted);
  });

  d3.select("#race").on("click", function () {
    var sorted = covidData.slice(1, 100).sort(function (a, b) {
      if (a.Race > b.Race) {
        return 1;
      } else if (b.Race > a.Race) {
        return -1;
      } else {
        return 0;
      }
    });
    clearTable();
    drawTable(sorted);
  });

  d3.select("#hospitalize").on("click", function () {
    var sorted = covidData.slice(1, 100).sort(function (a, b) {
      if (a.Hospitalized < b.Hospitalized) {
        return 1;
      } else if (b.Hospitalized < a.Hospitalized) {
        return -1;
      } else {
        return 0;
      }
    });
    clearTable();
    drawTable(sorted);
  });

  d3.select("#death").on("click", function () {
    var sorted = covidData.slice(1, 100).sort(function (a, b) {
      if (a.Death < b.Death) {
        return 1;
      } else if (b.Death < a.Death) {
        return -1;
      } else {
        return 0;
      }
    });
    clearTable();
    drawTable(sorted);
  });

  d3.select("#reset").on("click", function () {
    clearTable();
    drawTable(covidData);
  });
};

var failFCN = function (fail) {
  console.log(fail);
};

promise.then(successFCN, failFCN);
