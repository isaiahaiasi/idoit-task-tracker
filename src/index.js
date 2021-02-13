//! STYLE IMPORTS
import './styles/style.css';

import { taskMock } from './model/task';
import Project from './model/project';
import ProjectView from './view/project_view';

const testProject = new Project('Test Project', 'My stupid test project');
const tasks = taskMock.getMockTasks(7, testProject);

testProject.addTask(...tasks);

const testProjectView = ProjectView(testProject);

document.body.appendChild(testProjectView.view);
testProjectView.render();
