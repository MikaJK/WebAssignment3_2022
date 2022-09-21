import "./styles.css";

function $(x) {
  return document.getElementById(x);
}

async function fetchData(url) {
  return await fetch(url).then((response) => response.json());
}

async function fillTable(table, username) {
  var table1 = $("theB");
  var url =
    "https://statfin.stat.fi/PxWeb/sq/4e244893-7761-4c4f-8e55-7a8d41d86eff";
  var promise = await fetchData(url);
  var url2 =
    "https://statfin.stat.fi/PxWeb/sq/5e288b40-f8c8-4f1e-b3b0-61b86ce5c065";

  var promise2 = await fetchData(url2);
  var dataset3 = promise2.dataset.value;

  let dataset = promise.dataset.dimension.Alue.category.label;
  let dataset2 = promise.dataset.value;
  console.log(JSON.stringify(promise2));
  //console.log(JSON.stringify(promise.value));
  var y = 0;
  for (var x in dataset) {
    addToTable(table1, dataset2[y], dataset[x], dataset3[y]);
    y++;
  }
}

function addToTable(table, population, area, addEmployment) {
  var row = table.insertRow();

  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);
  var cell4 = row.insertCell(3);
  cell1.innerHTML = area;
  cell2.innerHTML = population;
  cell3.innerHTML = addEmployment;
  let num = addEmployment / population;
  let numRounder = Math.round((num + Number.EPSILON) * 100) / 100;
  cell4.innerHTML = numRounder;
  if (numRounder > 0.45) {
    row.id = "goodData";
  } else if (numRounder < 0.25) {
    row.id = "badData";
  }
}

if (document.readyState !== "loading") {
  initializeCode();
} else {
  document.addEventListener("DOMContentLoaded", function () {
    initializeCode();
  });
}

function initializeCode() {
  fillTable();
}
