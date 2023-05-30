export class Component {
  constructor(hostElId, insertBefore = false) {
    if (hostElId) {
      this.hostEl = document.getElementById(hostElId);
    } else {
      this.hostEl = document.body;
    }
    this.insertBefore = insertBefore;
  }

  detach() {
    if (this.el) this.el.remove();
  }

  attach() {
    this.hostEl.insertAdjacentElement(
      this.insertBefore ? 'afterbegin' : 'beforeend',
      this.el
    );
    this.el.scrollIntoView({ behavior: 'smooth' });
  }
}