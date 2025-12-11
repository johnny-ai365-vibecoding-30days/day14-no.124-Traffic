var colorDead,
  colorAcci,
  colorDeadScale,
  colorAcciScale,
  lngDim,
  latDim,
  weekDayTable,
  gPrints,
  monthDim,
  weekdayDim,
  hourDim,
  map,
  barAcciHour,
  initMap,
  ifdead,
  setCircle,
  initCircle,
  tranCircle,
  updateGraph;
colorDead = "#de2d26";
colorAcci = "rgb(255, 204, 0)";
colorDeadScale = d3.scale.ordinal().range([colorDead]);
colorAcciScale = d3.scale.ordinal().range([colorAcci]);
lngDim = null;
latDim = null;
weekDayTable = ["週日", "週一", "週二", "週三", "週四", "週五", "週六"];
gPrints = null;
monthDim = null;
weekdayDim = null;
hourDim = null;
map = null;
barAcciHour = null;
initMap = function () {
  map = L.map("map", {
    center: [25.037583, 121.5637],
    zoom: 12,
    zoomControl: true,
  });
  L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
    maxZoom: 19,
    attribution:
      "&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors &copy; <a href=\"https://carto.com/attributions\">CARTO</a>",
    subdomains: "abcd",
  }).addTo(map);
  L.svg().addTo(map);
  gPrints = d3
    .select(map.getPanes().overlayPane)
    .select("svg")
    .append("g")
    .attr("class", "leaflet-zoom-hide");
  map.on("moveend", function () {
    var bounds, northEast, southWest;
    bounds = map.getBounds();
    northEast = bounds.getNorthEast();
    southWest = bounds.getSouthWest();
    lngDim.filterRange([southWest.lng, northEast.lng]);
    latDim.filterRange([southWest.lat, northEast.lat]);
    updateGraph();
    return dc.redrawAll();
  });
};
ifdead = function (it, iftrue, iffalse) {
  if (it.dead > 0) {
    return iftrue;
  } else {
    return iffalse;
  }
};
setCircle = function (it) {
  return it
    .attr({
      cx: function (it) {
        return map.latLngToLayerPoint([it.GoogleLat, it.GoogleLng]).x;
      },
      cy: function (it) {
        return map.latLngToLayerPoint([it.GoogleLat, it.GoogleLng]).y;
      },
      r: function (it) {
        return ifdead(it, "5px", "2.5px");
      },
    })
    .style({
      fill: function (it) {
        return ifdead(it, colorDead, colorAcci);
      },
      position: "absolute",
      opacity: function (it) {
        return ifdead(it, 1, 0.3);
      },
    });
};
initCircle = function (it) {
  return it.style({
    opacity: 0,
  });
};
tranCircle = function (it) {
  return it.style({
    opacity: function (it) {
      return ifdead(it, 1, 0.3);
    },
  });
};
updateGraph = function () {
  var dt;
  dt = gPrints.selectAll("circle").data(monthDim.top(Infinity));
  dt.enter().append("circle").call(setCircle);
  dt.call(setCircle);
  return dt.exit().remove();
};
d3.tsv("./accidentXY_light.tsv", function (err, tsvBody) {
  var deadData,
    barPerMonth,
    barPerWeekDay,
    barPerHour,
    barAcciMonth,
    barAcciWeekDay,
    ndx,
    all,
    acciMonth,
    acciWeekDay,
    acciHour,
    deathMonth,
    deathWeekDay,
    deathHour,
    barMt,
    barWk,
    barHr,
    marginMt,
    marginWk,
    marginHr,
    navls,
    navidx,
    nav;
  deadData = [];
  tsvBody.filter(function (d) {
    d.GoogleLng = +d.GoogleLng;
    d.GoogleLat = +d.GoogleLat;
    d.date = new Date(d["年"], d["月"], d["日"], d["時"], d["分"]);
    d.week = weekDayTable[d.date.getDay()];
    d.dead = +d["2-30"] + +d["死"];
    if (d.dead > 0) {
      deadData.push(d);
    }
    return true;
  });
  barPerMonth = dc.barChart("#DeathMonth");
  barPerWeekDay = dc.barChart("#DeathWeekDay");
  barPerHour = dc.barChart("#DeathHour");
  barAcciMonth = dc.barChart("#AcciMonth");
  barAcciWeekDay = dc.barChart("#AcciWeekDay");
  barAcciHour = dc.barChart("#AcciHour");
  ndx = crossfilter(tsvBody);
  all = ndx.groupAll();
  monthDim = ndx.dimension(function (it) {
    return it["月"];
  });
  weekdayDim = ndx.dimension(function (it) {
    return it.week;
  });
  hourDim = ndx.dimension(function (it) {
    return it["時"];
  });
  lngDim = ndx.dimension(function (it) {
    return it.GoogleLng;
  });
  latDim = ndx.dimension(function (it) {
    return it.GoogleLat;
  });
  initMap();
  acciMonth = monthDim.group().reduceCount();
  acciWeekDay = weekdayDim.group().reduceCount();
  acciHour = hourDim.group().reduceCount();
  deathMonth = monthDim.group().reduceSum(function (it) {
    return it.dead;
  });
  deathWeekDay = weekdayDim.group().reduceSum(function (it) {
    return it.dead;
  });
  deathHour = hourDim.group().reduceSum(function (it) {
    return it.dead;
  });
  barMt = 350;
  barWk = 270;
  barHr = 550;
  marginMt = {
    top: 10,
    right: 10,
    left: 30,
    bottom: 20,
  };
  marginWk = marginMt;
  marginHr = marginMt;
  barPerMonth
    .width(barMt)
    .height(100)
    .margins(marginMt)
    .dimension(monthDim)
    .group(deathMonth)
    .x(d3.scale.ordinal().domain(d3.range(1, 13)))
    .xUnits(dc.units.ordinal)
    .elasticY(true)
    .colors(colorDeadScale)
    .on("filtered", function (c, f) {
      return updateGraph();
    })
    .yAxis()
    .ticks(3);
  barPerWeekDay
    .width(barWk)
    .height(100)
    .margins(marginWk)
    .dimension(weekdayDim)
    .group(deathWeekDay)
    .x(d3.scale.ordinal().domain(weekDayTable))
    .xUnits(dc.units.ordinal)
    .gap(4)
    .elasticY(true)
    .colors(colorDeadScale)
    .on("filtered", function (c, f) {
      return updateGraph();
    })
    .yAxis()
    .ticks(3);
  barPerHour
    .width(barHr)
    .height(100)
    .margins(marginHr)
    .dimension(hourDim)
    .group(deathHour)
    .x(d3.scale.linear().domain([0, 24]))
    .elasticY(true)
    .colors(colorDeadScale)
    .on("filtered", function (c, f) {
      return updateGraph();
    })
    .yAxis()
    .ticks(3);
  barAcciMonth
    .width(barMt)
    .height(100)
    .margins(marginMt)
    .dimension(monthDim)
    .group(acciMonth)
    .x(d3.scale.ordinal().domain(d3.range(1, 13)))
    .xUnits(dc.units.ordinal)
    .elasticY(true)
    .colors(colorAcciScale)
    .on("filtered", function (c, f) {
      return updateGraph();
    })
    .yAxis()
    .ticks(4);
  barAcciWeekDay
    .width(barWk)
    .height(100)
    .margins(marginWk)
    .dimension(weekdayDim)
    .group(acciWeekDay)
    .x(d3.scale.ordinal().domain(weekDayTable))
    .xUnits(dc.units.ordinal)
    .elasticY(true)
    .gap(4)
    .colors(colorAcciScale)
    .on("filtered", function (c, f) {
      return updateGraph();
    })
    .yAxis()
    .ticks(4);
  barAcciHour
    .width(barHr)
    .height(100)
    .margins(marginHr)
    .dimension(hourDim)
    .group(acciHour)
    .x(d3.scale.linear().domain([0, 24]))
    .elasticY(true)
    .colors(colorAcciScale)
    .on("filtered", function (c, f) {
      return updateGraph();
    })
    .yAxis()
    .ticks(4);
  dc.renderAll();
  updateGraph();
  navls = [
    {
      ttl: "事故交叉篩選",
      txt: "這裡呈現 2024 年臺北市 A1 及 A2 類交通事故明細，共 51,810 件事故、223 起死亡。黃色代表事故，紅色代表發生死亡的事故。</br></br>（點擊此區開始導覽。）",
      act: function () {},
    },
    {
      ttl: "2024 年每月趨勢",
      txt: "黃色是事故數量，紅色是死亡。可以看到，每個月的車禍數量差不多，但 4 月的車禍死亡最少。（點擊前往「星期別」）",
      act: function () {
        return d3.selectAll(".fltWeek, .fltHour").transition().style({
          opacity: 0.2,
        });
      },
    },
    {
      ttl: "星期別",
      txt: "各星期的事故數相當平均，其中星期二、星期三的死亡最少。（點擊前往「時段」）",
      act: function () {
        d3.selectAll(".fltMonth, .fltHour").transition().style({
          opacity: 0.2,
        });
        return d3.selectAll(".fltWeek").transition().style({
          opacity: 1,
        });
      },
    },
    {
      ttl: "時段",
      txt: "一天當中，0–7 點的車禍數量很少。但以凌晨兩點為例，車禍數量很少，但死亡比例很高。</br></br>想知道這些事故在哪裡嗎？（點擊看看）",
      act: function () {
        d3.selectAll(".fltMonth, .fltWeek").transition().style({
          opacity: 0.2,
        });
        return d3.selectAll(".fltHour").transition().style({
          opacity: 1,
        });
      },
    },
    {
      ttl: "點一下就分析",
      txt: "將滑鼠拖曳選取 0–7 點，地圖會高亮對應的事故（約 1 秒內回應），週與月的圖表也會同步更新。（點擊前往「交叉篩選」）",
      act: function () {
        d3.selectAll(".filter").transition().style({
          opacity: 1,
        });
        return hourDim.filter([0, 8]);
      },
    },
    {
      ttl: "交叉篩選",
      txt: "也能套用多重條件，例如篩選 0–7 點且假日的事故：先拖曳時間區間，再點選週六、週日。（點擊前往「地理交叉篩選」）",
      act: function () {
        return weekdayDim.filter(["週六", "週日"]);
      },
    },
    {
      ttl: "地理交叉篩選",
      txt: "反過來也行，放大地圖任何區域，圖表會跟著更新。現在顯示的是台北車站周邊。（點擊切換另一個地理篩選）",
      act: function () {
        map.setView({ lat: 25.047675, lng: 121.517055 }, 14);
        return setTimeout(function () {
          return map.setZoom(15);
        }, 150);
      },
    },
    {
      ttl: "地理交叉篩選",
      txt: "我們也可以移到台大附近。</br></br>程式化產生的視覺化有個好處：開發一次後，只要換資料就能快速得到最新圖表。</br></br>開始自己探索吧！用左側縮放滑桿或方向箭頭，也能直接拖曳地圖在城市中移動。",
      act: function () {
        return map.setView({
          lat: 25.01734,
          lng: 121.5395,
        }, 15);
      },
    },
  ];
  navidx = 0;
  (nav = function () {
    var ctn, l;
    ctn = navls[navidx];
    l = navls.length - 1;
    if (navidx > l) {
      return d3.selectAll(".ctn-nav").transition().style({
        opacity: 0,
      });
    } else {
      d3.selectAll(".navttl").text(ctn.ttl);
      d3.selectAll(".navidx").text(navidx + "/" + l);
      d3.selectAll(".navtxt").html(ctn.txt);
      return ctn.act();
    }
  })();
  return d3.selectAll(".ctn-nav").on("mousedown", function () {
    ++navidx;
    return nav();
  });
});
