//! STYLE IMPORTS
import './styles/style.css';

import taskView from './view/task_view';
import { getTestTask } from './model/task';

const newTaskView = taskView(getTestTask());

document.body.appendChild(newTaskView.view);

newTaskView.renderSimple();
