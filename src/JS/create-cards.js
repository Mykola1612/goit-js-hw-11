import { refs } from './refs';

function createMarkup({
  tags,
  likes,
  views,
  comments,
  downloads,
  webformatURL,
  largeImageURL,
}) {
  return `<div class="photo_card">
  <a href="${largeImageURL}">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" class="photo"/>
  </a>
  <div class="info">
    <p class="info-item">
      <b>Likes</b> ${likes}
    </p>
    <p class="info-item">
      <b>Views</b> ${views}
    </p>
    <p class="info-item">
      <b>Comments</b> ${comments}
    </p>
    <p class="info-item">
      <b>Downloads</b> ${downloads}
    </p>
  </div>
</div>`;
}

export function createCard(products) {
  const markup = products.map(product => createMarkup(product)).join('');
  refs.gallery.innerHTML = markup;
}

export function createCardMore(products) {
  const markup = products.map(product => createMarkup(product)).join('');
  refs.gallery.insertAdjacentHTML('beforeend', markup);
}
