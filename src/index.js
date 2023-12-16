import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import axios from 'axios';
import Notiflix from 'notiflix';

axios.defaults.headers.common['x-api-key'] =
  'live_WagMdIF7ZqVDncxD6bHPhxwDmM67WgiT7CsuNKWmlnzLqGnoJvt9wMlAt3OTqqAR';
  axios.defaults.baseURL='https://api.thecatapi.com/v1';

const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');
/** @type {HTMLScriptElement | null} */

breedSelect.style.display = 'none';

function fetchBreeds(){
    return axios.get('/breeds') .then(({ data }) => data);
}

function fetchCatByBreed(breedId){
    return axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`).then(({data}) => data);
}

fetchBreeds().then((data) => {
    const html = data.map((breed) => `<option value="${breedId}">${breed.name}<option>`);
    breeds.innerHTML = html;
});

breeds.addEventListener('select', (event) => {
    const breed = event.target.value;
    fetchCatByBreed(breed).then((cat) => {
        catInfo.innerHTML = JSON.stringify(cat);
    })
});