import taskView from './task_view';

const projectView = (project) => {
  const template = document.querySelector('#project-template');
  const projectTemplate = template.content.querySelector('.project');
  const view = projectTemplate.cloneNode(true);

  const _renderTasks = () => {
    const taskViews = [];
    project.tasks.forEach((task) => {
      const tv = taskView(task);
      tv.render();
      taskViews.push(tv.node);
    });
    return taskViews;
  };

  const render = () => {
    // Set title & description
    view.querySelector('.project-title').textContent = project.title;
    view.querySelector('.project-description').textContent = project.description;

    const taskViewContainer = view.querySelector('.project-tasks-container');
    const taskViews = _renderTasks();

    taskViews.forEach((tv) => taskViewContainer.appendChild(tv));
  };

  return { view, render };
};

export { projectView as default };
