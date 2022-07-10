import './css/styles.css';
import getRefs from './js/refs';
import API from './js/fetch-countries';
import debounce from 'lodash.debounce';
import { clearCountryInfo, clearCountryList } from './js/clear-countries-html';
import { renderCountryInfo, renderCountryList } from './js/render-html';
import { onFeachError } from './js/errors';
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
        clearCountryList();
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
