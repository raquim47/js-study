import { Component } from './Component.js';

export class Tooltip extends Component {
  constructor(closeNotifier, text, hostElId) {
    super(hostElId);
    this.closeNotifier = closeNotifier;
    this.text = text;
    this.create();
  }

  closeTooltip = () => {
    this.detach();
    this.closeNotifier();
  };

  create() {
    const el = document.createElement('div');
    el.className = 'card';
    const tooltipTemplate = document.getElementById('tooltip');
    const tooltipBody = document.importNode(tooltipTemplate.content, true);
    tooltipBody.querySelector('p').textContent = this.text;
    el.append(tooltipBody);

    this.hostEl.style.position = 'relative';
    el.style.position = 'absolute';
    el.style.zIndex = 100;
    el.style.top = 'calc(100% - 10px)';
    el.addEventListener('click', this.closeTooltip);
    this.el = el;
  }
}
