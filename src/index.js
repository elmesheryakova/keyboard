import './style.scss';
import eng from './modules/symbols';
import rus from './modules/ru-symbols';
import Keys from './modules/Keys';

const createTextarea = () => {
  const textArea = document.createElement('textarea');
  textArea.classList.add('textarea');
  textArea.focus();
  document.body.prepend(textArea);
  return textArea;
};

const generateKeys = () => {
  const keysArr = [];
  if (localStorage.getItem('lang') === 'ru') {
    rus.forEach((el) => {
      keysArr.push(new Keys(el));
    });
  } else {
    eng.forEach((el) => {
      keysArr.push(new Keys(el));
    });
  }

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

const changeLang = (e) => {
  if (e.code === 'ShiftLeft') {
    document.onkeyup = (event) => {
      if (event.code === 'AltLeft') {
        if (localStorage.getItem('lang') === 'ru') {
          localStorage.setItem('lang', 'en');
          document.body.innerHTML = '';
          createTextarea();
          renderKeys();
        } else if (localStorage.getItem('lang') === 'en') {
          localStorage.setItem('lang', 'ru');
          document.body.innerHTML = '';
          createTextarea();
          renderKeys();
        }
      }
    };
  }
};

document.addEventListener('DOMContentLoaded', () => {
  if (eng) {
    renderKeys();
  }
  createTextarea();

  const keys = document.querySelectorAll('.key');
  document.addEventListener('keydown', (e) => {
    if (keys) {
      keys.forEach((el) => {
        el.classList.remove('active');
      });
    }
    changeLang(e);

    document.querySelector(`[data-key = ${e.code}]`).classList.add('active');
  });

  keys.forEach((el) => {
    el.addEventListener('click', (e) => {
      if (e !== null && e.target instanceof HTMLElement) {
        let value = e.target.textContent.trim();
        const field = document.querySelector('.textarea');
        keys.forEach((elem) => {
          elem.classList.remove('active');
        });
        document.querySelector(`[data-key = ${e.target.dataset.key}]`).classList.add('active');
        if (value === 'Backspace') value = '';
        if (value === 'Tab') value = '';
        if (value === 'Delete') value = '';
        if (value === 'CapsLock') value = '';
        if (value === 'Enter') value = '';
        if (value === 'Shift') value = '';
        if (value === 'Ctrl') value = '';
        if (value === 'WIN') value = '';
        if (value === 'Alt') value = '';
        if (value === '↑') value = '';
        if (value === '←') value = '';
        if (value === '↓') value = '';
        if (value === '→') value = '';
        field.innerHTML += value;
      }
    });
  });
});
