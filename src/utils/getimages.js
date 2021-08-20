import { loadMoreBtn } from './refs';
import axios from 'axios';
import { Notify } from 'notiflix';

axios.defaults.baseURL = 'https://pixabay.com/api/';

const KEY = '?key=23008045-07b9dd7ada273e1818ae76f5a&';
const IMAGE_TYPE = 'image_type=photo&';
const ORIENTAL = 'oriental=horizontal&';
const SAFESEARCH = 'safesearch=true&';
const PER_PAGE = 'per_page=40&';
const PAGE = 'page=';

const DELAY = 300;

async function getImages(stringQuety, pageNum) {
  try {
    if (stringQuety) {
      const { data: photo } = await axios.get(
        `${KEY}q=${stringQuety}&${IMAGE_TYPE}${ORIENTAL}${SAFESEARCH}${PER_PAGE}${PAGE}${pageNum}`,
      );
      return photo;
    }
    if (stringQuety && photo.totalHits > 0) {
      setTimeout(() => {
        loadMoreBtn.classList.add('visible-button');
      }, DELAY);
    }
    if (!photo.total) {
      Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    } else if (page === 1) {
      Notify.success(`Hooray! We found totalHits images ${photo.totalHits}`);
    }
    return photo;
  } catch {
    Notify.info('Sorry, there are no images matching your search query. Please try again.');
  }
}

export { getImages };
