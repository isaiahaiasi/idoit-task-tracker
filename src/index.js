//* STYLE IMPORTS
import './styles/reset.css';
import './styles/style.css';

//* LOGIC IMPORTS
import { taskMock } from './model/task';
import Project from './model/project';
import Directory from './model/directory';

//* VIEW IMPORTS
import DirectoryView from './view/dir_view';

//* SAVE/LOAD IMPORTS
import { save, load } from './save_local';
import SaveHandler from './save_handler';

const generateDefaultDirectory = () => {
  console.log('Generating defaults');
  const testProjects = [
    new Project('Test Project', 'My stupid test project'),
    new Project('Test 2', 'My SECOND stupid test project'),
    new Project('This real project', '(jk, it\'s another test)'),
  ];

  testProjects.forEach((testProject) => {
    const tasks = taskMock.getMockTasks(7, testProject);
    testProject.addChild(...tasks);
  });
  return new Directory('RootDirectory', testProjects);
};

const directory = load() ?? generateDefaultDirectory();

// SAVE HANDLING
const saveHandler = SaveHandler({ save, load }, directory);
saveHandler.startListening();

// POPULATING DOM
const projViewCntr = document.querySelector('.projects-container');

const sideBar = DirectoryView(directory, projViewCntr);

document.querySelector('.sidebar-container').appendChild(sideBar.node);
