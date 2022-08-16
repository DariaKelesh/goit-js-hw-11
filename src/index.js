import { fetchImages } from './js/fetchApi.js';
import { renderGallery } from './js/render.js';
import { onScroll, onToTopBtn } from './js/scroll.js';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const searchForm = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.button--loadMore');
let query = '';
let page = 1;
let simpleLightBox;
const perPage = 40;

searchForm.addEventListener('submit', onSearchForm);
loadMoreBtn.addEventListener('click', onLoadMoreBtn);

onScroll();
onToTopBtn();

function onSearchForm(e) {
  e.preventDefault();
  window.scrollTo({ top: 0 });
  page = 1;
  query = e.currentTarget.searchQuery.value.trim();
  gallery.innerHTML = '';
  loadMoreBtn.classList.add('is-hidden');

  if (query === '') {
    Notify.failure(
      'The search string cannot be empty. Please specify your search query.'
    );
    return;
  }

  fetchImages(query, page, perPage)
    .then(({ data }) => {
      if (data.totalHits === 0) {
        Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      } else {
        renderGallery(data.hits);
        simpleLightBox = new SimpleLightbox('.gallery a').refresh();

        Notify.success(`Hooray! We found ${data.totalHits} images.`);

        if (data.totalHits > perPage) {
          loadMoreBtn.classList.remove('is-hidden');
        }
      }
    })
    .catch(error => console.log(error));

  searchForm.reset();
}

function onLoadMoreBtn() {
  page += 1;
  simpleLightBox.destroy();

  fetchImages(query, page, perPage)
    .then(({ data }) => {
      renderGallery(data.hits);
      simpleLightBox = new SimpleLightbox('.gallery a').refresh();

      const totalPages = Math.ceil(data.totalHits / perPage);

      if (page >= totalPages) {
        loadMoreBtn.classList.add('is-hidden');

        Notify.failure(
          "We're sorry, but you've reached the end of search results."
        );
      }
    })
    .catch(error => console.log(error));
}

searchForm.reset();