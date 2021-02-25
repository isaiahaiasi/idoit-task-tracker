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
import saveLocal from './save_local';
import SaveHandler from './save_handler';

const generateDefaultDirectory = () => {
  console.log('Generating defaults');
  const testProjects = [
    new Project({ title: 'Test Project', description: 'My stupid test project' }),
    new Project({ title: 'Test 2', description: 'My SECOND stupid test project' }),
    new Project({ title: 'This real project', description: '(jk, it\'s another test)' }),
  ];

  testProjects.forEach((testProject) => {
    const tasks = taskMock.getMockTasks(7, testProject);
    testProject.addChild(...tasks);
  });
  return new Directory({ title: 'RootDirectory', children: testProjects });
};
// SAVE HANDLING
const saveHandler = SaveHandler(saveLocal);

const directory = saveHandler.handleLoad('DIRECTORY') ?? generateDefaultDirectory();

// POPULATING DOM
const projViewCntr = document.querySelector('.projects-container');

const sideBar = DirectoryView(directory, projViewCntr);

document.querySelector('.sidebar-container').appendChild(sideBar.node);
