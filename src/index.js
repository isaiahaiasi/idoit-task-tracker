//! STYLE IMPORTS
import './styles/style.css';

import { taskMock } from './model/task';
import Project from './model/project';
import DirectoryView from './view/dir_view';

const testProjects = [
  new Project('Test Project', 'My stupid test project'),
  new Project('Test 2', 'My SECOND stupid test project'),
  new Project('This real project', '(jk, it\'s another test)'),
];

testProjects.forEach((testProject) => {
  const tasks = taskMock.getMockTasks(7, testProject);
  testProject.addTask(...tasks);
});
const projectViewContainer = document.querySelector('.main-view');
const sideBar = DirectoryView(testProjects, projectViewContainer);

document.querySelector('.sidebar-container').appendChild(sideBar.node);
