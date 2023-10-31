//variáveis e seleção de elementos
const apiKey = "a64aaf926c7f90b2dec50a272e15336f";
const apiCountryURL = "https://flagsapi.com/:country_code/flat/64.png";
const apiUnsplash = "https://source.unsplash.com/1600x900/?"

const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search");

const cityElement = document.querySelector("#city");
const tempElement = document.querySelector("#temperature span");
const descElement = document.querySelector("#description");
const weatherIconElement = document.querySelector("#weather-icon");
const countryElement = document.querySelector("#country");
const humidityElement = document.querySelector("#humidity span"); 
const windElement = document.querySelector("#wind span");

const weatherContainer = document.querySelector("#weather-data")

const errorMessage = document.querySelector("#weather-data")
const loader = document.querySelector("#loader")

const toggleLoader = () =>{
    loader.classList.toggle("hide")
}

searchBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const city = cityInput.value;

    showWeatherData(city);
});

//funções
const getWeatherData = async (city) => {
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

    const res = await fetch(apiWeatherURL);
    const data = await res.json();

    toggleLoader()

    return data;
}

const showError = () =>{
    errorMessage.classList.remove("hide")
}

const hideInformation = () =>{
    errorMessage.classList.add("hide")
    weatherContainer.classList.add("hide")
}

const showWeatherData = async (city) => {
    const data = await getWeatherData(city);

    if(data.cod === "404"){
        showError()
        return
    }

    cityElement.innerText = data.name;
    tempElement.innerText = parseInt(data.main.temp);
    descElement.innerText = data.weather[0].description;
    weatherIconElement.setAttribute("src", `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`);

    countryElement.setAttribute("src", apiCountryURL.replace(":country_code", data.sys.country));
    humidityElement.innerText = `${data.main.humidity}%`;
    windElement.innerText = `${data.wind.speed}km/h`;

    document.body.style.backgroundImage = `url("${apiUnsplash + city})`

    weatherContainer.classList.remove("hide")
}

cityInput.addEventListener("keyup", (e) =>{
    if(e.code == "Enter"){
        const city = e.target.value

        showWeatherData(city)
    }
})
