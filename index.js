// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area=${state}";



// Your code here
const input = document.getElementById("state-input");
const alerts = document.getElementById("alerts-display");
const errorMessage = document.getElementById("error-message");
async function fetchWeatherAlerts(state) {
    try {
        const response = await fetch(weatherApi.replace("${state}", state));

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        errorMessage.textContent = "";
        errorMessage.classList.add("hidden");

        displayAlerts(data);


        input.value = "";

    } catch (error) {
        errorMessage.textContent = "Error fetching weather alerts. Please try again.";
        errorMessage.classList.remove("hidden");
    }
}

function displayAlerts(data) {
    alerts.innerHTML = "";

    const summary = document.createElement("h2");
    summary.textContent = `${data.title}: ${data.features.length}`;
    alerts.appendChild(summary);

    data.features.forEach(feature => {
        const alertDiv = document.createElement("div");

        const headline = document.createElement("p");
        headline.textContent = feature.properties.headline;

        alertDiv.appendChild(headline);
        alerts.appendChild(alertDiv);
    });
}