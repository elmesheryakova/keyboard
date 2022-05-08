export default class Keys {
  constructor({ key, code, caps }) {
    this.key = key;
    this.code = code;
    this.caps = caps;
  }

  createdKeys() {
    const key = document.createElement('div');
    key.classList.add('key');
    key.setAttribute('data-key', this.code);
    if (this.caps) {
      key.setAttribute('data-caps', this.caps);
    }
    key.innerHTML = `
    ${this.key}
    `;

    return key;
  }
}
