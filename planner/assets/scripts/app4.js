class DOMHelper {
  static clearEventListner(el) {
    const cloneEl = el.cloneNode(true);
    el.replaceWith(cloneEl);
    return cloneEl;
  }

  static moveEl(elId, targetId) {
    const el = document.getElementById(elId);
    const targetEl = document.querySelector(targetId);
    targetEl.append(el);
  }
}

class Component {
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
  }
}

class Tooltip extends Component {
  constructor(closeNotifier) {
    super();
    this.closeNotifier = closeNotifier;
    this.create();
  }

  closeTooltip = () => {
    this.detach();
    this.closeNotifier();
  };

  create() {
    const el = document.createElement('div');
    el.className = 'card';
    el.textContent = 'tooltip';
    el.addEventListener('click', this.closeTooltip);
    this.el = el;
  }
}

class Project {
  isOpenTooltip = false;

  constructor(id, switchProject, type) {
    this.id = id;
    this.switchProject = switchProject;
    this.connectMoreInfoBtn();
    this.connectSwitchBtn(type);
  }

  openTooltip() {
    if (this.isOpenTooltip) return;

    const tooltip = new Tooltip(() => (this.isOpenTooltip = false));
    tooltip.attach();
    this.isOpenTooltip = true;
  }

  connectMoreInfoBtn() {
    const projectEl = document.getElementById(this.id);
    const btnEl = projectEl.querySelector('button:first-of-type');
    btnEl.addEventListener('click', this.openTooltip);
  }

  connectSwitchBtn(type) {
    const projectEl = document.getElementById(this.id);
    let btn = projectEl.querySelector('button:last-of-type');
    btn = DOMHelper.clearEventListner(btn);
    btn.textContent = type === 'active' ? 'Finish' : 'Activate';
    btn.addEventListener('click', () => this.switchProject(this.id));
  }

  updateProject(switchProject, type) {
    this.switchProject = switchProject;
    this.connectSwitchBtn(type);
  }
}

class ProjectList {
  projects = [];

  constructor(type) {
    this.type = type;
    const projectEls = document.querySelectorAll(`#${type}-projects li`);
    for (const el of projectEls) {
      this.projects.push(
        new Project(el.id, this.switchProject.bind(this), this.type)
      );
    }
  }

  addProject(project) {
    this.projects.push(project);
    DOMHelper.moveEl(project.id, `#${this.type}-projects ul`);
    project.updateProject(this.switchProject.bind(this), this.type);
  }

  setSwitchHandler (switchHandler){
    this.switchHandler = switchHandler;
  }

  switchProject(id){
    this.switchHandler(this.projects.find(p => p.id === id));
    this.projects = this.projects.filter(p => p.id !== id)
  }
}

class App {
  static init(){
    const activeList = new ProjectList('active')
    const finishedList = new ProjectList('finished')
    activeList.setSwitchHandler(finishedList.addProject.bind(finishedList));
    finishedList.setSwitchHandler(activeList.addProject.bind(activeList));
  }
}

App.init();