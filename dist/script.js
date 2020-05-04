const submit = document.getElementById('locationSubmit');
const input = document.getElementById('location');
const error = document.getElementById('error');

async function getWeather(location) {
  try{
    const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=bc41a430cd476c4edc32d31b9eedaf5a`);
    const json = await response.json();
    displayWeather(json);
  } catch(err) {
    error.style.display = 'block';
  }
  
}

async function displayWeather(data) {
  try{
    const lastSearch = document.getElementById('lastSearch');
    const cityLocation = document.getElementById('cityLocation');
    const currTemp = document.getElementById('currTemp');
    const wind = document.getElementById('wind');
    const mainWeather = document.getElementById('mainWeather');
    const description = document.getElementById('description');

    const background = await fetch(`https://api.giphy.com/v1/gifs/translate?api_key=k2G8FMMfegAY4W2tw3grDEQhjlWhYY6o&s=${data.weather[0].main}`, {mode: 'cors'});
    const bgJson = await background.json();
    console.log(bgJson);
    lastSearch.style.backgroundImage = `url("${bgJson.data.images.original.url}")`;
    cityLocation.innerHTML = `Search City: ${data.name}`;
    currTemp.innerHTML = `Current Temp: ${data.main.temp}°F`;
    wind.innerHTML = `Wind Speed: ${data.wind.speed} mph`;
    mainWeather.innerHTML = `Weather is ${data.weather[0].main}`;
    description.innerHTML = `Today is: ${data.weather[0].description}`;
  } catch {
    error.style.display = 'block';
  }
}

submit.addEventListener('click', () => {
  error.style.display = 'none';
  const location = input.value;
  if(location !== undefined && location !== '' && location !== null) {
    getWeather(location);
  } else {
    error.style.display = 'block';
  }
});