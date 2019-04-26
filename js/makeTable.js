const lastFrostDate = new Date(document.querySelector("input#frostDate").value);

showTable = () => document.querySelector("#plants").classList.remove("hidden");

document.addEventListener("keyup", function(event) {
	if (event.keyCode === 13) {
		event.preventDefault();
		document.querySelector("button").click();
	}
});

generateHeader = () => {
	for (var i = -1; i >= -10; i--) {
		let cell = document.querySelector("thead tr").insertCell();
		let date = calculatePlantingDate(i);
		let month = date.getMonth();
		let day = date.getDate();
		console.log(date);
		// cell.appendChild(
		// 	document.createTextNode(
		// 		month.toLocaleDateString() + "/" + day.toLocaleDateString()
		// 	)
		// );
	}
};

generateBody = () => {
	let tbody = document.createElement("tbody");
	tbody.classList.add("list");
	let old_tbody = document.querySelector("tbody");
	document.querySelector("table").replaceChild(tbody, old_tbody);
	for (let plant of plants) {
		let row = tbody.insertRow();
		let plantName = row.insertCell();
		plantName.classList.add("plant");
		plantName.appendChild(document.createTextNode(plant.name));
		let schedule = row.insertCell();
		if (plant.startIndoors) {
			let indoor = getPlantingDates(
				plant.startIndoorsMax,
				plant.startIndoorsMin,
				"Start Indoors: "
			);
			schedule.appendChild(indoor);
			schedule.appendChild(document.createElement("br"));
		}
		let outdoor = getPlantingDates(
			plant.startOutdoorsMin,
			plant.startOutdoorsMax,
			"Start Outdoors/Plant Out: "
		);
		schedule.appendChild(outdoor);
		row.appendChild(schedule);
	}
	showTable();
};

generateTable = () => {
	generateHeader();
	generateBody();
};

getPlantingDates = (earliest, latest, theLabel) => {
	let span = document.createElement("span");
	let label = document.createElement("label");
	label.appendChild(document.createTextNode(theLabel));
	let dates =
		calculatePlantingDate(earliest).toLocaleDateString() +
		"-" +
		calculatePlantingDate(latest).toLocaleDateString();
	span.appendChild(label).appendChild(document.createTextNode(dates));
	return span;
};

calculatePlantingDate = weeks => {
	let days = weeks * 7;
	let date = lastFrostDate;
	date.setDate(date.getDate() + days);

	return date;
};

function searchTable() {
	// Declare variables
	var input, filter, table, tr, td, i, txtValue;
	input = document.getElementById("search");
	filter = input.value.toUpperCase();
	table = document.querySelector("table");
	tr = table.getElementsByTagName("tr");

	// Loop through all table rows, and hide those who don't match the search query
	for (i = 0; i < tr.length; i++) {
		td = tr[i].getElementsByTagName("td");
		if (td) {
			txtValue = td.textContent || td.innerText;
			if (txtValue.toUpperCase().indexOf(filter) > -1) {
				tr[i].style.display = "";
			} else {
				tr[i].style.display = "none";
			}
		}
	}
}

const input = document.querySelector("#frostdate");

input.addEventListener("input", generateTable);
