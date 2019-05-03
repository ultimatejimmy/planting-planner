const dateField = document.getElementById("frostDate");
const lastFrostDate = new Date(dateField);
showTable = () => document.querySelector("#plants").classList.remove("hidden");

document.addEventListener("keyup", function (event) {
	if (event.keyCode === 13) {
		event.preventDefault();
		document.querySelector("button").click();
	}
});

generateHeader = () => {
	var headerDates = document.getElementsByClassName("date");
	while (headerDates[0])
		headerDates[0].parentNode.removeChild(headerDates[0]);

	for (var i = -10; i <= 4; i++) {
		let cell = document.querySelector("thead tr").insertCell();
		cell.classList.add("date");
		let date = calculatePlantingDate(i);
		const options = {
			month: "numeric",
			day: "numeric"
		};
		cell.appendChild(
			document.createTextNode(date.toLocaleDateString(undefined, options))
		);
	}
};

generateBody = () => {
	let tbody = document.createElement("tbody");
	let old_tbody = document.querySelector("tbody");
	document.querySelector("table").replaceChild(tbody, old_tbody);
	for (let plant of plants) {
		let row = tbody.insertRow();
		let plantName = row.insertCell();
		plantName.classList.add("plant");
		plantName.appendChild(document.createTextNode(plant.name));
		let schedule = row.insertCell();
		schedule.classList.add("schedule");
		if (plant.startIndoors) {
			let indoor = getPlantingDates(
				plant.startIndoorsMax,
				plant.startIndoorsMin,
				"🏡 "
			);
			schedule.appendChild(indoor);
			schedule.appendChild(document.createElement("br"));
		}
		let outdoor = getPlantingDates(
			plant.startOutdoorsMin,
			plant.startOutdoorsMax,
			"🌤️ "
		);
		schedule.appendChild(outdoor);
		row.appendChild(schedule);
		for (var i = -10; i <= 4; i++) {
			let cell = row.insertCell();
			cell.classList.add("date");
			let date = calculatePlantingDate(i);
			if (
				datesOverlap(
					calculatePlantingDate(plant.startIndoorsMax),
					calculatePlantingDate(plant.startIndoorsMin),
					date,
					date
				)
			)
				cell.classList.add("startIndoors");

			if (
				datesOverlap(
					calculatePlantingDate(plant.startOutdoorsMin),
					calculatePlantingDate(plant.startOutdoorsMax),
					date,
					date
				)
			)
				cell.classList.add("startOutdoors");
		}
	}
	showTable();
};

generateTable = () => {
	generateHeader();
	generateBody();
	const input = document.querySelector("#frostDate");
	input.addEventListener("change", generateTable);
	updateURL();
};

getPlantingDates = (earliest, latest, theLabel) => {
	let span = document.createElement("span");
	const options = {
		month: "short",
		day: "numeric"
	};
	span.appendChild(document.createTextNode(theLabel));
	let dates =
		calculatePlantingDate(earliest).toLocaleDateString(undefined, options) +
		"-" +
		calculatePlantingDate(latest + 6 / 7).toLocaleDateString(
			undefined,
			options
		);
	span.appendChild(document.createTextNode(dates));
	return span;
};

calculatePlantingDate = weeks => {
	const lastFrostDate = new Date(
		document.querySelector("input#frostDate").value
	);
	let days = weeks * 7;
	days++;
	let date = lastFrostDate;
	date.setDate(date.getDate() + days);

	return date;
};

datesOverlap = (start1, end1, start2, end2) => {
	return start1 <= end2 && start2 <= end1;
};

searchTable = () => {
	var input, filter, table, tbody, tr, td, i, txtValue;
	input = document.getElementById("search");
	filter = input.value.toUpperCase();
	table = document.getElementById("thePlants");
	tbody = table.querySelector("tbody");
	tr = tbody.getElementsByTagName("tr");

	// Loop through all table rows, and hide those who don't match the search query
	for (i = 0; i < tr.length; i++) {
		td = tr[i].getElementsByTagName("td")[0];
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

const url = new URL(document.location);
const params = new URLSearchParams(url.search);
const date = document.getElementById('frostDate').value;
updateURL = () => {
	params.set("date", date);

	let new_url = url.toString() + "?" + params.toString();
	history.pushState({
		path: new_url
	}, '', new_url);

	console.log(params.toString());
}

updateDateViaURL = () => {
	let dateValue = dateField.value;
	if (params.has("date"))
		dateValue = params.get(date);
}

document.addEventListener("DOMContentLoaded", function () {
	updateDateViaURL();
});