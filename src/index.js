import { createCard } from './JS/create-cards';
import { fetchBreeds } from './JS/http-request';
import { refs } from './JS/refs';

const { searchQuery } = refs.searchForm.elements;

refs.searchForm.addEventListener('submit', onSearchFormSubmit);
function onSearchFormSubmit(e) {
  e.preventDefault();

  fetchBreeds(searchQuery.value)
    .then(hits => createCard(hits))
    .catch(err => {
      console.log(err);
      refs.gallery.innerHTML = '';
    });
}
