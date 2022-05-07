export default class Keys {
  constructor({ charcode }) {
    this.charcode = charcode;
  }

  createdKeys() {
    const key = document.createElement('div');
    key.classList.add('key');
    key.innerHTML = `
    ${String.fromCharCode(this.charcode)}
    `;

    return key;
  }
}
