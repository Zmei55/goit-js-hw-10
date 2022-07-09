import './css/styles.css';
// import Notiflix from 'notiflix';

// const DEBOUNCE_DELAY = 300;

const refs = {
  countryInfo: document.querySelector('.country-info'),
  countryList: document.querySelector('.country-list'),
};

// function fetchCountries(name) {}

fetch('https://restcountries.com/v3.1/name/germany?fields=name,capital,population,languages,flags')
  .then(r => r.json())
  .then(countrys => {
    console.log('countrys', countrys);
    countrys.map(country => renderCountryInfo(country));
  })
  .catch(error => console.log(error));

function renderCountryInfo({ name, capital, population, languages, flags }) {
  const markup = `
  <div class='card'>
    <div class='card-header'>
      <img src='${flags.svg}' alt='${name}' class='card-img' />
      <h2 class='card-titel'>${name.official}</h2>
    </div>
    <p class='card-text'><b>Capital:</b> ${capital}</p>
    <p class='card-text'><b>Population:</b> ${population}</p>
    <p class='card-text'><b>Languages:</b> ${Object.values(languages)}</p>
  </div>`;

  return (refs.countryInfo.innerHTML = markup);
}
