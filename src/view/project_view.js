import TaskView from './task_view';
import Task from '../model/task';
import { removeAllChildren } from './view_utils';
import ModalView from './modal_view';
import TaskForm from './forms/task_form_view';

const ProjectView = (project) => {
  const template = document.querySelector('#project-template');
  const projectTemplate = template.content.querySelector('.project');
  const node = projectTemplate.cloneNode(true);
  const taskViewContainer = node.querySelector('.project-tasks-container');
  const taskViews = [];

  let doHideComplete = false;

  const _showComplete = (bool) => {
    taskViews.forEach((tv) => {
      tv.setHideOnComplete(bool);
    });
  };

  const _expandTask = (taskView) => {
    taskViews.forEach((tv) => {
      if (tv === taskView) {
        taskView.toggleExpanded();
      } else {
        tv.toggleExpanded(false);
      }
    });
  };

  const _renderTasks = () => {
    removeAllChildren(taskViewContainer);
    taskViews.splice(0, taskViews.length);

    project.children.forEach((task) => {
      const tv = TaskView(task, project);
      tv.node.addEventListener('click', () => _expandTask(tv));
      taskViewContainer.appendChild(tv.node);
      taskViews.push(tv);
    });

    if (doHideComplete) {
      _showComplete(doHideComplete);
    }
  };

  const render = () => {
    node.querySelector('.project-title').textContent = project.title;
    node.querySelector('.project-description').textContent = project.description;

    _renderTasks();
  };

  const _addTask = (task) => {
    project.addChild(task);
    render();
  };

  const _initListeners = () => {
    const hideCompleteChkbx = node.querySelector('.hide-complete-chkbx');
    hideCompleteChkbx.addEventListener('change', () => {
      doHideComplete = hideCompleteChkbx.checked;
      _showComplete(doHideComplete);
    });
  };

  const _handleAddTask = (form) => {
    const formValues = form.get();

    if (!formValues) {
      return null;
    }

    const newTask = new Task(formValues);
    _addTask(newTask);

    return true;
  };

  const _initAddTaskButton = () => {
    const addTaskBtn = node.querySelector('.add-task-btn');
    addTaskBtn.addEventListener('click', () => {
      ModalView(TaskForm, _handleAddTask).openModal();
    });
  };

  _initAddTaskButton();
  _initListeners();

  return { node, render };
};

export { ProjectView as default };
