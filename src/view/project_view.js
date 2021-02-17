import TaskView from './task_view';
import { removeAllChildren } from './view_utils';
import ModalView from './modal_view';

const ProjectView = (project) => {
  const template = document.querySelector('#project-template');
  const projectTemplate = template.content.querySelector('.project');
  const node = projectTemplate.cloneNode(true);
  const taskViews = [];

  let doHideComplete = false;

  const _showComplete = (bool) => {
    taskViews.forEach((tv) => {
      tv.setHideOnComplete(bool);
    });
  };

  const _renderTasks = (taskViewContainer) => {
    removeAllChildren(taskViewContainer);
    taskViews.splice(0, taskViews.length);

    project.children.forEach((task) => {
      const tv = TaskView(task);
      taskViewContainer.appendChild(tv.node);
      taskViews.push(tv);
    });

    if (doHideComplete) {
      _showComplete(doHideComplete);
    }
  };

  const render = () => {
    // Set title & description
    node.querySelector('.project-title').textContent = project.title;
    node.querySelector('.project-description').textContent = project.description;

    // Render tasks
    const taskViewContainer = node.querySelector('.project-tasks-container');
    _renderTasks(taskViewContainer);
  };

  const _initListeners = () => {
    const hideCompleteChkbx = node.querySelector('.hide-complete-chkbx');
    hideCompleteChkbx.addEventListener('change', () => {
      doHideComplete = hideCompleteChkbx.checked;
      _showComplete(doHideComplete);
    });
  };

  const _initAddTaskButton = () => {
    const addTaskBtn = node.querySelector('.add-task-btn');
    addTaskBtn.addEventListener('click', () => {
      ModalView('.add-task-form', () => console.log('submitted!'))();
    });
  };

  _initListeners();
  _initAddTaskButton();

  return { node, render };
};

export { ProjectView as default };
