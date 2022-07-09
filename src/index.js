import './css/styles.css';
import debounce from 'lodash.debounce';
// import Notiflix from 'notiflix';

// const DEBOUNCE_DELAY = 300;

const refs = {
  countryInfo: document.querySelector('.country-info'),
  countryList: document.querySelector('.country-list'),
  inputRef: document.querySelector('#search-box'),
};

refs.inputRef.addEventListener('input', fetchCountries);

function fetchCountries(name) {
  name.preventDefault();

  const countryToFind = name.target.value.trim();

  fetch(
    `https://restcountries.com/v3.1/name/${countryToFind}?fields=name,capital,population,languages,flags`
  )
    .then(r => r.json())
    .then(countries => {
      console.log('fetchCountries ~ countries', countries);
      renderCountryInfo(countries);
    })
    .catch(error => console.log(error));
}

function renderCountryInfo(countries) {
  const markup = countries.map(
    ({ name, capital, population, languages, flags }) =>
      `<div class='card-header'>
          <img src='${flags.svg}' alt='${name}' class='card-img' />
          <h2 class='card-titel'>${name.official}</h2>
        </div>
        <p class='card-text'><b>Capital:</b> ${capital}</p>
        <p class='card-text'><b>Population:</b> ${population}</p>
        <p class='card-text'><b>Languages:</b> ${Object.values(languages)}</p>`
  );

  return (refs.countryInfo.innerHTML = markup);
}

function renderCountryList(countries) {
  console.log('countries', countries);

  const markup = countries
    .map(
      ({ name, flags }) =>
        `<div class='card-header'>
          <img src='${flags.svg}' alt='${name}' class='card-img' />
          <h2 class='card-titel'>${name.official}</h2>
      </div>`
    )
    .join('');

  return (refs.countryList.innerHTML = markup);
}
