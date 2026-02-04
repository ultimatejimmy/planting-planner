const locationInfo = document.querySelector("#locationInfo");
const zipCodeField = document.querySelector("#zipcode");

function getLocation() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(getZip, showError);
	} else {
		locationInfo.innerHTML = "Geolocation is not supported by this browser.";
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
		proxy = "https://corsproxy.io/?url="
		getZip(currentPosition);
	}
	return response;
}

let currentPosition;
let proxy = "https://polished-night-b971.ultimatejimmy.workers.dev/?";
let api_key_proxy = "https://curly-sea-90e9.ultimatejimmy.workers.dev/";

getZip = (position) => {
	currentPosition = position;
	locationInfo.textContent = "Loading based on " + position.coords.latitude + ", " + position.coords.longitude;
	const url = api_key_proxy + "?lat=" + position.coords.latitude + "&lon=" + position.coords.longitude;
	// console.log(url);
	fetch(url)
		.catch(handleErrors)
		.then(res => {
			// Optional: Check for HTTP errors (like 404 or 500)
			// fetch() only rejects on network failure, not server errors.
			if (!res.ok) {
				throw new Error(`HTTP error! status: ${res.status}`);
			}
			return res.json();
		})
		.then(result => {
			// Check if result is an array or object to avoid crashes
			const data = Array.isArray(result) ? result[0] : result;
			
			if (data && data.address) {
				// console.log(data.address.postcode);
				getStation(data.address.postcode);
				getFrostDate(data.address.postcode);
				zipCodeField.value = data.address.postcode;
			} else {
				console.error("Address data not found in response");
			}
		})
		
}

getByZip = () => {
	const zipCode = document.querySelector("#zipcode").value;
	getStation(zipCode);
	getFrostDate(zipCode);
}

getStation = (zipCode) => {
	const url = proxy + "https://apis.joelgrant.dev/api/v1/frost/" + zipCode;
	// console.log(url);
	fetch(url)
		.catch(handleErrors)
		.then(res => {
			// Optional: Check for HTTP errors (like 404 or 500)
			// fetch() only rejects on network failure, not server errors.
			if (!res.ok) {
				throw new Error(`HTTP error! status: ${res.status}`);
			}
			return res.json();
		})
		.then(
			result => {
				const data = Array.isArray(result) ? result[0] : result;
				if (data && data.data.weather_station) {
					locationInfo.textContent = "Loaded closest station: " + data.data.weather_station.name;
				} else {
					console.error("Address data not found in response");
				}
			},
		)
		
}

getFrostDate = (zipCode) => {

	const url = proxy + "https://apis.joelgrant.dev/api/v1/frost/" + zipCode;
	fetch(url)
		.catch(handleErrors)
		.then(res => {
			// Optional: Check for HTTP errors (like 404 or 500)
			// fetch() only rejects on network failure, not server errors.
			if (!res.ok) {
				throw new Error(`HTTP error! status: ${res.status}`);
			}
			return res.json();
		})
		.then(
			result => {
				const data = Array.isArray(result) ? result[0] : result;
				if (data && data.data.weather_station) {
					setFrostDate(data.data.frost_dates.last_frost_32f['30%']);
				} else {
					console.error("Address data not found in response");
				}
			},
		)
}


setFrostDate = (date) => {
	const currentDate = new Date();
	let formattedDate = currentDate.getFullYear() + "-" + date.substring(0, 2) + "-" + date.substring(3);
	dateField.value = formattedDate;
	generateTable();
}

function copyCurrentUrl() {
  const urlToCopy = window.location.href;

  navigator.clipboard.writeText(urlToCopy).then(() => {
    // Optional: Provide visual feedback to the user
    const feedbackEl = document.getElementById('copy-feedback');
    if (feedbackEl) {
      feedbackEl.style.display = 'inline';
      setTimeout(() => {
        feedbackEl.style.display = 'none';
      }, 2000); // Hide the message after 2 seconds
    }
  }).catch(err => {
    console.error('Could not copy URL: ', err);
    alert('Failed to copy URL to clipboard.');
  });
}
