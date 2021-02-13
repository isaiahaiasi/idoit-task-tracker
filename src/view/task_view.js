const taskView = (task) => {
  const template = document.querySelector('#task-template');
  const taskTemplate = template.content.querySelector('.task');
  const node = taskTemplate.cloneNode(true);
  node.classList.add('expanded');

  const _deleteTask = () => {
    task.delete();
    node.remove();
  };

  const render = () => {
    // Display properties
    node.querySelector('.task-title').textContent = task.title;
    node.querySelector('.task-priority').textContent = task.priority;
    node.querySelector('.task-due-date').textContent = task.dueDate;
    return node;
  };

  const _initListeners = () => {
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
  };

  _initListeners();

  return { node, task, render };
};

export { taskView as default };
