import ProjectList from './App/ProjectList.js';

class App {
  static init() {
    const activeList = new ProjectList('active');
    const finishedList = new ProjectList('finished');
    activeList.setSwitchHandler(finishedList.addProject.bind(finishedList));
    finishedList.setSwitchHandler(activeList.addProject.bind(activeList));
  }
}

App.init();
