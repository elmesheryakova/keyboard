import './style.scss';
import eng from './modules/symbols';
import rus from './modules/ru-symbols';
import Keys from './modules/Keys';

const image = require('./assets/image.jpg');

const metaImg = () => {
  const img = document.createElement('div');
  img.classList.add('img');
  img.innerHTML = `<img src="${image}" alt='img'>`;
  document.body.append(img);
  setTimeout(() => {
    img.style.display = 'none';
  }, 2000);
};
const createTemplate = () => {
  const textOS = document.createElement('div');
  textOS.classList.add('textOS');
  textOS.textContent = 'Клавиатура создана в операционной системе Windows';
  document.body.append(textOS);

  const textLang = document.createElement('div');
  textLang.classList.add('textLang');
  textLang.innerHTML = 'Переключения языка происходит клавишами <span> ShiftLeft + AltLeft </span>';
  document.body.append(textLang);
};
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
const wrapper = document.createElement('div');
wrapper.classList.add('wrapper');
document.body.append(wrapper);
const renderKeys = () => {
  const keyContainer = document.createElement('div');
  keyContainer.classList.add('keyboard');
  generateKeys().forEach((el) => {
    keyContainer.append(el.createdKeys());
  });

  wrapper.append(keyContainer);
};
const capsClick = (ls) => {
  const elems = document.querySelectorAll('[data-caps = ok');
  for (let i = 0; i < elems.length; i += 1) {
    if (ls === 'ok') {
      elems[i].textContent = elems[i].textContent.trim().toUpperCase();
    } else {
      elems[i].textContent = elems[i].textContent.trim().toLowerCase();
    }
  }
};
const localStorageSave = () => {
  if (!localStorage.getItem('lang')) localStorage.setItem('lang', 'en');
  if (localStorage.getItem('lang') === 'ru') {
    localStorage.setItem('lang', 'en');
    window.location.reload();
  } else if (localStorage.getItem('lang') === 'en') {
    localStorage.setItem('lang', 'ru');
    window.location.reload();
  }
};

document.addEventListener('DOMContentLoaded', () => {
  if (eng) {
    renderKeys();
  }

  createTemplate();
  createTextarea().focus();
  const text = document.querySelector('.textarea');
  const keys = document.querySelectorAll('.key');

  if (text) {
    text.value = localStorage.getItem('text') || '';
    text.addEventListener('input', () => {
      localStorage.setItem('text', text.value);
    });
  }
  keys.forEach((el) => {
    el.addEventListener('click', (e) => {
      if (e !== null && e.target instanceof HTMLElement) {
        let value = e.target.textContent.trim();
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
        text.value += value;
      }
    });
  });

  let flagShift = false;
  const shifts = document.querySelectorAll('[data-shift]');
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Alt') e.preventDefault();
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = text.selectionStart;
      const end = text.selectionEnd;
      if (start === end) {
        text.value = `${text.value.slice(0, start)}\t${text.value.slice(start)}`;
        text.focus();
        text.selectionStart = start + 1;
        text.selectionEnd = start + 1;
      } else {
        text.value = `${text.value.slice(0, start)}\t${text.value.slice(end)}`;
        text.focus();
        text.selectionStart = start + 1;
        text.selectionEnd = start + 1;
      }
    }

    if (keys) {
      keys.forEach((el) => {
        el.classList.remove('active');
      });
    }
    if (document.querySelector(`[data-key = ${e.code}]`)) {
      document.querySelector(`[data-key = ${e.code}]`).classList.add('active');
    }

    if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') flagShift = true;
    if (e.code === 'AltLeft' && flagShift) {
      flagShift = false;
      localStorageSave();
    }

    if (shifts) {
      for (let i = 0; i < shifts.length; i += 1) {
        if (flagShift) {
          shifts[i].innerHTML = shifts[i].dataset.shift;
        }
      }
    }
  });
  document.addEventListener('keyup', (e) => {
    if ((e.code === 'ShiftLeft' || e.code === 'ShiftRight') && flagShift) {
      flagShift = false;
      for (let i = 0; i < shifts.length; i += 1) {
        shifts[i].innerHTML = shifts[i].dataset.current;
      }
    }
  });
  document.addEventListener('mousedown', (e) => {
    e.preventDefault();

    if (e !== null && e.target instanceof HTMLElement) {
      if (e.target.dataset.key === 'ShiftLeft') flagShift = true;
      if (e.target.dataset.key === 'AltLeft' && flagShift) {
        flagShift = false;
        localStorageSave();
      }
      if (e.target && flagShift) {
        flagShift = false;
        e.target.innerHTML = e.target.innerHTML.trim().toUpperCase();
        setTimeout(() => {
          e.target.innerHTML = e.target.innerHTML.trim().toLowerCase();
        }, 300);
      }

      if (e.target.dataset.key === 'Space') {
        const start = text.selectionStart;
        const end = text.selectionEnd;
        if (start === end) {
          text.value = `${text.value.slice(0, start)} ${text.value.slice(start)}`;
          text.focus();
          text.selectionStart = start + 1;
          text.selectionEnd = start + 1;
        } else {
          text.value = `${text.value.slice(0, start)} ${text.value.slice(end)}`;
          text.focus();
          text.selectionStart = start + 1;
          text.selectionEnd = start + 1;
        }
      }
      if (e.target.dataset.key === 'Tab') {
        const start = text.selectionStart;
        const end = text.selectionEnd;
        if (start === end) {
          text.value = `${text.value.slice(0, start)}\t${text.value.slice(start)}`;
          text.focus();
          text.selectionStart = start + 1;
          text.selectionEnd = start + 1;
        } else {
          text.value = `${text.value.slice(0, start)}\t${text.value.slice(end)}`;
          text.focus();
          text.selectionStart = start + 1;
          text.selectionEnd = start + 1;
        }
      }
      if (e.target.dataset.key === 'Backspace') {
        const cursorPosition = text.selectionStart;
        if (cursorPosition !== 0) {
          text.value = `${text.value.slice(0, text.selectionStart - 1)} ${text.value.slice(text.selectionStart, text.value.length)}`;
          text.setSelectionRange(cursorPosition - 1, cursorPosition - 1);
        }
      }
      if (e.target.dataset.key === 'Delete') {
        const start = text.selectionStart;
        const end = text.selectionEnd;
        const currentText = start === end
          ? text.value.substring(0, start)
          + text.value.substring(end + 1)
          : text.value.substring(0, start)
          + text.value.substring(end);

        text.value = currentText;
        text.focus();
        text.selectionEnd = start;
        text.selectionStart = start;
      }
      if (e.target.dataset.key === 'Enter') {
        const start = text.selectionStart;
        const end = text.selectionEnd;
        const currentText = `${text.value.substring(
          0,
          start,
        )}\n${text.value.substring(end)}`;
        text.value = currentText;
        text.focus();
        const newEnd = text.selectionEnd;
        text.selectionEnd = newEnd - text.value.substring(end).length + 1;
        text.selectionStart = newEnd - text.value.substring(end).length + 1;
      }
      if (e.target.dataset.key === 'ArrowLeft') {
        const start = text.selectionStart;
        if (start !== 0) {
          text.selectionEnd = start - 1;
          text.selectionStart = start - 1;
        }
      }
      if (e.target.dataset.key === 'ArrowRight') {
        const start = text.selectionStart;
        text.selectionEnd = start + 1;
        text.selectionStart = start + 1;
      }
      if (e.target.dataset.key === 'ArrowUp') {
        const start = text.selectionStart;
        let position;
        if (text.value[start] === '\n') { position = text.value.lastIndexOf('\n', start - 1); } else position = text.value.lastIndexOf('\n', start);
        if (position !== -1) {
          const currentStr = start - position;
          const prevPosition = text.value.lastIndexOf('\n', position - 1);
          let prevStr;
          if (prevPosition !== -1) prevStr = position - prevPosition;
          else prevStr = start - currentStr + 1;

          if (currentStr >= prevStr) {
            text.selectionEnd = position;
            text.selectionStart = position;
          } else {
            text.selectionEnd = start - prevStr;
            text.selectionStart = start - prevStr;
          }
        }
      }
      if (e.target.dataset.key === 'ArrowDown') {
        const end = text.selectionEnd;
        let position;
        if (text.value[end] === '\n') { position = text.value.lastIndexOf('\n', end - 1); } else position = text.value.lastIndexOf('\n', end);
        let currentStr;
        let nextStr;
        if (position !== -1) currentStr = end - position;
        else currentStr = end + 1;

        const endCurStrPos = text.value.indexOf('\n', end);
        if (endCurStrPos !== -1) {
          let nextPosition = text.value.indexOf('\n', endCurStrPos + 1);
          if (nextPosition === -1) {
            nextPosition = text.value.length;
          }

          nextStr = nextPosition - endCurStrPos;

          if (currentStr >= nextStr) {
            text.selectionEnd = nextPosition;
            text.selectionStart = nextPosition;
          } else {
            text.selectionEnd = endCurStrPos + currentStr;
            text.selectionStart = endCurStrPos + currentStr;
          }
        }
      }
      if (e.target.dataset.key === 'CapsLock') {
        if (localStorage.getItem('caps') === 'ok') {
          localStorage.removeItem('caps');
          capsClick(localStorage.getItem('caps'));
        } else {
          localStorage.setItem('caps', 'ok');
          capsClick(localStorage.getItem('caps'));
        }
      }

      if (e.target.dataset.key === 'MetaLeft') {
        metaImg();
      }
    }
  });
  document.addEventListener('mousemove', () => {
    localStorage.setItem('text', text.value);
  });
  setInterval(() => {
    keys.forEach((elem) => {
      elem.classList.remove('active');
    });
  }, 500);
});
