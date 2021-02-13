import TaskView from './task_view';
import { removeAllChildren } from './view_utils';

const projectView = (project) => {
  const template = document.querySelector('#project-template');
  const projectTemplate = template.content.querySelector('.project');
  const node = projectTemplate.cloneNode(true);
  const taskViews = [];

  let doHideComplete = false;

  //! vvvvvvvvvvvvvvvvv
  // TODO: Need to add way to hide task IMMEDIATELY when "hide complete" is on
  // TODO: ... which means, move as much of this as possible to the task
  const _showComplete = (bool) => {
    taskViews.forEach((tv) => {
      const tvIsComplete = tv.task.isComplete;
      if (bool && tvIsComplete) {
        tv.node.classList.add('hidden');
      } else {
        tv.node.classList.remove('hidden');
      }
    });
  };

  const _renderTasks = (taskViewContainer) => {
    removeAllChildren(taskViewContainer);
    taskViews.splice(0, taskViews.length);

    project.tasks.forEach((task) => {
      const tv = TaskView(task);
      tv.render();
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
    const rerenderBtn = node.querySelector('.rerender-btn');
    rerenderBtn.addEventListener('click', () => {
      render();
    });

    const hideCompleteChkbx = node.querySelector('.hide-complete-chkbx');
    hideCompleteChkbx.addEventListener('change', () => {
      doHideComplete = hideCompleteChkbx.checked;
      _showComplete(doHideComplete);
    });
  };

  _initListeners();

  return { node, render };
};

export { projectView as default };
