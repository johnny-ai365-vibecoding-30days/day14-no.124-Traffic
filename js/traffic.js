var colorDead,
  colorAcci,
  colorDrunk,
  colorDeadScale,
  colorAcciScale,
  colorDrunkScale,
  genderMap,
  injurySeverityMap,
  injuryPositionMap,
  protectiveGearMap,
  phoneUseMap,
  actionStatusMap,
  licenseStatusMap,
  driverLicenseTypeMap,
  drinkingMap,
  impactPointMap,
  hitAndRunMap,
  occupationMap,
  lngDim,
  latDim,
  weekDayTable,
  gPrints,
  monthDim,
  weekdayDim,
  hourDim,
  map,
  barAcciHour,
  highlightDrunk,
  initMap,
  ifdead,
  setCircle,
  initCircle,
  tranCircle,
  updateGraph,
  dataTable,
  dataTableDim,
  formatDateTime,
  decodeCode,
  weatherMap,
  lightMap,
  roadCategoryMap,
  roadTypeMap,
  accidentLocationMap,
  roadSurfacePaveMap,
  roadSurfaceStateMap,
  roadSurfaceDefectMap,
  roadObstacleMap,
  sightDistanceMap,
  signalTypeMap,
  signalActionMap,
  dividerFacilityMap,
  laneDivideMainMap,
  laneDivideSideMap,
  edgeLineMap,
  accidentTypeMap,
  causeCodeMap;
colorDead = "#de2d26";
colorAcci = "rgb(255, 204, 0)";
colorDrunk = "royalblue";
colorDeadScale = d3.scale.ordinal().range([colorDead]);
colorAcciScale = d3.scale.ordinal().range([colorAcci]);
colorDrunkScale = d3.scale.ordinal().range([colorDrunk]);
lngDim = null;
latDim = null;
weekDayTable = ["週日", "週一", "週二", "週三", "週四", "週五", "週六"];
gPrints = null;
monthDim = null;
weekdayDim = null;
hourDim = null;
map = null;
barAcciHour = null;
highlightDrunk = false;
weatherMap = {
  1: "暴雨",
  2: "強風",
  3: "風沙",
  4: "霧或煙",
  5: "雪",
  6: "雨",
  7: "陰",
  8: "晴",
};
lightMap = {
  1: "日間自然光線",
  2: "晨或暮光",
  3: "夜間有照明",
  4: "夜間無照明",
  5: "其他光線",
  6: "無照明設備",
  7: "光線不明",
};
roadCategoryMap = {
  1: "國道",
  2: "省道",
  3: "縣道",
  4: "鄉道",
  5: "市區道路",
  6: "村里道路",
  7: "專用道路",
  8: "其他",
};
roadTypeMap = {
  1: "有遮斷器",
  2: "無遮斷器",
  3: "三岔路",
  4: "四岔路",
  5: "多岔路",
  6: "隧道",
  7: "地下道",
  8: "橋樑",
  9: "涵洞",
  10: "高架道路",
  11: "彎曲路及附近",
  12: "坡路",
  13: "巷弄",
  14: "直路",
  15: "其他",
  16: "圓環",
  17: "廣場",
  18: "行人穿越設施",
  19: "高架交流道",
  20: "匝道",
  21: "汽機車分隔道",
  22: "其他單一路段",
};
accidentLocationMap = {
  1: "交岔路口內",
  2: "交岔口附近",
  3: "機車待轉區",
  4: "機車停等區",
  5: "交通島（含槽化線）",
  6: "迴轉道",
  7: "快車道",
  8: "慢車道",
  9: "一般車道",
  10: "公車專用道",
  11: "機車專用道",
  12: "機車優先道",
  13: "路肩、路緣",
  14: "加速車道",
  15: "減速車道",
  16: "直線匝道",
  17: "環道匝道",
  18: "行人穿越道",
  19: "穿越道附近",
  20: "人行道",
  21: "收費站附近",
  22: "其他",
};
roadSurfacePaveMap = {
  1: "柏油",
  2: "水泥",
  3: "碎石",
  4: "其他鋪裝",
  5: "無鋪裝",
};
roadSurfaceStateMap = {
  1: "冰雪",
  2: "油滑",
  3: "泥濘",
  4: "濕潤",
  5: "乾燥",
};
roadSurfaceDefectMap = {
  1: "路面鬆軟",
  2: "路面高低不平",
  3: "有坑洞",
  4: "無缺陷",
};
roadObstacleMap = {
  1: "道路施工中",
  2: "有堆積物",
  3: "路上有停車",
  4: "其他障礙物",
  5: "無障礙物",
};
sightDistanceMap = {
  1: "彎道視距不良",
  2: "坡道視距不良",
  3: "建築物視距不良",
  4: "樹木或農作物遮蔽",
  5: "路上停車遮蔽",
  6: "其他視距不良",
  7: "視距良好",
};
signalTypeMap = {
  1: "行車管制號誌",
  2: "含行人專用號誌",
  3: "閃光號誌",
  4: "無號誌",
};
signalActionMap = {
  1: "號誌正常",
  2: "號誌不正常",
  3: "號誌無動作",
  4: "無號誌",
};
dividerFacilityMap = {
  1: "寬式中央分向島",
  2: "窄式分向島（附柵欄）",
  3: "窄式分向島（無柵欄）",
  4: "雙向禁止超車線（附標記）",
  5: "雙向禁止超車線（無標記）",
  6: "單向禁止超車線（附標記）",
  7: "單向禁止超車線（無標記）",
  8: "行車分向線（附標記）",
  9: "行車分向線（無標記）",
  10: "無分向設施",
};
laneDivideMainMap = {
  1: "禁止變換車道線（附標記）",
  2: "禁止變換車道線（無標記）",
  3: "一般車道線（附標記）",
  4: "一般車道線（無標記）",
  5: "未繪車道線",
};
laneDivideSideMap = {
  1: "寬式快慢車道分隔島",
  2: "窄式分隔島（附柵欄）",
  3: "窄式分隔島（無柵欄）",
  4: "快慢車道分隔線",
  5: "未繪快慢車道分隔線",
};
edgeLineMap = {
  1: "有路面邊線",
  2: "無路面邊線",
};
accidentTypeMap = {
  1: "對向通行中",
  2: "同向通行中",
  3: "穿越道路中",
  4: "在路上嬉戲",
  5: "在路上作業中",
  6: "衝進路中",
  7: "從停車後（或中）穿出",
  8: "佇立路邊（外）",
  9: "其他（人與車）",
  10: "對撞",
  11: "對向擦撞",
  12: "同向擦撞",
  13: "追撞",
  14: "倒車撞",
  15: "路口交岔撞",
  16: "側撞",
  17: "其他（車與車）",
  18: "路上翻車、摔倒",
  19: "衝出路外",
  20: "撞護欄（樁）",
  21: "撞號誌、標誌桿",
  22: "撞收費亭",
  23: "撞交通島",
  24: "撞非固定設施",
  25: "撞橋樑、建築物",
  26: "撞路樹、電桿",
  27: "撞動物",
  28: "撞工程施工",
  29: "其他（車本身）",
  30: "衝過遮斷器",
  31: "正越過平交道中",
  32: "暫停位置不當",
  33: "在平交道內無法行動",
  34: "其他（平交道）",
};
genderMap = {
  1: "男",
  2: "女",
  3: "無或物",
  4: "肇逃未查獲",
};
injurySeverityMap = {
  1: "24小時內死亡",
  2: "受傷",
  3: "未受傷",
  4: "不明",
  5: "2–30日內死亡",
};
injuryPositionMap = {
  1: "頭部",
  2: "頸部",
  3: "胸部",
  4: "腹部",
  5: "腰部",
  6: "背脊部",
  7: "手（腕）部",
  8: "腿（腳）部",
  9: "多數傷",
  10: "無",
  11: "不明",
};
protectiveGearMap = {
  1: "已使用安全帽/安全帶",
  2: "未使用安全帽/安全帶",
  3: "不明",
  4: "其他（行人/乘客）",
  5: "安全帽佩戴不正確",
  6: "安全帶佩戴不正確",
  7: "未使用幼童安全椅",
};
phoneUseMap = {
  1: "未使用",
  2: "手持使用",
  3: "免持使用",
  4: "不明",
  5: "非汽/機車駕駛",
};
actionStatusMap = {
  1: "起步",
  2: "倒車",
  3: "停車操作中",
  4: "超車",
  5: "左轉彎",
  6: "右轉彎",
  7: "向左變換車道",
  8: "向右變換車道",
  9: "向前直行",
  10: "插入行列",
  11: "迴轉/橫越道路",
  12: "急減速或急停止",
  13: "靜止（熄火）",
  14: "停等（未熄火）",
  15: "其他車輛狀態",
  16: "步行",
  17: "靜立",
  18: "奔跑",
  19: "上下車",
  20: "其他行人狀態",
  21: "不明",
};
licenseStatusMap = {
  1: "有適當駕照",
  2: "未達齡無照",
  3: "已達齡無照",
  4: "越級駕駛",
  5: "駕照被吊扣",
  6: "駕照被吊/註銷",
  7: "不明",
  8: "非汽/機車駕駛",
};
driverLicenseTypeMap = {
  1: "職業聯結車",
  2: "職業大客車",
  3: "職業大貨車",
  4: "職業小型車",
  5: "普通聯結車",
  6: "普通大客車",
  7: "普通大貨車",
  8: "普通小型車",
  9: "大型重型機車",
  10: "普通重型機車",
  11: "輕型機車",
  12: "軍用大客車",
  13: "軍用載重車",
  14: "軍用小型車",
  15: "國際/外國駕照",
  16: "其他駕照",
  17: "學習駕駛證",
  18: "無駕駛執照",
  19: "不明",
  20: "非汽/機車駕駛",
};
drinkingMap = {
  1: "觀察未飲酒",
  2: "檢測無酒精",
  3: "酒測值低於0.15mg/L",
  4: "0.16–0.25mg/L",
  5: "0.26–0.40mg/L",
  6: "0.41–0.55mg/L",
  7: "0.56–0.80mg/L",
  8: "大於0.80mg/L",
  9: "無法檢測",
  10: "非駕駛未檢測",
  11: "飲酒情形不明",
};
impactPointMap = {
  1: "汽車前車頭",
  2: "汽車右側",
  3: "汽車後車尾",
  4: "汽車左側",
  5: "汽車右前",
  6: "汽車右後",
  7: "汽車左後",
  8: "汽車左前",
  9: "車頂",
  10: "車底",
  11: "機車前車頭",
  12: "機車右側",
  13: "機車後車尾",
  14: "機車左側",
  15: "撞擊部位不明",
  16: "非汽/機車",
};
hitAndRunMap = {
  1: "否",
  2: "是",
};
occupationMap = {
  1: "民代/主管/經理",
  2: "專業人員",
  3: "技術員/助理",
  4: "事務工作者",
  5: "服務工作者",
  6: "售貨員",
  7: "農林漁牧",
  8: "保安工作者",
  9: "技術工",
  10: "交通運輸從業",
  11: "機械操作/組裝",
  12: "非技術/體力工",
  13: "未就學兒童",
  14: "小學生",
  15: "國中生",
  16: "高中生",
  17: "專科生",
  18: "大學生/研究生",
  19: "家庭主婦(夫)",
  20: "無業",
  21: "其他",
  22: "不明",
  23: "警察人員",
  24: "軍人",
  25: "志工",
  26: "退休",
  27: "原住民工作者",
  28: "外籍人士",
};
causeCodeMap = {
  1: "違規超車",
  2: "爭(搶)道行駛",
  3: "蛇行或方向不定",
  4: "逆向行駛",
  5: "未靠右行駛",
  6: "未依規定讓車",
  7: "變換車道不當",
  8: "左轉未依規定",
  9: "右轉未依規定",
  10: "迴轉未依規定",
  11: "橫越道路不慎",
  12: "倒車未依規定",
  13: "超速失控",
  14: "未依規定減速",
  15: "搶越行人穿越道",
  16: "未保持安全距離",
  17: "未保持安全間隔",
  18: "停車未注意安全",
  19: "起步未注意安全",
  20: "吸食違禁物",
  21: "酒醉駕駛失控",
  22: "疲勞/患病失控",
  23: "未注意車前狀態",
  24: "搶越平交道",
  25: "違反號誌指揮",
  26: "違反標誌(線)禁制",
  27: "未依規定使用燈光",
  28: "暗處停車無燈光",
  29: "夜間無燈光設備",
  30: "裝載貨物不穩",
  31: "載貨超重失控",
  32: "超載人員失控",
  33: "貨物超長寬高肇事",
  34: "裝卸貨不當",
  35: "裝載未盡安全措施",
  36: "未待乘客安全上下即開車",
  37: "其他裝載不當",
  38: "違規停車或暫停不當",
  39: "拋錨未採安全措施",
  40: "開啟車門不當",
  41: "手持電話失控",
  42: "其他違規或不當",
  43: "不明原因肇事",
  44: "無肇事因素(車駛)",
  45: "煞車失靈",
  46: "方向操縱故障",
  47: "燈光系統故障",
  48: "輪胎爆裂/車輪脫落",
  49: "車輛零件脫落",
  50: "其他故障",
  51: "行人違規穿越",
  52: "未依號誌穿越",
  53: "穿越未注意來車",
  54: "道路嬉戲或奔走",
  55: "未待停妥即上下車",
  56: "上下車未注意安全",
  57: "頭手伸出車外",
  58: "乘坐不當跌落",
  59: "路上工作未設標識",
  60: "其他行人疏失",
  61: "危險路況無警告",
  62: "交通管制設施失靈",
  63: "交通指揮不當",
  64: "平交道未放柵欄",
  65: "其他管制不當",
  66: "動物竄出",
  67: "無肇事因素(非駕駛)",
};
initMap = function () {
  map = L.map("map", {
    center: [25.04, 121.56],
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
formatDateTime = function (it) {
  var pad;
  pad = function (n) {
    return ("0" + n).slice(-2);
  };
  return (
    it["年"] + "年" +
    it["月"] + "月" +
    it["日"] + "日 " +
    pad(it["時"]) +
    ":" +
    pad(it["分"])
  );
};
decodeCode = function (value, map, len) {
  var normalized;
  if (value == null || value === "") {
    return "未提供";
  }
  normalized = value.toString().trim();
  if (len != null && normalized.length < len) {
    normalized = normalized.padStart(len, "0");
  }
  return map[normalized] || map[+normalized] || "未提供";
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
        if (highlightDrunk && it.isDrunk) {
          return colorDrunk;
        }
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
d3.tsv("./accidentXY_113.tsv", function (err, tsvBody) {
  var deadData,
    barPerMonth,
    barPerWeekDay,
    barPerHour,
    barAcciMonth,
    barAcciWeekDay,
    barAcciHour,
    barDrunkMonth,
    barDrunkWeekDay,
    barDrunkHour,
    ndx,
    all,
    acciMonth,
    acciWeekDay,
    acciHour,
    drunkMonth,
    drunkWeekDay,
    drunkHour,
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
    var drinkingCode;
    d.GoogleLng = +d.GoogleLng;
    d.GoogleLat = +d.GoogleLat;
    // 將時間欄位轉成數字，避免交叉篩選時以字串比較導致範圍內沒有資料
    d["年"] = +d["年"];
    d["月"] = +d["月"];
    d["日"] = +d["日"];
    d["時"] = +d["時"];
    d["分"] = +d["分"];
    d.date = new Date(d["年"] + 1911, d["月"] - 1, d["日"], d["時"], d["分"]);
    d.week = weekDayTable[d.date.getDay()];
    d.dead = +d["2-30"] + +d["死"];
    d.injury = +d["受傷"];
    d.weather = decodeCode(d["天候"], weatherMap, 1);
    d.light = decodeCode(d["光線"] || d["道路照明設備"], lightMap, 1);
    d.roadCategory = decodeCode(d["道路類別"], roadCategoryMap, 1);
    d.roadType = decodeCode(d["道路型態"], roadTypeMap, 2);
    d.accidentLocation = decodeCode(d["事故位置"], accidentLocationMap, 2);
    d.roadSurface = [
      decodeCode(d["路面狀況1"], roadSurfacePaveMap, 1),
      decodeCode(d["路面狀況2"], roadSurfaceStateMap, 1),
      decodeCode(d["路面狀況3"], roadSurfaceDefectMap, 1),
    ]
      .filter(function (val) {
        return val !== "未提供";
      })
      .join(" / ") || "未提供";
    d.obstacle = decodeCode(d["道路障礙1"], roadObstacleMap, 1);
    d.sight = decodeCode(d["道路障礙2"], sightDistanceMap, 2);
    d.signal = [
      decodeCode(d["號誌1"], signalTypeMap, 1),
      decodeCode(d["號誌2"], signalActionMap, 1),
    ]
      .filter(function (val) {
        return val !== "未提供";
      })
      .join(" / ") || "未提供";
    d.divider = decodeCode(d["車道劃分-分向"], dividerFacilityMap, 2);
    d.laneDivide = [
      decodeCode(d["車道劃分-分道1"], laneDivideMainMap, 1),
      decodeCode(d["車道劃分-分道2"], laneDivideSideMap, 1),
      decodeCode(d["車道劃分-分道3"], edgeLineMap, 1),
    ]
      .filter(function (val) {
        return val !== "未提供";
      })
      .join(" / ") || "未提供";
    d.accidentType = decodeCode(d["事故類型及型態"], accidentTypeMap, 2);
    d.actionStatus = decodeCode(d["當事者行動狀態"], actionStatusMap, 2);
    d.phoneUse = decodeCode(d["行動電話"], phoneUseMap, 1);
    d.drinkingStatus = decodeCode(d["飲酒情形"], drinkingMap, 1);
    d.protectiveGear = decodeCode(d["保護裝置"], protectiveGearMap, 1);
    d.mainCause = decodeCode(d["肇因碼-主要"], causeCodeMap, 2);
    d.hitAndRun = decodeCode(d["個人肇逃否"], hitAndRunMap, 1);
    d.gender = decodeCode(d["性別"], genderMap, 1);
    d.injurySeverity = decodeCode(d["受傷程度"], injurySeverityMap, 1);
    d.impactPoint = [
      decodeCode(d["車輛撞擊部位1"], impactPointMap, 2),
      decodeCode(d["車輛撞擊部位2"], impactPointMap, 2),
    ]
      .filter(function (val) {
        return val !== "未提供";
      })
      .join(" / ") || "未提供";
    drinkingCode = +d["飲酒情形"];
    d.isDrunk =
      drinkingCode >= 4 && drinkingCode <= 8 && !Number.isNaN(drinkingCode);
    d.countyLocation =
      (d["縣市"] || "") +
      (d["行政區"] ? " " + d["行政區"] : "") +
      " " +
      (d.allLocation || "");
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
  barDrunkMonth = dc.barChart("#DrunkMonth");
  barDrunkWeekDay = dc.barChart("#DrunkWeekDay");
  barDrunkHour = dc.barChart("#DrunkHour");
  dataTable = dc.dataTable("#AccidentTable");
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
  dataTableDim = ndx.dimension(function (it) {
    return it.date;
  });
  initMap();
  acciMonth = monthDim.group().reduceCount();
  acciWeekDay = weekdayDim.group().reduceCount();
  acciHour = hourDim.group().reduceCount();
  drunkMonth = monthDim.group().reduceSum(function (it) {
    return it.isDrunk ? 1 : 0;
  });
  drunkWeekDay = weekdayDim.group().reduceSum(function (it) {
    return it.isDrunk ? 1 : 0;
  });
  drunkHour = hourDim.group().reduceSum(function (it) {
    return it.isDrunk ? 1 : 0;
  });
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
  barDrunkMonth
    .width(barMt)
    .height(100)
    .margins(marginMt)
    .dimension(monthDim)
    .group(drunkMonth)
    .x(d3.scale.ordinal().domain(d3.range(1, 13)))
    .xUnits(dc.units.ordinal)
    .elasticY(true)
    .colors(colorDrunkScale)
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
  barDrunkWeekDay
    .width(barWk)
    .height(100)
    .margins(marginWk)
    .dimension(weekdayDim)
    .group(drunkWeekDay)
    .x(d3.scale.ordinal().domain(weekDayTable))
    .xUnits(dc.units.ordinal)
    .elasticY(true)
    .gap(4)
    .colors(colorDrunkScale)
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
  barDrunkHour
    .width(barHr)
    .height(100)
    .margins(marginHr)
    .dimension(hourDim)
    .group(drunkHour)
    .x(d3.scale.linear().domain([0, 24]))
    .elasticY(true)
    .colors(colorDrunkScale)
    .on("filtered", function (c, f) {
      return updateGraph();
    })
    .yAxis()
    .ticks(4);
  dataTable
    .dimension(dataTableDim)
    .group(function () {
      return "";
    })
    .size(20)
    .columns([
      {
        label: "日期時間",
        format: function (it) {
          return formatDateTime(it);
        },
      },
      {
        label: "行政區/地點",
        format: function (it) {
          return it.countyLocation.trim();
        },
      },
      {
        label: "環境",
        format: function (it) {
          return [it.weather, it.light].join(" / ");
        },
      },
      {
        label: "道路類別",
        format: function (it) {
          return it.roadCategory;
        },
      },
      {
        label: "道路型態",
        format: function (it) {
          return it.roadType;
        },
      },
      {
        label: "事故位置",
        format: function (it) {
          return it.accidentLocation;
        },
      },
      {
        label: "路面與號誌",
        format: function (it) {
          return [it.roadSurface, it.signal].join(" / ");
        },
      },
      {
        label: "行動狀態",
        format: function (it) {
          return it.actionStatus;
        },
      },
      {
        label: "酒駕/手機/防護",
        format: function (it) {
          return [it.drinkingStatus, it.phoneUse, it.protectiveGear]
            .filter(function (val) {
              return val !== "未提供";
            })
            .join(" / ");
        },
      },
      {
        label: "主要肇因",
        format: function (it) {
          return it.mainCause;
        },
      },
      {
        label: "事故型態",
        format: function (it) {
          return it.accidentType;
        },
      },
      {
        label: "死亡",
        format: function (it) {
          return it.dead;
        },
      },
      {
        label: "受傷",
        format: function (it) {
          return it.injury;
        },
      },
      {
        label: "當事人數",
        format: function (it) {
          return it["當事人數"];
        },
      },
    ])
    .sortBy(function (it) {
      return it.date;
    })
    .order(d3.descending)
    .showGroups(false);
  dc.renderAll();
  updateGraph();
  (function () {
    var drunkToggleButton;
    drunkToggleButton = d3.select("#DrunkToggle");
    return drunkToggleButton.on("click", function () {
      highlightDrunk = !highlightDrunk;
      drunkToggleButton.classed("active", highlightDrunk);
      drunkToggleButton.text(highlightDrunk ? "酒駕標示：開" : "酒駕標示：關");
      return updateGraph();
    });
  })();
  navls = [
    {
      ttl: "事故交叉篩選",
      txt: "這裡呈現 2024 年（民國 113 年）臺北市 A1 與 A2 類交通事故，共 22,357 起事故、74 起死亡。黃色代表事故，紅色代表發生死亡的事故。</br></br>（點擊此區開始導覽。）",
      act: function () {},
    },
    {
      ttl: "每月趨勢",
      txt: "黃色是事故數量，紅色是死亡。可以看到臺北市在 6–7 月有明顯的事故高峰，死亡事件則集中在年初與年中。（點擊前往「星期別」）",
      act: function () {
        return d3.selectAll(".fltWeek, .fltHour").transition().style({
          opacity: 0.2,
        });
      },
    },
    {
      ttl: "星期別",
      txt: "各星期的事故數相當平均，其中週四與週五相對突出；周末死亡事故比例也偏高。（點擊前往「時段」）",
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
      txt: "凌晨 0–7 點事故數量較少，但死亡比例偏高；尖峰時段（7–9 點、17–19 點）事故數最多。</br></br>想知道這些事故在哪裡嗎？（點擊看看）",
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
        return hourDim.filterRange([0, 8]);
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
      txt: "反過來也行，放大地圖任何區域，圖表會跟著更新。現在顯示的是信義計畫區周邊（市政府、台北 101）。（點擊切換另一個地理篩選）",
      act: function () {
        map.setView({ lat: 25.0339, lng: 121.5646 }, 14);
        return setTimeout(function () {
          return map.setZoom(15);
        }, 150);
      },
    },
    {
      ttl: "地理交叉篩選",
      txt: "我們也可以移到內湖科技園區周邊。</br></br>程式化產生的視覺化有個好處：開發一次後，只要換資料就能快速得到最新圖表。</br></br>開始自己探索吧！用左側縮放滑桿或方向箭頭，也能直接拖曳地圖在城市中移動。",
      act: function () {
        return map.setView({
          lat: 25.0806,
          lng: 121.575,
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
