import { Notify } from 'notiflix/build/notiflix-notify-aio';
const { default: axios } = require('axios');

axios.defaults.baseURL = `https://pixabay.com/api/`;

export async function fetchBreeds(q) {
  const {
    data: { hits },
  } = await axios(
    `?key=39488259-261aead24914c58cf003fef3e&q=${q}&image_type=photo&orientation=horizontal&safesearch=true`
  );

  if (hits.length === 0) {
    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  } else {
    return hits;
  }
}
