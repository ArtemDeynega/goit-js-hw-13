import { moreButton } from './refs';
import axios from 'axios';
import { Notify } from 'notiflix';

axios.defaults.baseURL = 'https://pixabay.com/api/';

const KEY = '?key=23008045-07b9dd7ada273e1818ae76f5a&';
const IMAGE_TYPE = 'image_type=photo&';
const ORIENTAL = 'oriental=horizontal&';
const SAFESEARCH = 'safesearch=true&';
const PER_PAGE = 'per_page=40&';
const PAGE = 'page=';

const DELAY = 500;

async function getImages(stringQuety, pageNum) {
  try {
    if (stringQuety) {
      const { data: photos } = await axios.get(
        `${KEY}q=${stringQuety}&image_type=photo&oriental=horizontal&safesearch=true&per_page=40&page=${pageNum}`,
      );
      if (stringQuety && photos.totalHits > 0) {
        setTimeout(() => {
          moreButton.classList.add('visible-button');
        }, DELAY);
      }
      if (!photos.total) {
        Notify.failure('Sorry, there are no images matching your search query. Please try again.');
      } else if (pageNum === 1) {
        Notify.success(`Hooray! We found totalHits images ${photos.totalHits}`);
      }
      return photos;
    }
  } catch {
    Notify.info('Sorry, there are no images matching your search query. Please try again.');
  }
}

export { getImages };
