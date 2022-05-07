import './style.scss';
import data from './symbols';
import Keys from './Keys';

const createTextarea = () => {
  const textArea = document.createElement('textarea');
  textArea.classList.add('textarea');
  document.body.prepend(textArea);
  return textArea;
};

const generateKeys = () => {
  const keysArr = [];
  data.forEach((el) => {
    keysArr.push(new Keys(el));
  });

  return keysArr;
};

const renderKeys = () => {
  const keyContainer = document.createElement('div');
  keyContainer.classList.add('keyboard');
  generateKeys().forEach((el) => {
    keyContainer.append(el.createdKeys());
  });
  document.body.append(keyContainer);
};
document.addEventListener('DOMContentLoaded', () => {
  if (data) {
    renderKeys();
  }
  createTextarea();

  const keys = document.querySelectorAll('.key');
  document.addEventListener('keydown', (e) => {
    keys.forEach((el) => {
      el.classList.remove('active');
    });
    document.querySelector(`[data-key = ${e.key}]`).classList.add('active');
  });
  keys.forEach((el) => {
    el.addEventListener('click', (e) => {
      if (e !== null && e.target instanceof HTMLElement) {
        keys.forEach((elem) => {
          elem.classList.remove('active');
        });
        document.querySelector(`[data-key = ${e.target.dataset.key}]`).classList.add('active');
        document.querySelector('.textarea').innerHTML += e.target.dataset.key;
      }
    });
  });
});
