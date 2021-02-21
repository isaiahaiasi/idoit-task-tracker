//! STYLE IMPORTS
import './styles/reset.css';
import './styles/style.css';

import { taskMock } from './model/task';
import Project from './model/project';
import DirectoryView from './view/dir_view';

//! TEMP
import { save, load } from './save_handler';

const testProjects = [
  new Project('Test Project', 'My stupid test project'),
  new Project('Test 2', 'My SECOND stupid test project'),
  new Project('This real project', '(jk, it\'s another test)'),
];

testProjects.forEach((testProject) => {
  const tasks = taskMock.getMockTasks(7, testProject);
  testProject.addChild(...tasks);
});

const projViewCntr = document.querySelector('.projects-container');

const sideBar = DirectoryView(testProjects, projViewCntr);

document.querySelector('.sidebar-container').appendChild(sideBar.node);

save(testProjects);
load();
