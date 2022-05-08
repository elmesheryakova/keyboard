// @ts-nocheck
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

document.addEventListener('DOMContentLoaded', () => {
  if (eng) {
    renderKeys();
  }

  createTextarea().focus();
  const text = document.querySelector('.textarea');
  const keys = document.querySelectorAll('.key');

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
  let flag = false;
  document.addEventListener('keydown', (e) => {
    if (keys) {
      keys.forEach((el) => {
        el.classList.remove('active');
      });
    }

    document.querySelector(`[data-key = ${e.code}]`).classList.add('active');

    if (e.code === 'ShiftLeft') flag = true;
    if (e.code === 'AltLeft' && flag) {
      flag = false;
      if (localStorage.getItem('lang') === 'ru') {
        localStorage.setItem('lang', 'en');
        // renderKeys();
        // console.log(e);
        // window.location.reload();
      } else if (localStorage.getItem('lang') === 'en') {
        localStorage.setItem('lang', 'ru');
        // renderKeys();
        // window.location.reload();
      }
    }
  });
  document.addEventListener('mousedown', (e) => {
    e.preventDefault();

    if (e !== null && e.target instanceof HTMLElement) {
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
    }
  });
});
