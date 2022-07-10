import getRefs from './refs';

const refs = getRefs();

function clearCountryList() {
  refs.countryList.innerHTML = '';
}

function clearCountryInfo() {
  refs.countryInfo.innerHTML = '';
}

export { clearCountryInfo, clearCountryList };
