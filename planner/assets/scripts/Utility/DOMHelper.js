export class DOMHelper {
  static clearEventListner(el) {
    const cloneEl = el.cloneNode(true);
    el.replaceWith(cloneEl);
    return cloneEl;
  }

  static moveEl(elId, targetId) {
    const el = document.getElementById(elId);
    const targetEl = document.querySelector(targetId);
    targetEl.append(el);
    el.scrollIntoView({ behavior: 'smooth' });
  }
}