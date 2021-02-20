import ModalView from './modal_view';

const taskView = (task) => {
  const template = document.querySelector('#task-template');
  const taskTemplate = template.content.querySelector('.task');
  const node = taskTemplate.cloneNode(true);

  let _hideWhenComplete = false;

  const _deleteTask = () => {
    task.delete();
    node.remove();
    return true;
  };

  const _updateHiddenState = () => {
    if (_hideWhenComplete && task.isComplete) {
      node.classList.add('hidden');
    } else {
      node.classList.remove('hidden');
    }
  };

  const setHideOnComplete = (bool) => {
    _hideWhenComplete = bool;
    _updateHiddenState();
  };

  const render = () => {
    node.querySelector('._title').textContent = task.title;
    node.querySelector('._priority').textContent = task.priority;
    node.querySelector('._due-date').textContent = task.dueDate;
    node.querySelector('._description').textContent = task.description;
  };

  const _initListeners = () => {
    const isCompleteCheckbox = node.querySelector('.task-is-complete');
    isCompleteCheckbox.checked = task.isComplete;
    _updateHiddenState();
    isCompleteCheckbox.addEventListener('change', () => {
      task.setIsComplete(isCompleteCheckbox.checked);
      _updateHiddenState();
    });

    const deleteBtn = node.querySelector('.task-delete-btn');

    deleteBtn.addEventListener('click', () => {
      ModalView('.confirmation-form', _deleteTask).openModal();
    });
  };

  const toggleExpanded = (bool) => {
    if (bool === undefined) {
      node.classList.toggle('task-expanded');
    } else if (bool === true) {
      node.classList.add('task-expanded');
    } else {
      node.classList.remove('task-expanded');
    }
  };

  _initListeners();
  render();

  return {
    node, task, setHideOnComplete, render, toggleExpanded,
  };
};

export { taskView as default };
