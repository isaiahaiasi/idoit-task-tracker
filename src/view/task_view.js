import { format as dateFormat } from 'date-fns';
import ModalView from './modal_view';
import TaskForm from './forms/task_form_view';
import DeleteConfirmationView from './delete_confirm_view';

const taskView = (task, project) => {
  const template = document.querySelector('#task-template');
  const taskTemplate = template.content.querySelector('.task');
  const node = taskTemplate.cloneNode(true);
  const expandBtn = node.querySelector('.task-expand-btn');

  let _hideWhenComplete = false;

  const _deleteTask = () => {
    project.deleteChild(task);
    node.remove();
    return true;
  };

  const _updateHiddenState = () => {
    if (_hideWhenComplete && task.isComplete) {
      // node.style.maxHeight = node.offsetHeight;
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
    node.querySelector('._description').textContent = task.description;
    if (task.dueDate != null) {
      node.querySelector('._due-date').textContent = dateFormat(task.dueDate, 'MM/dd/yyyy');
    } else {
      node.querySelector('._due-date').textContent = '';
    }
  };

  const _handleEditTask = (form) => {
    const formState = form.get();

    if (!formState) {
      return false;
    }

    task.setState(formState);

    render();

    return true;
  };

  const _initEditTaskButton = () => {
    const editTaskBtn = node.querySelector('.task-edit-btn');
    editTaskBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const options = {
        init: (modalContent) => {
          modalContent.set(task);
        },
      };

      ModalView(TaskForm, _handleEditTask, options).openModal();
    });
  };

  const _initListeners = () => {
    _initEditTaskButton();

    const isCompleteCheckbox = node.querySelector('.task-is-complete');
    isCompleteCheckbox.checked = task.isComplete;
    _updateHiddenState();
    isCompleteCheckbox.addEventListener('click', (e) => e.stopPropagation());
    isCompleteCheckbox.addEventListener('change', () => {
      task.setState({ isComplete: isCompleteCheckbox.checked });
      _updateHiddenState();
    });

    const deleteBtn = node.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      ModalView(DeleteConfirmationView, _deleteTask).openModal();
    });
  };

  const toggleExpanded = (bool) => {
    if (bool === undefined) {
      node.classList.toggle('task-expanded');
      node.classList.toggle('selected');
    } else if (bool === true) {
      node.classList.add('task-expanded');
      node.classList.add('selected');
    } else {
      node.classList.remove('task-expanded');
      node.classList.remove('selected');
    }
  };

  _initListeners();
  render();

  return {
    node, task, setHideOnComplete, render, toggleExpanded, expandBtn,
  };
};

export default taskView;
