"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var dateField = document.getElementById("frostDate");
var lastFrostDate = new Date(dateField);

showTable = function showTable() {
  return document.querySelector("#plants").classList.remove("hidden");
};

hideTable = function hideTable() {
  return document.querySelector("#plants").classList.add("hidden");
};

var plantSet = new Set();
var table = document.getElementById("thePlants");
var tbody = table.querySelector("tbody");
var tr = tbody.getElementsByTagName("tr");
document.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.querySelector("button").click();
  }
});

generateHeader = function generateHeader() {
  var headerDates = document.getElementsByClassName("date");

  while (headerDates[0]) {
    headerDates[0].parentNode.removeChild(headerDates[0]);
  }

  for (var i = -10; i <= 4; i++) {
    var cell = document.querySelector("thead tr").insertCell();
    cell.classList.add("date");
    var date = calculatePlantingDate(i);
    var options = {
      month: "numeric",
      day: "numeric"
    };
    cell.appendChild(document.createTextNode(date.toLocaleDateString(undefined, options)));
  }
};

generateBody = function generateBody() {
  var tbody = document.createElement("tbody");
  var old_tbody = document.querySelector("tbody");
  document.querySelector("table").replaceChild(tbody, old_tbody);
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = plants[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var plant = _step.value;
      var row = tbody.insertRow();
      row.id = plant.name;
      var checkbox = row.insertCell();
      checkbox.classList.add("filterCB", "hide");
      var cb = document.createElement("input");
      cb.setAttribute("type", "checkbox");
      checkbox.appendChild(cb);
      var plantName = row.insertCell();
      plantName.classList.add("plant");
      plantName.appendChild(document.createTextNode(plant.name));
      var schedule = row.insertCell();
      schedule.classList.add("schedule");

      if (plant.startIndoors) {
        var indoor = getPlantingDates(plant.startIndoorsMax, plant.startIndoorsMin, "🏡 ");
        schedule.appendChild(indoor);
        schedule.appendChild(document.createElement("br"));
      }

      var outdoor = getPlantingDates(plant.startOutdoorsMin, plant.startOutdoorsMax, "🌤️ ");
      schedule.appendChild(outdoor);
      row.appendChild(schedule);

      for (var i = -10; i <= 4; i++) {
        var cell = row.insertCell();
        cell.classList.add("date");
        var date = calculatePlantingDate(i);
        if (datesOverlap(calculatePlantingDate(plant.startIndoorsMax), calculatePlantingDate(plant.startIndoorsMin), date, date)) cell.classList.add("startIndoors");
        if (datesOverlap(calculatePlantingDate(plant.startOutdoorsMin), calculatePlantingDate(plant.startOutdoorsMax), date, date)) cell.classList.add("startOutdoors");
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  showTable();
};

generateTable = function (_generateTable) {
  function generateTable() {
    return _generateTable.apply(this, arguments);
  }

  generateTable.toString = function () {
    return _generateTable.toString();
  };

  return generateTable;
}(function () {
  generateHeader();
  generateBody();
  var input = document.querySelector("#frostDate");
  input.addEventListener("change", generateTable);
  updateURL("date", dateField.value);
  table = document.getElementById("thePlants");
  tbody = table.querySelector("tbody");
  tr = tbody.getElementsByTagName("tr");
});

getPlantingDates = function getPlantingDates(earliest, latest, theLabel) {
  var span = document.createElement("span");
  var options = {
    month: "short",
    day: "numeric"
  };
  span.appendChild(document.createTextNode(theLabel));
  var dates = calculatePlantingDate(earliest).toLocaleDateString(undefined, options) + "-" + calculatePlantingDate(latest + 6 / 7).toLocaleDateString(undefined, options);
  span.appendChild(document.createTextNode(dates));
  return span;
};

calculatePlantingDate = function calculatePlantingDate(weeks) {
  var lastFrostDate = new Date(document.querySelector("input#frostDate").value);
  var days = weeks * 7;
  days++;
  var date = lastFrostDate;
  date.setDate(date.getDate() + days);
  return date;
};

datesOverlap = function datesOverlap(start1, end1, start2, end2) {
  return start1 <= end2 && start2 <= end1;
};

searchTable = function searchTable() {
  var input, filter, i, id;
  input = document.getElementById("search");
  filter = input.value.toUpperCase(); // Loop through all table rows, and hide those who don't match the search query

  for (i = 0; i < tr.length; i++) {
    id = tr[i].id;

    if (id.toUpperCase().indexOf(filter) > -1) {
      tr[i].style.display = "";
    } else {
      tr[i].style.display = "none";
    }
  }
};

var url = new URL(document.location);
var params = new URLSearchParams(url.search);

updateURL = function updateURL(type, value) {
  if (type == "date") {
    url.searchParams.set(type, value);
  }

  if (type == "custom") {
    url.searchParams.set("p", value);
  }

  var new_url = url.toString();
  history.pushState({
    path: new_url
  }, '', new_url);
};

updateDateViaURL = function updateDateViaURL() {
  if (params.get("date") != null) {
    dateField.value = params.get("date");
    generateTable();
  } else hideTable();
};

updatePlantsViaURL = function updatePlantsViaURL() {
  if (params.get("p") != null) {
    generateTable();
    checkBoxesFromURL(params.get("p"));
    filterByCB();
  }
};

toggleCB = function toggleCB() {
  var cbs = _toConsumableArray(document.getElementsByClassName("filterCB"));

  cbs.forEach(function (cell) {
    cell.classList.toggle('hide');
  });
};

showAllRows = function showAllRows() {
  for (i = 0; i < tr.length; i++) {
    tr[i].style.display = "";
  }
};

toggleListButtons = function toggleListButtons() {
  document.querySelector("#editList").classList.toggle("hide");
  document.querySelector("#saveList").classList.toggle("hide");
};

editList = function editList() {
  toggleCB();
  showAllRows();
  toggleListButtons();
};

checkBoxesFromURL = function checkBoxesFromURL(plantParams) {
  var i, cb, currentPlant;
  urlPlants = new Set(String(plantParams).split("|"));
  console.log(urlPlants);
  toggleCB();

  for (i = 0; i < tr.length; i++) {
    cb = tr[i].getElementsByTagName("input")[0];
    currentPlant = tr[i].id; // console.log(currentPlant)

    if (urlPlants.has(currentPlant)) {
      console.log("true");
      cb.click();
    }
  }
};

saveList = function saveList() {
  toggleListButtons();
  filterByCB();
};

filterByCB = function filterByCB() {
  var i, cb;
  plantSet.clear();

  if (document.querySelectorAll('input[type="checkbox"]:checked').length == 0) {
    showAllRows();
  } else {
    for (i = 0; i < tr.length; i++) {
      cb = tr[i].getElementsByTagName("input")[0];

      if (cb.checked) {
        tr[i].style.display = "";
        plantSet.add(tr[i].id);
      } else {
        tr[i].style.display = "none";
      }
    }
  }

  updateURL("custom", _toConsumableArray(plantSet).join('|'));
  toggleCB();
};

copyURLToClipboard = function copyURLToClipboard() {
  navigator.clipboard.writeText(window.location.href);
};

document.addEventListener("DOMContentLoaded", function () {
  updateDateViaURL();
  updatePlantsViaURL();
});