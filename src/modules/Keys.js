export default class Keys {
  constructor({ key, code, valueShift }) {
    this.key = key;
    this.code = code;
    this.valueShift = valueShift;
  }

  createdKeys() {
    const key = document.createElement('div');
    key.classList.add('key');
    key.setAttribute('data-key', this.code);
    key.innerHTML = `
    ${this.key}
    `;

    return key;
  }
}
