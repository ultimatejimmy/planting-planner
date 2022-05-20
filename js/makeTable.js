const dateField = document.getElementById("frostDate");
const lastFrostDate = new Date(dateField);
showTable = () => document.querySelector("#plants").classList.remove("hidden");
hideTable = () => document.querySelector("#plants").classList.add("hidden");
const plantSet = new Set()
let table = document.getElementById("thePlants")
let tbody = table.querySelector("tbody")
let tr = tbody.getElementsByTagName("tr")

document.addEventListener("keyup", function (event) {
	if (event.key === "Enter") {
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
		row.id = plant.name;
		let checkbox = row.insertCell();
		checkbox.classList.add("filterCB", "hide");
		let cb = document.createElement("input");
		cb.setAttribute("type", "checkbox");
		checkbox.appendChild(cb);
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
	updateURL("date", dateField.value);
	table = document.getElementById("thePlants")
	tbody = table.querySelector("tbody")
	tr = tbody.getElementsByTagName("tr")
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
	var input, filter, i, id;
	input = document.getElementById("search");
	filter = input.value.toUpperCase();
	

	// Loop through all table rows, and hide those who don't match the search query
	for (i = 0; i < tr.length; i++) {
		id = tr[i].id;
		if (id.toUpperCase().indexOf(filter) > -1) {
			tr[i].style.display = "";
		} else {
			tr[i].style.display = "none";
		}
	}
}

let url = new URL(document.location);
let params = new URLSearchParams(url.search);
updateURL = (type, value) => {
	if(type == "date") {
		url.searchParams.set(type, value);
	}
	if(type == "custom") {
		url.searchParams.set("p", value)
	}
	let new_url = url.toString();
	history.pushState({
		path: new_url
	}, '', new_url);

}

updateDateViaURL = () => {
	if (params.get("date") != null) {
		dateField.value = params.get("date");
		generateTable();
	} else
		hideTable();
}
updatePlantsViaURL = () => {
	if (params.get("p") != null) {
		generateTable()
		checkBoxesFromURL(params.get("p"))
		filterByCB()
	} 
}

toggleCB = () => {
	const cbs = [...document.getElementsByClassName("filterCB")]
	cbs.forEach(cell => {
		cell.classList.toggle('hide')
	})	
}

showAllRows = () => {
	for (i = 0; i < tr.length; i++) {
		tr[i].style.display = ""
	}
}

toggleListButtons = () =>{
	document.querySelector("#editList").classList.toggle("hide")
	document.querySelector("#saveList").classList.toggle("hide")
}

editList = () => {
	toggleCB()
	showAllRows()
	toggleListButtons()
}
checkBoxesFromURL = (plantParams) => {
	var i, cb, currentPlant
	
	urlPlants = new Set(String(plantParams).split("|"))
	console.log(urlPlants)
	toggleCB()
	for (i = 0; i < tr.length; i++) {
		cb = tr[i].getElementsByTagName("input")[0]
		currentPlant = tr[i].id
		// console.log(currentPlant)
		if(urlPlants.has(currentPlant)) {
			console.log("true")
			cb.click()
		}
	}
}

saveList = () => {
	toggleListButtons()
	filterByCB()
}

filterByCB = () => {
	var i, cb
	
	plantSet.clear()

	if(document.querySelectorAll('input[type="checkbox"]:checked').length == 0) {
		showAllRows()
	} else {
		for (i = 0; i < tr.length; i++) {
			cb = tr[i].getElementsByTagName("input")[0]
	
			if (cb.checked) {
					tr[i].style.display = ""
					plantSet.add(tr[i].id)
				} else {
					tr[i].style.display = "none"
				}
		}
	}
	
	updateURL("custom", [...plantSet].join('|'))
	toggleCB()
}

copyURLToClipboard = () => {
	navigator.clipboard.writeText(window.location.href);
  }

document.addEventListener("DOMContentLoaded", function () {
	updateDateViaURL()
	updatePlantsViaURL()
});