export default class Keys {
  constructor({ key }) {
    this.key = key;
  }

  createdKeys() {
    const key = document.createElement('div');
    key.classList.add('key');
    key.setAttribute('data-key', this.key);
    key.innerHTML = `
    ${this.key}
    `;

    return key;
  }
}
