const locationError = document.querySelector("#locationError");

function getLocation() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(getStation, showError);
	} else {
		locationError.innerHTML = "Geolocation is not supported by this browser.";
	}
}

function showError(error) {
	switch (error.code) {
		case error.PERMISSION_DENIED:
			locationError.innerHTML = "User denied the request for Geolocation."
			break;
		case error.POSITION_UNAVAILABLE:
			locationError.innerHTML = "Location information is unavailable."
			break;
		case error.TIMEOUT:
			locationError.innerHTML = "The request to get user location timed out."
			break;
		case error.UNKNOWN_ERROR:
			locationError.innerHTML = "An unknown error occurred."
			break;
	}
}

function handleErrors(response) {
	if (!response.ok) {
		console.log("Proxy failed...trying another...");
		proxy = "https://cors.io/?";
		getStation(currentPosition);
	}
	return response;
}

let currentPosition;
let proxy = "https://yacdn.org/proxy/";

getStation = (position) => {
	locationError.textContent = "Loading based on " + position.coords.latitude + ", " + position.coords.longitude;
	currentPosition = position;
	const url = proxy + "http://api.farmsense.net/v1/frostdates/stations/?lat=" + position.coords.latitude + "&lon=" + position.coords.longitude;
	fetch(url)
		.catch(handleErrors)
		.then(res => res.json())
		.then(
			result => {
				getFrostDate(result[0].id);
			},
		)
}

getFrostDate = (stationId) => {
	const url = proxy + "http://api.farmsense.net/v1/frostdates/probabilities/?station=" + stationId + "&season=1";
	fetch(url)
		.then(handleErrors)
		.then(res => res.json())
		.then(
			result => {
				setFrostDate(result[0].prob_30);
			},
		)
}


setFrostDate = (date) => {
	const currentDate = new Date();
	let formattedDate = currentDate.getFullYear() + "-" + date.substring(0, 2) + "-" + date.substring(2);
	dateField.value = formattedDate;
	generateTable();
	locationError.textContent = null;
}