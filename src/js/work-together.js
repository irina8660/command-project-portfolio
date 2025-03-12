import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import sprite from '../images/sprite.svg';

const refs = {
  form: document.querySelector('.js-form'),
  emailInput: document.querySelector('.js-email'),
  commentInput: document.querySelector('.js-comment'),
  successMessage: document.querySelector('.js-success-message'),
  errorMessage: document.querySelector('.js-error-message'),
  modalBackdrop: document.querySelector('.js-modal-backdrop'),
  modalWindow: document.querySelector('.js-modal-window'),
  closeModalButton: document.querySelector('.js-modal-close-button'),
};

refs.form.addEventListener('input', handleFormInput);
refs.form.addEventListener('submit', handleFormSubmit);
refs.emailInput.addEventListener('input', handleEmailInput);
refs.commentInput.addEventListener('input', handleCommentInput);
refs.commentInput.addEventListener('blur', formatCommentBlur);
refs.commentInput.addEventListener('focus', formatCommentText);

window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    refs.commentInput.value = fullCommentText;
    formatCommentBlur();
  }, 0);
});

refs.modalWindow.addEventListener('click', event => {
  if (event.target.closest('.js-modal-close-button')) {
    closeModal();
  }
});

refs.modalBackdrop.addEventListener('click', event => {
  if (event.target === event.currentTarget) {
    closeModal();
  }
});

document.addEventListener('DOMContentLoaded', () => {
  initPage();
  formatCommentBlur();
});

let resizeTimeout;
const minCommentLength = 2;
const FORM_STORAGE_KEY = 'form-storage-key';
let fullCommentText = loadFromLS(FORM_STORAGE_KEY)?.comment || '';

function handleFormInput(event) {
  const email = event.currentTarget.elements['user-email'].value.trim();
  const comment = event.currentTarget.elements['user-comment'].value.trim();

  const userData = { email, comment };
  saveToLS(FORM_STORAGE_KEY, userData);
}

function initPage() {
  const formData = loadFromLS(FORM_STORAGE_KEY);
  refs.form.elements['user-email'].value = formData?.email || '';
  refs.form.elements['user-comment'].value = formData?.comment || '';
  fullCommentText = formData?.comment || '';
}

async function handleFormSubmit(event) {
  event.preventDefault();

  const email = event.target.elements['user-email'].value.trim();
  const comment = event.target.elements['user-comment'].value.trim();

  if (!email || !comment) {
    iziToast.error({
      position: 'topRight',
      message: 'Please complete the field',
    });
    return;
  }

  const userData = {
    email: email,
    comment: fullCommentText,
  };

  try {
    const data = await createMassage(userData);
    const markup = renderModalContent(data);
    refs.modalWindow.innerHTML = markup;

    if (data) {
      hideSuccessMessage();
      hideErrorMessage();

      openModal();
      event.target.reset();
      localStorage.removeItem(FORM_STORAGE_KEY);
      fullCommentText = '';
    }
  } catch (error) {
    iziToast.error({
      position: 'topRight',
      message: 'Something went wrong. Please, try again',
    });
    console.log(error);
  }
}

function handleEmailInput() {
  const emailInput = this.value;
  const inputPattern = this.getAttribute('pattern');
  const validPattern = new RegExp(inputPattern);
  const isValid = validPattern.test(this.value);

  if (emailInput.length === 0) {
    hideSuccessMessage();
    hideErrorMessage();

    hideEmailSuccessBorder();
    hideEmailErrorBorder();
    return;
  }
  if (!isValid) {
    hideSuccessMessage();
    showErrorMessage();
  } else {
    showSuccessMessage();
    hideErrorMessage();
  }
}

function handleCommentInput() {
  fullCommentText = refs.commentInput.value.trim();

  if (fullCommentText.length === 0) {
    hideCommentSuccessBorder();
    hideCommentErrorBorder();
    return;
  }

  if (fullCommentText.length < minCommentLength) {
    showCommentErrorBorder();
  } else {
    hideCommentErrorBorder();
    showCommentSuccessBorder();
  }
}

async function createMassage({ email, comment }) {
  const url = 'https://portfolio-js.b.goit.study/api/requests';

  const params = {
    email: email,
    comment: comment,
  };

  try {
    const response = await axios.post(url, params);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

function saveToLS(key, value) {
  const jsonValue = JSON.stringify(value);
  localStorage.setItem(key, jsonValue);
}

function loadFromLS(key) {
  const data = localStorage.getItem(key);

  try {
    const parseData = JSON.parse(data);
    return parseData;
  } catch {
    return data;
  }
}

function openModal() {
  refs.modalBackdrop.classList.add('is-open');
  document.addEventListener('keydown', onEscapePress);
  disableScroll();

  hideEmailSuccessBorder();
  hideCommentSuccessBorder();
}

function closeModal() {
  refs.modalBackdrop.classList.remove('is-open');
  document.removeEventListener('keydown', onEscapePress);
  enableScroll();
}

function onEscapePress(event) {
  if (event.key === 'Escape') {
    closeModal();
  }
}

function disableScroll() {
  const windowWidth = window.innerWidth;
  const scrollWidth = document.documentElement.clientWidth;

  const scrollBarWidth = windowWidth - scrollWidth;

  document.body.style.paddingRight = `${scrollBarWidth}px`;
  document.body.style.overflow = 'hidden';
}

function enableScroll() {
  document.body.style.paddingRight = '';
  document.body.style.overflow = '';
}

function showSuccessMessage() {
  refs.successMessage.classList.remove('fade-out');
  refs.successMessage.classList.add('fade-in');
  showEmailSuccessBorder();
}

function hideSuccessMessage() {
  refs.successMessage.classList.remove('fade-in');
  refs.successMessage.classList.add('fade-out');
  hideEmailSuccessBorder();
}

function showErrorMessage() {
  refs.errorMessage.classList.remove('fade-out');
  refs.errorMessage.classList.add('fade-in');
  showEmailErrorBorder();
}

function hideErrorMessage() {
  refs.errorMessage.classList.remove('fade-in');
  refs.errorMessage.classList.add('fade-out');
  hideEmailErrorBorder();
  showEmailSuccessBorder();
}

function showEmailSuccessBorder() {
  refs.emailInput.style.borderColor = '#3cbc81';
}

function hideEmailSuccessBorder() {
  refs.emailInput.style.borderColor = '';
}

function showEmailErrorBorder() {
  refs.emailInput.style.borderColor = '#e74a3b';
}

function hideEmailErrorBorder() {
  refs.emailInput.style.borderColor = '';
}

function showCommentSuccessBorder() {
  refs.commentInput.style.borderColor = '#3cbc81';
}

function hideCommentSuccessBorder() {
  refs.commentInput.style.borderColor = '';
}

function showCommentErrorBorder() {
  refs.commentInput.style.borderColor = '#e74a3b';
}

function hideCommentErrorBorder() {
  refs.commentInput.style.borderColor = '';
}

function getTextWidth(text, font) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  ctx.font = font;
  return ctx.measureText(text).width;
}

function formatCommentBlur() {
  const commentInput = refs.commentInput;

  if (!commentInput) return;
  if (commentInput.offsetWidth === 0) return;

  const inputWidth = commentInput.getBoundingClientRect().width;
  const computedStyle = window.getComputedStyle(commentInput);

  const fontWeight = computedStyle.fontWeight;
  const fontSize = computedStyle.fontSize;
  const fontFamily = computedStyle.fontFamily;

  const font = `${fontWeight} ${fontSize} ${fontFamily}`;
  let textWidth = getTextWidth(commentInput.value.trim(), font);

  const inputPadding = 12;

  if (textWidth > inputWidth - inputPadding) {
    let truncatedText = refs.commentInput.value.trim();

    while (
      getTextWidth(truncatedText + '...', font) > inputWidth - inputPadding &&
      truncatedText.length > 0
    ) {
      truncatedText = truncatedText.slice(0, -1);
    }

    refs.commentInput.value = truncatedText + '...';
  } else {
    refs.commentInput.value = fullCommentText;
  }
}

function formatCommentText() {
  if (!refs.commentInput.value) return;
  refs.commentInput.value = fullCommentText;
}

function renderModalContent({ title, message }) {
  return `<button class="modal-close-button js-modal-close-button" type="submit">
            <svg class="icon-modal-close" width="24" height="24">
                 <use xlink:href="${sprite}#x"></use>
            </svg>
        </button>
        <h2 class="modal-title">${title}</h2>
        <p class="modal-text">${message}</p>`;
}
