import Notiflix from 'notiflix';

export function onFeachError() {
  Notiflix.Notify.failure('Oops, there is no country with that name');
}
