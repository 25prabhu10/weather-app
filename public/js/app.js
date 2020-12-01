const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');
const messageThree = document.querySelector('#message-3');
const weatherIcon = document.querySelector('#weatherIcon');
const messageFour = document.querySelector('#message-4');
const messageFive = document.querySelector('#message-5');
const messageSix = document.querySelector('#message-6');

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const location = search.value;

  messageOne.textContent = 'Loading...';
  messageTwo.textContent = '';
  messageThree.textContent = '';
  weatherIcon.src = '';
  weatherIcon.alt = '';
  messageFour.textContent = '';
  messageFive.textContent = '';
  messageSix.textContent = '';

  fetch('/weather?address=' + encodeURIComponent(location)).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        messageOne.textContent = data.error;
      } else {
        messageOne.textContent = data.location;
        messageTwo.textContent =
          'Observation Time: ' + data.forecast.observationTime;
        messageThree.textContent = 'Weather: ' + data.forecast.description[0];
        weatherIcon.src = data.forecast.weatherIcon;
        weatherIcon.alt = data.forecast.description[0];
        messageFour.textContent =
          'Temperature: ' + data.forecast.temperature + ' °C';
        messageFive.textContent =
          'Feels Like: ' + data.forecast.feelsLike + ' °C';
        messageSix.textContent = 'Humidity: ' + data.forecast.humidity + '%';
      }
    });
  });
});
