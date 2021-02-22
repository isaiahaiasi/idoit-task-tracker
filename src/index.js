//! STYLE IMPORTS
import './styles/reset.css';
import './styles/style.css';

import { taskMock } from './model/task';
import Project from './model/project';
import Directory from './model/directory';
import DirectoryView from './view/dir_view';

//! TEMP
import { save, load } from './save_local';
import SaveHandler from './save_handler';

const testProjects = [
  new Project('Test Project', 'My stupid test project'),
  new Project('Test 2', 'My SECOND stupid test project'),
  new Project('This real project', '(jk, it\'s another test)'),
];

testProjects.forEach((testProject) => {
  const tasks = taskMock.getMockTasks(7, testProject);
  testProject.addChild(...tasks);
});

const directory = new Directory('RootDirectory', testProjects);

// SAVE HANDLING
const saveHandler = SaveHandler({ save, load }, directory);
saveHandler.startListening();

// POPULATING DOM
const projViewCntr = document.querySelector('.projects-container');

const sideBar = DirectoryView(directory, projViewCntr);

document.querySelector('.sidebar-container').appendChild(sideBar.node);
