import './css/styles.css';
import countryInfoTpl from './templates/country-info.hbs';
// import countryListTpl from './templates/country-list.hbs';
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
    // countrys.map(c => renderCountryInfo(c));
    countrys.map(({ languages }) => console.log(languages));
  })
  .catch(error => console.log(error));

function renderCountryInfo(country) {
  const markup = countryInfoTpl(country);
  refs.countryInfo.innerHTML = markup;
}
