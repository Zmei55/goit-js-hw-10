import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const refs = {
  countryInfo: document.querySelector('.country-info'),
  countryList: document.querySelector('.country-list'),
  inputRef: document.querySelector('#search-box'),
};

refs.inputRef.addEventListener('input', debounce(fetchCountries, DEBOUNCE_DELAY));

function fetchCountries(name) {
  name.preventDefault();

  const countryToFind = name.target.value.trim();

  fetch(
    `https://restcountries.com/v3.1/name/${countryToFind}?fields=name,capital,population,languages,flags`
  )
    .then(r => {
      if (!r.ok) {
        throw Error();
      }

      return r.json();
    })
    .then(countries => {
      if (refs.inputRef.value === '') {
        refs.countryList.innerHTML = '';
        refs.countryInfo.innerHTML = '';
      }
      if (countries.length > 10) {
        Notiflix.Notify.success('Too many matches found. Please enter a more specific name.');
      }
      if (countries.length >= 2 && countries.length <= 10) {
        renderCountryList(countries);
        refs.countryInfo.innerHTML = '';
      }
      if (countries.length === 1) {
        renderCountryInfo(countries);
        refs.countryList.innerHTML = '';
      }
    })
    .catch(error => {
      onFeachError();
      refs.countryList.innerHTML = '';
      refs.countryInfo.innerHTML = '';
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

function onFeachError() {
  Notiflix.Notify.failure('Oops, there is no country with that name');
}
