//  - simple view
//  - expanded view
// pass in the task properties I care about w destructuring??
const taskView = (task) => {
  const template = document.querySelector('#task-template');
  const taskTemplate = template.content.querySelector('.task');
  const view = taskTemplate.cloneNode(true);

  const renderSimple = () => {
    // Add title & description properties
    view.querySelector('.task-title').textContent = task.title;
    view.querySelector('.task-priority').textContent = task.priority;
    view.querySelector('.task-due-date').textContent = task.dueDate;
  };

  return { view, renderSimple };
};

export { taskView as default };
