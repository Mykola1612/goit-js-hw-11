import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { createCard, createCardMore } from './JS/create-cards';
import { fetchBreeds } from './JS/http-request';
import { refs } from './JS/refs';
// Описаний в документації
import SimpleLightbox from 'simplelightbox';
// Додатковий імпорт стилів
import 'simplelightbox/dist/simple-lightbox.min.css';

const { searchQuery } = refs.searchForm.elements;

let searchQueryLocal = '';
let page = 1;
let currentHits = 0;
let per_page = 40;

refs.searchForm.addEventListener('submit', onSearchFormSubmit);
refs.loadMore.addEventListener('click', onLoadMoreClick);

function onSearchFormSubmit(e) {
  e.preventDefault();

  searchQueryLocal = e.currentTarget.elements.searchQuery.value;
  page = 1;

  fetchBreeds(searchQueryLocal, page)
    .then(({ hits, totalHits }) => {
      currentHits = totalHits;
      const lightbox = new SimpleLightbox('.gallery a');
      if (page === 1) {
        createCard(hits);
        refs.loadMore.classList.remove('load-more');
        lightbox;
      }
      createCardMore(hits);
      lightbox.refresh();
    })
    .catch(err => {
      console.log(err);
      refs.gallery.innerHTML = '';
      searchQuery.value = '';
      refs.loadMore.classList.add('load-more');
    });
}

function onLoadMoreClick() {
  page += 1;

  if (page > Math.ceil(currentHits / per_page)) {
    refs.loadMore.classList.add('load-more');
    Notify.warning(
      "We're sorry, but you've reached the end of search results."
    );
    return;
  }
  fetchBreeds(searchQueryLocal, page)
    .then(({ hits, totalHits }) => {
      currentHits = totalHits;
      const lightbox = new SimpleLightbox('.gallery a');
      if (page === 1) {
        createCard(hits);
        lightbox;
      }
      createCardMore(hits);
      lightbox.refresh();
    })
    .catch(err => {
      console.log(err);
      refs.gallery.innerHTML = '';
      searchQuery.value = '';
      refs.loadMore.classList.add('load-more');
    });
}
