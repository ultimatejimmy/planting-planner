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

getStation = (position) => {
	const url = "http://api.farmsense.net/v1/frostdates/stations/?lat=" + position.coords.latitude + "&lon=" + position.coords.longitude;
	fetch(url)
		.then(res => res.json())
		.then(
			result => {
				getFrostDate(result[0].id);
			},
			error => {
				this.setState({
					error
				});
			}
		)
}

getFrostDate = (stationId) => {
	const url = "http://api.farmsense.net/v1/frostdates/probabilities/?station=" + stationId + "&season=1";
	fetch(url)
		.then(res => res.json())
		.then(
			result => {
				setFrostDate(result[0].prob_30);
			},
			error => {
				this.setState({
					error
				});
			}
		)
}


setFrostDate = (date) => {
	const currentDate = new Date();
	let formattedDate = currentDate.getFullYear() + "-" + date.substring(0, 2) + "-" + date.substring(2);
	dateField = formattedDate;
	generateTable();
}