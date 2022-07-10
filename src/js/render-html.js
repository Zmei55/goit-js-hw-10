import getRefs from './refs';

const refs = getRefs();

export const renderCountryInfo = countries => {
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
};

export const renderCountryList = countries => {
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
};
