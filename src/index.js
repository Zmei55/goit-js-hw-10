import './css/styles.css';
import getRefs from './js/refs';
import API from './js/fetch-countries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const refs = getRefs();

refs.inputRef.addEventListener('input', debounce(fetchCountries, DEBOUNCE_DELAY));

function fetchCountries(name) {
  name.preventDefault();

  const countryToFind = name.target.value.trim();

  API.fetchCountry(countryToFind)
    .then(countries => {
      if (refs.inputRef.value === '') {
        clearCountryList();
        clearCountryInfo();
      }
      if (countries.length > 10) {
        Notiflix.Notify.success('Too many matches found. Please enter a more specific name.');
      }
      if (countries.length >= 2 && countries.length <= 10) {
        renderCountryList(countries);
        clearCountryInfo();
      }
      if (countries.length === 1) {
        renderCountryInfo(countries);
        clearCountryList();
      }
    })
    .catch(error => {
      onFeachError();
      clearCountryList();
      clearCountryInfo();
    });
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

function onFeachError() {
  Notiflix.Notify.failure('Oops, there is no country with that name');
}

function clearCountryList() {
  refs.countryList.innerHTML = '';
}

function clearCountryInfo() {
  refs.countryInfo.innerHTML = '';
}
