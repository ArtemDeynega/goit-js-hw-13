import './sass/main.scss';

import { getImages } from './utils/getimages';

console.log(getImages('cat', 1).then(response => console.log(response.hits)));
