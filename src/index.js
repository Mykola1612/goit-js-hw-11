import { createCard, createCardMore } from './JS/create-cards';
import { fetchBreeds } from './JS/http-request';
import { refs } from './JS/refs';

const { searchQuery } = refs.searchForm.elements;

let searchQueryLocal = '';
let page = 1;

refs.searchForm.addEventListener('submit', onSearchFormSubmit);
refs.loadMore.addEventListener('click', onLoadMoreClick);

function onSearchFormSubmit(e) {
  e.preventDefault();

  searchQueryLocal = e.currentTarget.elements.searchQuery.value;
  page = 1;
  refs.loadMore.classList.remove('load-more');

  fetchBreeds(searchQueryLocal, page)
    .then(hits => createCard(hits))
    .catch(err => {
      console.log(err);
      refs.gallery.innerHTML = '';
      searchQuery.value = '';
      refs.loadMore.classList.add('load-more');
    });
}

function onLoadMoreClick() {
  page += 1;
  refs.loadMore.classList.add('load-more');
  fetchBreeds(searchQueryLocal, page)
    .then(hits => createCardMore(hits))
    .catch(err => {
      console.log(err);
      refs.gallery.innerHTML = '';
      searchQuery.value = '';
      refs.loadMore.classList.add('load-more');
    });
  refs.loadMore.classList.remove('load-more');
}
