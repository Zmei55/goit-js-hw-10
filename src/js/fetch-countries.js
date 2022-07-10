const BASE_URL = 'https://restcountries.com/v3.1';

function fetchCountry(countryToFind) {
  return fetch(
    `${BASE_URL}/name/${countryToFind}?fields=name,capital,population,languages,flags`
  ).then(r => {
    if (!r.ok) {
      throw Error();
    }

    return r.json();
  });
}

export default { fetchCountry };

// .then(r => {
//   if (r.ok) {
//       return r.json();
//     }

//     throw new Error(r.statusText);
//   });
