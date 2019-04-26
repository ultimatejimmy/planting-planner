showTable = () => document.querySelector("#plants").classList.remove("hidden");

document.addEventListener("keyup", function(event) {
	if (event.keyCode === 13) {
		event.preventDefault();
		document.querySelector("button").click();
	}
});

generateTable = () => {
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
getPlantingDates = (earliest, latest, theLabel) => {
	let span = document.createElement("span");
	let label = document.createElement("label");
	label.appendChild(document.createTextNode(theLabel));
	let dates =
		calculatePlantingDate(earliest) + "-" + calculatePlantingDate(latest);
	span.appendChild(label).appendChild(document.createTextNode(dates));
	return span;
};

calculatePlantingDate = weeks => {
	const lastFrostDate = new Date(
		document.querySelector("input#frostDate").value
	);
	let days = weeks * 7;
	let date = lastFrostDate;
	date.setDate(date.getDate() + days);
	date = date.toLocaleDateString();

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
