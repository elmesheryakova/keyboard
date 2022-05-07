import symbols from './symbols';
import Keys from './Keys';

const generateKeys = () => {
  const keysArr = [];
  symbols.forEach((el) => {
    keysArr.push(new Keys(el));
  });
  return keysArr;
};
const renderKeys = () => {
  const keyContainer = document.createElement('div');
  keyContainer.classList.add('keyboard');
  generateKeys().forEach((el) => {
    keyContainer.append(String.fromCharCode(el.charcode));
  });
  document.body.append(keyContainer);
};
document.addEventListener('DOMContentLoaded', () => {
  if (symbols) {
    generateKeys();
    renderKeys();
  }
});
