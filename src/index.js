import './sass/main.scss';
import { searchForm, searchInput, gallery, moreButton } from './utils/refs';
import { getImages } from './utils/getimages';
import gelleryTemplates from './templates/gelleryTemplates.hbs';

let inputValue = '';
let pageCounter = 1;

async function createMerkup(evt) {
  evt.preventDefault();

  getImages(inputValue, pageCounter).then(res => (gallery.innerHTML = gelleryTemplates(res)));

  pageCounter = 1;
  if (!inputValue) {
    moreButton.classList.remove('visible-button');
  }
}

searchInput.addEventListener('input', ({ currentTarget }) => {
  inputValue = currentTarget.value.trim();
});

moreButton.addEventListener('click', () => {
  pageCounter += 1;

  getImages(inputValue, pageCounter).then(res =>
    gallery.insertAdjacentHTML('beforeend', gelleryTemplates(res)),
  );
});

searchForm.addEventListener('submit', createMerkup);
