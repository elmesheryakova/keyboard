export default class Keys {
  constructor({
    key, code, caps, valueShift,
  }) {
    this.key = key;
    this.code = code;
    this.caps = caps;
    this.valueShift = valueShift;
  }

  createdKeys() {
    const key = document.createElement('div');
    key.classList.add('key');
    key.setAttribute('data-key', this.code);
    if (this.valueShift) {
      key.setAttribute('data-shift', this.valueShift);
    }
    if (this.caps) {
      key.setAttribute('data-caps', this.caps);
    }
    key.innerHTML = `
    ${this.key}
    `;

    return key;
  }
}
