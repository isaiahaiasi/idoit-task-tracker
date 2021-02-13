const taskView = (task) => {
  const template = document.querySelector('#task-template');
  const taskTemplate = template.content.querySelector('.task');
  const node = taskTemplate.cloneNode(true);
  node.classList.add('expanded');

  const _deleteTask = () => {
    task.delete();
    node.destroy();
  };

  const render = () => {
    // Display properties
    node.querySelector('.task-title').textContent = task.title;
    node.querySelector('.task-priority').textContent = task.priority;
    node.querySelector('.task-due-date').textContent = task.dueDate;

    // Inputs
    const isCompleteCheckbox = node.querySelector('.task-is-complete');
    isCompleteCheckbox.checked = task.isComplete;
    isCompleteCheckbox.addEventListener('change', () => {
      task.setIsComplete(isCompleteCheckbox.checked);
    });

    const deleteBtn = node.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', () => {
      // TODO: Add confirmation modal
      _deleteTask();
    });

    return node;
  };

  return { node, render };
};

export { taskView as default };
