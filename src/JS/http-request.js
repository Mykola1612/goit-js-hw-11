import { Notify } from 'notiflix/build/notiflix-notify-aio';
const { default: axios } = require('axios');

axios.defaults.baseURL = `https://pixabay.com/api/`;

export async function fetchBreeds(q, page) {
  const {
    data: { hits, totalHits },
  } = await axios(
    `?key=39488259-261aead24914c58cf003fef3e&q=${q}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`
  );

  if (hits.length === 0) {
    console.log(totalHits);
    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  } else {
    return { hits: hits, totalHits: totalHits };
  }
}
