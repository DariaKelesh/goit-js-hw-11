import axios from "axios";
import { Notify } from 'notiflix/build/notiflix-notify-aio';


const KEY = "29175457-ea8e2c93dbfac842acac0bec2";
const URL = `https://pixabay.com/api/?${KEY}&q=${q}&image_type=photo&orientation=horizontal&safesearch=true`;

// разобраться с q!!!

// https://pixabay.com/api/?key=29175457-ea8e2c93dbfac842acac0bec2&q=yellow+flowers&image_type=photo


// key - твой уникальный ключ доступа к API.
// q - термин для поиска. То, что будет вводить пользователь.
// image_type - тип изображения. Мы хотим только фотографии, поэтому задай значение photo.
// orientation - ориентация фотографии. Задай значение horizontal.
// safesearch - фильтр по возрасту. Задай значение true.