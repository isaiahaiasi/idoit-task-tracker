//! STYLE IMPORTS
import './styles/style.css';

import { taskMock } from './model/task';
import Project from './model/project';
import DirectoryView from './view/dir_view';

const testProjects = [
  new Project('Test Project', null, 'My stupid test project'),
  new Project('Test 2', null, 'My SECOND stupid test project'),
  new Project('This real project', null, '(jk, it\'s another test)'),
];

testProjects.forEach((testProject) => {
  const tasks = taskMock.getMockTasks(7, testProject);
  testProject.addChild(...tasks);
});

const projViewCntr = document.querySelector('.projects-container');

const sideBar = DirectoryView(testProjects, projViewCntr);

document.querySelector('.sidebar-container').appendChild(sideBar.node);
