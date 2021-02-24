import TaskView from './task_view';
import Task from '../model/task';
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

  const _expandClass = (taskView) => {
    taskViews.forEach((tv) => {
      if (tv === taskView) {
        taskView.toggleExpanded();
      } else {
        tv.toggleExpanded(false);
      }
    });
  };

  const _renderTasks = (taskViewContainer) => {
    removeAllChildren(taskViewContainer);
    taskViews.splice(0, taskViews.length);

    project.children.forEach((task) => {
      const tv = TaskView(task, project);
      tv.expandBtn.addEventListener('click', () => _expandClass(tv));
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

  // ! This definitely doesn't feel very DRY...
  const _handleAddTask = (form) => {
    const title = form.querySelector('input[name="task-title"]');
    const description = form.querySelector('input[name="task-description"]');
    const priority = form.querySelector('select[name="task-priority"]');

    const formDate = form.querySelector('input[name="task-due-date"]')
      .value
      .split('-');
    const dueDate = (formDate[0] && formDate[1] && formDate[2])
      ? new Date(formDate[0], formDate[1] - 1, formDate[2])
      : null;

    // Validation
    const titleValidation = form.querySelector('.field-validation[for="task-title"]');
    title.addEventListener('input', () => titleValidation.classList.remove('reveal'));

    if (!title.value) {
      titleValidation.classList.add('reveal');
      return false;
    }

    const newTask = new Task(
      title.value, description.value, dueDate, priority.value,
    );

    _addTask(newTask);

    return true;
  };

  const _initAddTaskButton = () => {
    const addTaskBtn = node.querySelector('.add-task-btn');
    addTaskBtn.addEventListener('click', () => {
      ModalView('.add-task-form', _handleAddTask).openModal();
    });
  };

  _initAddTaskButton();
  _initListeners();

  return { node, render };
};

export { ProjectView as default };
