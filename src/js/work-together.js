import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const refs = {
  form: document.querySelector('.js-form'),
  emailInput: document.querySelector('.js-email'),
  commentInput: document.querySelector('.js-comment'),
  successMessage: document.querySelector('.js-success-message'),
  errorMessage: document.querySelector('.js-error-message'),
};
