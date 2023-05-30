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
    el.scrollIntoView({ behavior: 'smooth' });
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
    this.el.scrollIntoView({ behavior: 'smooth' });
  }
}

class Tooltip extends Component {
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

    // tooltipBody.querySelector('p').scrollIntoView({ behavior: 'smooth' });
    // const hostElPosLeft = this.hostEl.offsetLeft;
    // const hostElPosTop = this.hostEl.offsetTop;
    // const hostElHeight = this.hostEl.clientHeight;
    // const parentElScrolling = this.hostEl.parentElement.scrollTop
    // const x = hostElPosLeft + 20;
    // const y = hostElPosTop + hostElHeight - parentElScrolling - 10;
    // el.style.position = 'absolute';
    // el.style.left = x + 'px';
    // el.style.top = y + 'px';

    this.hostEl.style.position = 'relative';
    el.style.position = 'absolute';
    el.style.zIndex = 100;
    el.style.top = 'calc(100% - 10px)';
    el.addEventListener('click', this.closeTooltip);
    this.el = el;
  }
}

class Project {
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
    const tooltip = new Tooltip(
      () => (this.isOpenTooltip = false),
      tooltipText,
      this.id
    );
    tooltip.attach();
    this.isOpenTooltip = true;
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

class App {
  static init() {
    const activeList = new ProjectList('active');
    const finishedList = new ProjectList('finished');
    activeList.setSwitchHandler(finishedList.addProject.bind(finishedList));
    finishedList.setSwitchHandler(activeList.addProject.bind(activeList));

    // const someScript = document.createElement('script');
    // someScript.textContent = 'alert("Hi there")';
    // document.head.append(someScript)

    // const timerId = setInterval(this.startAnalytics, 1000);
    // document
    //   .getElementById('stop-analytics-btn')
    //   .addEventListener('click', () => {
    //     clearInterval(timerId);
    //   });
  }
  // static startAnalytics() {
  //   const analyticsScript = document.createElement('script');
  //   analyticsScript.src = 'assets/scripts/analytics.js';
  //   analyticsScript.defer = true;
  //   document.head.append(analyticsScript);
  // }
}

App.init();
