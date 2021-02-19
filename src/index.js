//! STYLE IMPORTS
import './styles/style.css';

import { taskMock } from './model/task';
import Project from './model/project';
import DirectoryView from './view/dir_view';

// ! Temp
import ModalView from './view/modal_view';

const projViewCntr = document.querySelector('.projects-container');

const testProjects = [
  new Project('Test Project', projViewCntr, 'My stupid test project'),
  new Project('Test 2', projViewCntr, 'My SECOND stupid test project'),
  new Project('This real project', projViewCntr, '(jk, it\'s another test)'),
];

testProjects.forEach((testProject) => {
  const tasks = taskMock.getMockTasks(7, testProject);
  testProject.addChild(...tasks);
});
const sideBar = DirectoryView(testProjects, projViewCntr);

document.querySelector('.sidebar-container').appendChild(sideBar.node);

// ! TEMP
const _initAddProjectButton = () => {
  const addTaskBtn = document.querySelector('.add-project-btn');
  addTaskBtn.addEventListener('click', () => {
    ModalView('.add-project-form', () => console.log('submitted!')).openModal();
  });
};

_initAddProjectButton();
