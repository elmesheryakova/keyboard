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
  let flagShift = false;
  let flagLang = false;
  const shifts = document.querySelectorAll('[data-shift]');
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
        if (value === 'Shift' || value === 'SHIFT') value = '';
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

  const clickTab = () => {
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
  };
  const clickBackspace = () => {
    const cursorPosition = text.selectionStart;
    if (cursorPosition !== 0) {
      text.value = `${text.value.slice(0, text.selectionStart - 1)} ${text.value.slice(text.selectionStart, text.value.length)}`;
      text.setSelectionRange(cursorPosition - 1, cursorPosition - 1);
    }
  };
  const clickSpace = () => {
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
  };
  const clickDelete = () => {
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
  };
  const clickEnter = () => {
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
  };
  const clickArrowLeft = () => {
    const start = text.selectionStart;
    if (start !== 0) {
      text.selectionEnd = start - 1;
      text.selectionStart = start - 1;
    }
  };
  const clickArrowRight = () => {
    const start = text.selectionStart;
    text.selectionEnd = start + 1;
    text.selectionStart = start + 1;
  };
  const clickArrowUp = () => {
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
  };
  const clickArrowDown = () => {
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
  };
  const clickCapsLock = () => {
    if (localStorage.getItem('caps') === 'ok') {
      localStorage.removeItem('caps');
      capsClick(localStorage.getItem('caps'));
    } else {
      localStorage.setItem('caps', 'ok');
      capsClick(localStorage.getItem('caps'));
    }
  };
  document.addEventListener('keydown', (e) => {
    e.preventDefault();
    if (e.key === 'Alt' || e.key === 'Tab' || e.code === 'Space'
    || e.code === 'Backspace' || e.code === 'Delete' || e.code === 'Enter' || e.code === 'ArrowLeft'
    || e.code === 'ArrowRight' || e.code === 'ArrowUp' || e.code === 'ArrowDown'
    || e.code === 'CapsLock' || e.code === 'MetaLeft' || e.code === 'ShiftLeft' || e.code === 'ShiftRight'
    || e.code === 'ControlLeft' || e.code === 'ControlRight') {
      text.value += '';
    } else {
      keys.forEach((el) => {
        if (e.code === el.dataset.key) {
          text.value += el.innerHTML.trim();
        }
      });
    }

    localStorage.setItem('text', text.value);
    if (e.key === 'Alt') {
      e.preventDefault();
    }
    if (e.key === 'Tab') {
      e.preventDefault();
      clickTab();
    }
    if (e.code === 'Space') {
      clickSpace();
    }
    if (e.code === 'Backspace') {
      clickBackspace();
    }
    if (e.code === 'Delete') {
      clickDelete();
    }
    if (e.code === 'Enter') {
      clickEnter();
    }
    if (e.code === 'ArrowLeft') {
      clickArrowLeft();
    }
    if (e.code === 'ArrowRight') {
      clickArrowRight();
    }
    if (e.code === 'ArrowUp') {
      clickArrowUp();
    }
    if (e.code === 'ArrowDown') {
      clickArrowDown();
    }
    if (e.code === 'CapsLock') {
      clickCapsLock();
    }
    if (e.code === 'MetaLeft') {
      metaImg();
    }
    if (keys) {
      keys.forEach((el) => {
        el.classList.remove('active');
      });
    }
    if (document.querySelector(`[data-key = ${e.code}]`)) {
      document.querySelector(`[data-key = ${e.code}]`).classList.add('active');
    }

    if (e.code === 'ShiftLeft') flagLang = true;
    if (e.code === 'AltLeft' && flagLang) {
      flagLang = false;
      localStorageSave();
    }
    if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') flagShift = true;
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
      if (e.target.dataset.key === 'ShiftLeft') flagLang = true;
      if (e.target.dataset.key === 'AltLeft' && flagLang) {
        flagLang = false;
        localStorageSave();
      }
      if (e.target.dataset.key === 'ShiftLeft' || e.target.dataset.key === 'ShiftRight') flagShift = true;
      if (shifts) {
        for (let i = 0; i < shifts.length; i += 1) {
          if (flagShift) {
            shifts[i].innerHTML = shifts[i].dataset.shift;
          }
        }
      }
      if (e.target.dataset.key === 'Space') {
        clickSpace();
      }
      if (e.target.dataset.key === 'Tab') {
        clickTab();
      }
      if (e.target.dataset.key === 'Backspace') {
        clickBackspace();
      }
      if (e.target.dataset.key === 'Delete') {
        clickDelete();
      }
      if (e.target.dataset.key === 'Enter') {
        clickEnter();
      }
      if (e.target.dataset.key === 'ArrowLeft') {
        clickArrowLeft();
      }
      if (e.target.dataset.key === 'ArrowRight') {
        clickArrowRight();
      }
      if (e.target.dataset.key === 'ArrowUp') {
        clickArrowUp();
      }
      if (e.target.dataset.key === 'ArrowDown') {
        clickArrowDown();
      }
      if (e.target.dataset.key === 'CapsLock') {
        clickCapsLock();
      }

      if (e.target.dataset.key === 'MetaLeft') {
        metaImg();
      }
    }
  });
  document.addEventListener('mouseup', () => {
    localStorage.setItem('text', text.value);
    if (flagShift) {
      flagShift = false;
      setTimeout(() => {
        for (let i = 0; i < shifts.length; i += 1) {
          shifts[i].innerHTML = shifts[i].dataset.current;
        }
      }, 1200);
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
