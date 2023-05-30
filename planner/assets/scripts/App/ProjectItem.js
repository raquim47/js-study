import { DOMHelper } from '../Utility/DOMHelper.js';

export class ProjectItem {
  isOpenTooltip = false;

  constructor(id, switchProject, type) {
    this.id = id;
    this.switchProject = switchProject;
    this.addInfoBtn();
    this.addSwitchBtn(type);
    this.connectDrag();
  }

  openTooltip() {
    if (this.isOpenTooltip) return;

    const projectEl = document.getElementById(this.id);
    const tooltipText = projectEl.dataset.extraInfo;
    import('./Tooltip.js').then((module) => {
      const tooltip = new module.Tooltip(
        () => (this.isOpenTooltip = false),
        tooltipText,
        this.id
      );
      tooltip.attach();
      this.isOpenTooltip = true;
    });
  }

  connectDrag() {
    const item = document.getElementById(this.id);
    item.addEventListener('dragstart', (e) => {
      // 드롭시 (dragenter, dragover) 'text/plain'으로 설정한 데이터만 받을 수 있도록
      e.dataTransfer.setData('text/plain', this.id);
      e.dataTransfer.effectAllowed = 'move';

      const clone = item.cloneNode(true);
      clone.style.position = 'absolute';
      clone.style.width = '300px';
      clone.style.top = '-9999px';
      document.body.appendChild(clone);

      e.dataTransfer.setDragImage(clone, 0, 0);
      setTimeout(() => document.body.removeChild(clone), 0);
    });
  }

  addInfoBtn() {
    const ProjectEl = document.getElementById(this.id);
    const btnEl = ProjectEl.querySelector('button:first-of-type');
    btnEl.addEventListener('click', this.openTooltip.bind(this));
  }

  addSwitchBtn(type) {
    const projectEl = document.getElementById(this.id);
    let btnEl = projectEl.querySelector('button:last-of-type');
    btnEl = DOMHelper.clearEventListner(btnEl);
    btnEl.textContent = type === 'active' ? 'Finish' : 'Activate';
    btnEl.addEventListener('click', () => this.switchProject(this.id));
  }

  updateProject(switchProject, type) {
    this.switchProject = switchProject;
    this.addSwitchBtn(type);
  }
}
