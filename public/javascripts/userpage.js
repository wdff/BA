$(document).ready(function() {

  var totalStats = statData.shift();  //seperate total stats from stats-by-level

  var tickValues = {
    7: [0, 1, 2, 3, 4, 5, 6, 7],
    30: [0, 5, 10, 15, 20, 25, 30],
    90: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90]
  };

  $('span#totalAmount').text(totalStats.amountTaken);
  $('span#totalCorrect').text(totalStats.amountCorrect);
  $('span#correctPercent')
    .text('(' + Math.floor(
      (totalStats.amountCorrect / totalStats.amountTaken) * 100)
    + ')%');
  $('span#avgTime').text(totalStats.avgTimeTaken + 's');



  // always begin with every chart as 7-days
  initGraphs(7);



  $('.timeSpanBtn').on("click", function(e) {

    var amountToSwitch = parseInt($(e.target).closest('.timeSpanBtn').children('.number').text());

    // after button click, redraw the charts with the new amount of days
    initGraphs(amountToSwitch);
  });







  function initGraphs(amountOfDays) {

    d3.selectAll('.graphDiv').remove();  //first remove the old charts

    for (var i = 0; i < statData.length; i++) {  // statData[0] == level 1
      draw(i, amountOfDays);
    }
  }


  function fillDays(level, amount, tempStats) {
    for (var i = tempStats[level].daysAgo.length; i <= amount; i++) {
      tempStats[level].daysAgo[i] = {
        amountTaken   : 0,
        amountCorrect : 0,
        totalTimeTaken: 0,
        avgTimeTaken  : 0
      }
    }
    return tempStats;
  }

  function sliceStats(level, amount) {

    var tempStats = statData;

    if (tempStats[level].daysAgo.length < amount) {
      //console.log('length < amount, filling');
      tempStats = fillDays(level, amount, tempStats);
    }

    if (tempStats[level].daysAgo.length > amount) {
      //console.log('length > amount, slicing');

      tempStats = tempStats[level].daysAgo.slice(0, (amount + 1));
    }

    return tempStats;
  }


  function draw(level, span) {

      var slicedStats = sliceStats(level, span);

      $('#statsByLevel').append('<div id="level'
        + (level+1)
        + 'stats" class="graphDiv"><h1><span data-i18n="markup.level"></span> '
        + (level+1)
        + '</h1></div>');

      makeDiagram(level, slicedStats, ++span);
    }




  function makeDiagram(level, data, amountOfDays) {


    var MARGIN = {top: 20, right: 50, bottom: 30, left: 20};
    var HEIGHT = 300 - MARGIN.top - MARGIN.bottom;
    var WIDTH = 800 - MARGIN.left - MARGIN.right;
    var X_DOMAIN = 90;
    var Y_DOMAIN = 100;
    var BAR_WIDTH = WIDTH/amountOfDays * 0.95;


    var x = d3.scale.ordinal()
      .domain(d3.range(amountOfDays))
      .rangePoints([WIDTH, 0],1);
    var y = d3.scale.linear().range([HEIGHT, 0]);
    //x.domain(d3.range(X_DOMAIN));
    y.domain([0, Y_DOMAIN]);

    //console.dir(tickValues);

    var xAxis = d3.svg.axis().scale(x).orient("bottom").tickValues(tickValues[amountOfDays-1]);
    var yAxis = d3.svg.axis().scale(y).orient("right").ticks(5);
    var xGrid = d3.svg.axis().scale(y).orient("right").ticks(5).tickSize(-WIDTH,0,0).tickFormat("");

    var tip = d3.tip()
      .attr("class", "tip")
      .offset([-10,50])
      .html(function(d) {
        return "<span>" + d.amountCorrect + "/"
          + d.amountTaken
          + " ("
          + Math.floor((d.amountCorrect/d.amountTaken) * 100)
          + "%)</span>"
          + "<span data-i18n='markup.correct'></span>"

      });


    var canvas = d3.select("#level" + (level+1) + "stats").
      append("svg")
      .attr("width", WIDTH + MARGIN.left + MARGIN.right)
      .attr("height", HEIGHT + MARGIN.top + MARGIN.bottom)
      .attr("class", function (d, i) {
        return "chart";
      })
      .append("g")
      .attr("transform", "translate(" + MARGIN.left + "," + MARGIN.top + ")");



    var bars = canvas.selectAll("rect")
      .data(data)
      .enter()
        .append("a")
        .attr("xlink:href", function(d,i) {
          return "/" + (level + 1) + "/" + i + "/"
        })
        .append("rect")
        .attr("class", "bar")
        .attr("width", BAR_WIDTH)
        .attr("height", function (d, i) {
        if (d.amountTaken === 0) {
          return 0;
        }
        return HEIGHT - y((d.amountCorrect/ d.amountTaken)*100);


        })
        .attr("x", function (d, i) {
        return x(i)-BAR_WIDTH/2;
        })
        .attr("y", function (d) {
          if (d.amountTaken === 0) {
            return 0;
          }
        return y((d.amountCorrect/d.amountTaken) * 100);
        })
        .on('mouseover', tip.show)
        .on('mouseout', tip.hide)

      ;


    canvas.append("g").attr("transform", "translate(0," + HEIGHT + ")").call(xAxis);
    canvas.append("g").attr("transform", "translate(" + WIDTH + ",0)").call(yAxis);
    canvas.append("g")
      .attr("class", "grid")
      .attr("transform", "translate(" + WIDTH + ",0)")
      .call(xGrid);
    canvas.call(tip);

    $('h1, span').i18n();  //apply translation to the newly inserted h1s



  };












/*  canvas.append("rect")
    .attr("x", 100)
    .attr("y", 100)
    .attr("height", 100)
    .attr("width", 200);*/


/*  console.log(JSON.stringify(stats[0]));
  console.log(JSON.stringify(stats[1]));
  console.log(JSON.stringify(stats[2]));
  console.log(JSON.stringify(stats[3]));
  console.log(typeof stats);*/
});