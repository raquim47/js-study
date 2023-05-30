import { ProjectItem } from './ProjectItem.js';
import { DOMHelper } from '../Utility/DOMHelper.js';
export const a = 12;
export default class ProjectList {
  projects = [];

  constructor(type) {
    this.type = type;
    const projectEls = document.querySelectorAll(`#${type}-projects li`);
    for (const el of projectEls) {
      this.projects.push(
        new ProjectItem(el.id, this.switchProject.bind(this), this.type)
      );
    }
    this.connectDroppable();
  }

  connectDroppable() {
    const listEl = document.querySelector(`#${this.type}-projects ul`);
    // dragenter : 드래그 중인 요소가 드롭 대상 요소의 범위로 처음 진입할 때 한 번만 발생
    // dragover : 드래그 중인 요소가 드롭 대상 요소의 범위 위에서 마우스를 움직일 때마다 계속해서 발생
    listEl.addEventListener('dragenter', (e) => {
      if (e.dataTransfer.types[0] === 'text/plain') {
        listEl.parentElement.classList.add('droppable');
        e.preventDefault();
      }
    });
    listEl.addEventListener('dragover', (e) => {
      // console.log(e.dataTransfer);
      if (e.dataTransfer.types[0] === 'text/plain') {
        e.preventDefault();
      }
    });

    listEl.addEventListener('dragleave', (e) => {
      if (e.relatedTarget.closest(`#${this.type}-projects ul`) !== listEl) {
        listEl.parentElement.classList.remove('droppable');
      }
    });
    listEl.addEventListener('drop', (e) => {
      const dropElId = e.dataTransfer.getData('text/plain');
      if (this.projects.find((p) => p.id === dropElId)) {
        return;
      }

      document
        .getElementById(dropElId)
        .querySelector('button:last-of-type')
        .click();
    });
    listEl.addEventListener('dragend', (e) => {
      listEl.parentElement.classList.remove('droppable');
      // e.preventDefault(); // not required
    });
  }

  addProject(project) {
    this.projects.push(project);
    DOMHelper.moveEl(project.id, `#${this.type}-projects ul`);
    project.updateProject(this.switchProject.bind(this), this.type);
  }

  setSwitchHandler(switchHandler) {
    this.switchHandler = switchHandler;
  }

  switchProject(id) {
    this.switchHandler(this.projects.find((p) => p.id === id));
    this.projects = this.projects.filter((p) => p.id !== id);
  }
}

// export default ProjectList;