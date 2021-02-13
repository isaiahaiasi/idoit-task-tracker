//! STYLE IMPORTS
import './styles/style.css';

import taskView from './view/task_view';
import { taskMock } from './model/task';

const newTaskView = taskView(taskMock.getTestTask());

document.body.appendChild(newTaskView.view);

newTaskView.renderSimple();
